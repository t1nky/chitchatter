import { lazy, Suspense, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

import { encryption } from 'services/Encryption'
import {
  EnvironmentUnsupportedDialog,
  isEnvironmentSupported,
} from 'components/Shell/EnvironmentUnsupportedDialog'
import { WholePageLoading } from 'components/Loading/Loading'
import { TooltipProvider } from 'components/ui/tooltip'
import { ColorMode, UserSettings } from 'models/settings'

import { DEFAULT_SOUND } from 'config/soundNames'
import { getPreferredLanguage } from 'i18n'
import i18n from 'i18n'

import type { BootstrapProps } from './Bootstrap'

const Bootstrap = lazy(() => import('./Bootstrap'))

export interface InitProps extends Omit<BootstrapProps, 'initialUserSettings'> {
  getUuid?: typeof uuid
}

// NOTE: This is meant to be a thin layer around the Bootstrap component that
// only handles asynchronous creation of the public/private keys that Bootstrap
// requires.
const Init = ({ getUuid = uuid, ...props }: InitProps) => {
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      if (userSettings !== null) return

      try {
        const { publicKey, privateKey } = await encryption.generateKeyPair()

        setUserSettings({
          userId: getUuid(),
          customUsername: '',
          colorMode: ColorMode.DARK,
          language: getPreferredLanguage(window.navigator.language),
          playSoundOnNewMessage: true,
          showNotificationOnNewMessage: true,
          showActiveTypingStatus: true,
          isEnhancedConnectivityEnabled: true,
          publicKey,
          privateKey,
          selectedSound: DEFAULT_SOUND,
        })
      } catch (e) {
        console.error(e)
        setErrorMessage(i18n.t('init.bootError'))
      }
    })()
  }, [getUuid, userSettings])

  if (!isEnvironmentSupported) {
    return <EnvironmentUnsupportedDialog />
  }

  if (errorMessage) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>{errorMessage}</p>
      </div>
    )
  }

  if (userSettings === null) {
    return <WholePageLoading />
  }

  return (
    <Suspense fallback={<WholePageLoading />}>
      <TooltipProvider>
        <Bootstrap {...props} initialUserSettings={userSettings} />
      </TooltipProvider>
    </Suspense>
  )
}

export default Init
