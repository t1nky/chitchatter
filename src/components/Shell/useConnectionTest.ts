import { useContext, useEffect, useState } from 'react'

import { SettingsContext } from 'contexts/SettingsContext'
import { useTurnConfig } from 'hooks/useTurnConfig'
import {
  ConnectionTest,
  ConnectionTestEvent,
  ConnectionTestEvents,
  TrackerConnection,
} from 'lib/ConnectionTest'

export interface ConnectionTestResults {
  hasHost: boolean
  hasTURNServer: boolean
  trackerConnection: TrackerConnection
}

const rtcPollInterval = 20 * 1000
const trackerPollInterval = 5 * 1000

export const useConnectionTest = () => {
  const settingsContext = useContext(SettingsContext)
  const { isEnhancedConnectivityEnabled } = settingsContext.getUserSettings()

  const { turnConfig, isLoading: isConfigLoading } = useTurnConfig(
    isEnhancedConnectivityEnabled
  )

  const [hasHost, setHasHost] = useState(false)
  const [hasTURNServer, setHasTURNServer] = useState(false)
  const [trackerConnection, setTrackerConnection] = useState(
    TrackerConnection.SEARCHING
  )

  useEffect(() => {
    // Don't start connection tests until rtcConfig is loaded
    if (isConfigLoading) {
      return
    }

    let isDisposed = false
    let activeRtcConnectionTest: ConnectionTest | null = null
    let rtcPollTimeout: ReturnType<typeof setTimeout> | undefined
    let trackerPollTimeout: ReturnType<typeof setTimeout> | undefined

    const checkRtcConnection = async () => {
      const connectionTest = new ConnectionTest(turnConfig)
      activeRtcConnectionTest?.destroyRtcPeerConnectionTest()
      activeRtcConnectionTest = connectionTest

      const handleHasHostChanged = ((event: ConnectionTestEvent) => {
        setHasHost(event.detail.hasHost)
      }) as EventListener

      connectionTest.addEventListener(
        ConnectionTestEvents.HAS_HOST_CHANGED,
        handleHasHostChanged
      )

      const handleHasRelayChanged = ((event: ConnectionTestEvent) => {
        setHasTURNServer(event.detail.hasTURNServer)
      }) as EventListener

      connectionTest.addEventListener(
        ConnectionTestEvents.HAS_RELAY_CHANGED,
        handleHasRelayChanged
      )

      const detachListeners = () => {
        connectionTest.removeEventListener(
          ConnectionTestEvents.HAS_HOST_CHANGED,
          handleHasHostChanged
        )
        connectionTest.removeEventListener(
          ConnectionTestEvents.HAS_RELAY_CHANGED,
          handleHasRelayChanged
        )
      }

      try {
        await connectionTest.initRtcPeerConnectionTest()
      } catch (e) {
        if (!isDisposed) {
          setHasHost(false)
          setHasTURNServer(false)
        }
        console.error(e)
      }

      return () => {
        detachListeners()

        if (activeRtcConnectionTest === connectionTest) {
          activeRtcConnectionTest = null
        }

        connectionTest.destroyRtcPeerConnectionTest()
      }
    }

    const scheduleRtcConnectionCheck = async () => {
      if (isDisposed) {
        return
      }

      const cleanupConnectionTest = await checkRtcConnection()

      if (isDisposed) {
        cleanupConnectionTest()
        return
      }

      rtcPollTimeout = setTimeout(() => {
        cleanupConnectionTest()
        void scheduleRtcConnectionCheck()
      }, rtcPollInterval)
    }

    const scheduleTrackerConnectionCheck = () => {
      if (isDisposed) {
        return
      }

      try {
        const connectionTest = new ConnectionTest(turnConfig)
        const trackerConnectionTestResult =
          connectionTest.testTrackerConnection()

        setTrackerConnection(trackerConnectionTestResult)
      } catch (_e) {
        setTrackerConnection(TrackerConnection.FAILED)
      }

      trackerPollTimeout = setTimeout(
        scheduleTrackerConnectionCheck,
        trackerPollInterval
      )
    }

    void scheduleRtcConnectionCheck()
    scheduleTrackerConnectionCheck()

    return () => {
      isDisposed = true
      clearTimeout(rtcPollTimeout)
      clearTimeout(trackerPollTimeout)
      activeRtcConnectionTest?.destroyRtcPeerConnectionTest()
      activeRtcConnectionTest = null
    }
  }, [turnConfig, isConfigLoading])

  return {
    connectionTestResults: { hasHost, hasTURNServer, trackerConnection },
  }
}
