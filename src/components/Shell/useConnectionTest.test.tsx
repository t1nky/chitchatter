import { PropsWithChildren } from 'react'
import { render, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { SettingsContext } from 'contexts/SettingsContext'
import { userSettingsContextStubFactory } from 'test-utils/stubs/settingsContext'

import { useConnectionTest } from './useConnectionTest'

const initRtcPeerConnectionTestMock = vi.fn()
const destroyRtcPeerConnectionTestMock = vi.fn()
const testTrackerConnectionMock = vi.fn()

vi.mock('hooks/useTurnConfig', () => ({
  useTurnConfig: () => ({
    turnConfig: {
      iceServers: [],
    },
    isLoading: false,
  }),
}))

vi.mock('lib/ConnectionTest', () => {
  const TrackerConnection = {
    SEARCHING: 'SEARCHING',
    CONNECTED: 'CONNECTED',
    FAILED: 'FAILED',
  }

  class MockConnectionTest extends EventTarget {
    hasHost = false
    hasTURNServer = false

    constructor(_rtcConfig: RTCConfiguration) {
      super()
    }

    initRtcPeerConnectionTest = initRtcPeerConnectionTestMock

    destroyRtcPeerConnectionTest = destroyRtcPeerConnectionTestMock

    testTrackerConnection = testTrackerConnectionMock
  }

  return {
    ConnectionTest: MockConnectionTest,
    ConnectionTestEvents: {
      HAS_HOST_CHANGED: 'HAS_HOST_CHANGED',
      HAS_RELAY_CHANGED: 'HAS_RELAY_CHANGED',
    },
    TrackerConnection,
  }
})

const HookHarness = () => {
  useConnectionTest()

  return null
}

const SettingsProvider = ({ children }: PropsWithChildren) => {
  const settingsContextValue = userSettingsContextStubFactory()

  return (
    <SettingsContext.Provider value={settingsContextValue}>
      {children}
    </SettingsContext.Provider>
  )
}

describe('useConnectionTest', () => {
  beforeEach(() => {
    initRtcPeerConnectionTestMock.mockReset()
    destroyRtcPeerConnectionTestMock.mockReset()
    testTrackerConnectionMock.mockReset()
    testTrackerConnectionMock.mockReturnValue('SEARCHING')
  })

  test('destroys the active rtc connection test on unmount', async () => {
    initRtcPeerConnectionTestMock.mockResolvedValue(undefined)

    const { unmount } = render(
      <SettingsProvider>
        <HookHarness />
      </SettingsProvider>
    )

    await waitFor(() => {
      expect(initRtcPeerConnectionTestMock).toHaveBeenCalledTimes(1)
    })

    unmount()

    expect(destroyRtcPeerConnectionTestMock).toHaveBeenCalledTimes(1)
  })

  test('clears scheduled polling timers on unmount', async () => {
    initRtcPeerConnectionTestMock.mockResolvedValue(undefined)
    const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout')

    const { unmount } = render(
      <SettingsProvider>
        <HookHarness />
      </SettingsProvider>
    )

    await waitFor(() => {
      expect(initRtcPeerConnectionTestMock).toHaveBeenCalledTimes(1)
    })

    unmount()

    expect(clearTimeoutSpy).toHaveBeenCalled()
    clearTimeoutSpy.mockRestore()
  })
})
