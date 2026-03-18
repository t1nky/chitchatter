import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ConfirmDialog } from 'components/ConfirmDialog'
import { EnhancedConnectivityControl } from 'components/EnhancedConnectivityControl'
import { PeerNameDisplay } from 'components/PeerNameDisplay'
import { SoundSelector } from 'components/SoundSelector/SoundSelector'
import { isEnhancedConnectivityAvailable } from 'config/enhancedConnectivity'
import { SettingsContext } from 'contexts/SettingsContext'
import { ShellContext } from 'contexts/ShellContext'
import { StorageContext } from 'contexts/StorageContext'
import { getLanguageLabel } from 'i18n'
import { Language } from 'models/settings'
import { notification } from 'services/Notification'
import { settings } from 'services/Settings'
import { Button } from 'components/ui/button'
import { Switch } from 'components/ui/switch'
import { Separator } from 'components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select'

import { isErrorWithMessage } from '../../lib/type-guards'

interface SettingsProps {
  userId: string
}

export const Settings = ({ userId }: SettingsProps) => {
  const { t } = useTranslation()

  const { setTitle, showAlert } = useContext(ShellContext)
  const { updateUserSettings, getUserSettings } = useContext(SettingsContext)
  const { getPersistedStorage } = useContext(StorageContext)
  const [
    isDeleteSettingsConfirmDiaglogOpen,
    setIsDeleteSettingsConfirmDiaglogOpen,
  ] = useState(false)
  const [, setIsNotificationPermissionDetermined] = useState(false)
  const {
    language,
    playSoundOnNewMessage,
    showNotificationOnNewMessage,
    showActiveTypingStatus,
    isEnhancedConnectivityEnabled,
  } = getUserSettings()

  const persistedStorage = getPersistedStorage()

  useEffect(() => {
    ;(async () => {
      await notification.requestPermission()

      // This rerender keeps notification availability in sync with permission.
      setIsNotificationPermissionDetermined(true)
    })()
  }, [])

  useEffect(() => {
    setTitle(t('settings.title'))
  }, [setTitle, t])

  const handleLanguageChange = (value: string) => {
    updateUserSettings({ language: value as Language })
  }

  const handlePlaySoundOnNewMessageChange = (
    newPlaySoundOnNewMessage: boolean
  ) => {
    updateUserSettings({ playSoundOnNewMessage: newPlaySoundOnNewMessage })
  }

  const handleShowNotificationOnNewMessageChange = (
    newShowNotificationOnNewMessage: boolean
  ) => {
    updateUserSettings({
      showNotificationOnNewMessage: newShowNotificationOnNewMessage,
    })
  }

  const handleShowActiveTypingStatusChange = (
    newShowActiveTypingStatus: boolean
  ) => {
    updateUserSettings({ showActiveTypingStatus: newShowActiveTypingStatus })
  }

  const handleIsEnhancedConnectivityEnabledChange = (
    _event: ChangeEvent,
    newIsEnhancedConnectivityEnabled: boolean
  ) => {
    if (isEnhancedConnectivityAvailable) {
      updateUserSettings({
        isEnhancedConnectivityEnabled: newIsEnhancedConnectivityEnabled,
      })
    }
  }

  const handleDeleteSettingsClick = () => {
    setIsDeleteSettingsConfirmDiaglogOpen(true)
  }

  const handleDeleteSettingsCancel = () => {
    setIsDeleteSettingsConfirmDiaglogOpen(false)
  }

  const handleDeleteSettingsConfirm = async () => {
    await persistedStorage.clear()
    window.location.reload()
  }

  const handleExportSettingsClick = async () => {
    try {
      await settings.exportSettings(getUserSettings())
    } catch (e) {
      if (isErrorWithMessage(e)) {
        showAlert(e.message, { severity: 'error' })
      }
    }
  }

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImportFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const userSettings = await settings.importSettings(file)
      updateUserSettings(userSettings)
      showAlert(t('settings.profileImported'), { severity: 'success' })
    } catch (err) {
      if (isErrorWithMessage(err)) {
        showAlert(err.message, { severity: 'error' })
      }
    }

    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const areNotificationsAvailable = notification.permission === 'granted'

  return (
    <div className="p-4 mx-auto max-w-screen-md">
      <h2 className="text-xl font-medium mb-4">
        {t('settings.languageTitle')}
      </h2>
      <div className="rounded-xl border bg-card p-4 mb-4 shadow-sm">
        <div className="space-y-2">
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t('language')} />
            </SelectTrigger>
            <SelectContent>
              {Object.values(Language).map(languageOption => (
                <SelectItem key={languageOption} value={languageOption}>
                  {getLanguageLabel(languageOption)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">{t('languageHelp')}</p>
        </div>
      </div>

      <h2 className="text-xl font-medium mb-4">{t('settings.chatTitle')}</h2>
      <div className="rounded-xl border bg-card p-4 mb-4 shadow-sm">
        <p>{t('settings.chatBackgroundBehavior')}</p>
        <div className="space-y-3 mt-2">
          <label className="flex items-center gap-2">
            <Switch
              checked={playSoundOnNewMessage}
              onCheckedChange={handlePlaySoundOnNewMessageChange}
            />
            <span>{t('settings.playSound')}</span>
          </label>
          <label className="flex items-center gap-2">
            <Switch
              checked={
                areNotificationsAvailable && showNotificationOnNewMessage
              }
              onCheckedChange={handleShowNotificationOnNewMessageChange}
              disabled={!areNotificationsAvailable}
            />
            <span>{t('settings.showNotification')}</span>
          </label>
        </div>
        <p className="mt-4">{t('settings.soundSelectorLabel')}</p>
        <SoundSelector disabled={!playSoundOnNewMessage} />
      </div>

      <div className="rounded-xl border bg-card p-4 mb-4 shadow-sm">
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <Switch
              checked={showActiveTypingStatus}
              onCheckedChange={handleShowActiveTypingStatusChange}
            />
            <span>{t('settings.typingIndicators')}</span>
          </label>
        </div>
        <p className="text-sm font-medium text-muted-foreground mt-2">
          {t('settings.typingIndicatorsHelp')}
        </p>
      </div>

      <Separator className="my-4" />

      {isEnhancedConnectivityAvailable && (
        <>
          <h2 className="text-xl font-medium mb-4">
            {t('settings.networkingTitle')}
          </h2>
          <EnhancedConnectivityControl
            isEnabled={isEnhancedConnectivityEnabled}
            onChange={handleIsEnhancedConnectivityEnabledChange}
            variant="subtitle2"
          />
          <Separator className="my-4" />
        </>
      )}

      <h2 className="text-xl font-medium mb-4">{t('settings.dataTitle')}</h2>

      <h3 className="text-base font-medium mb-3">
        {t('settings.exportProfileTitle')}
      </h3>
      <p className="text-base mb-4">{t('settings.exportProfileBody')}</p>
      <Button
        variant="outline"
        className="mb-4"
        onClick={handleExportSettingsClick}
      >
        {t('settings.exportProfile')}
      </Button>

      <h3 className="text-base font-medium mb-3">
        {t('settings.importProfileTitle')}
      </h3>
      <p className="text-base mb-4">{t('settings.importProfileBody')}</p>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleImportFile}
      />
      <Button
        variant="outline"
        className="mb-4 text-amber-600 border-amber-600 hover:bg-amber-50"
        onClick={() => fileInputRef.current?.click()}
      >
        {t('settings.importProfile')}
      </Button>

      <h3 className="text-base font-medium mb-3">
        {t('settings.deleteProfileTitle')}
      </h3>
      <p className="text-base mb-4">{t('settings.deleteProfileBody')}</p>
      <p className="text-base mb-4">
        <strong>{t('settings.deleteProfileWarningStart')}</strong>{' '}
        <strong>
          <PeerNameDisplay className="font-medium">{userId}</PeerNameDisplay>
        </strong>{' '}
        {t('settings.deleteProfileWarningEnd')}
      </p>
      <Button
        variant="destructive"
        className="mb-4"
        onClick={handleDeleteSettingsClick}
      >
        {t('settings.deleteProfile')}
      </Button>
      <ConfirmDialog
        isOpen={isDeleteSettingsConfirmDiaglogOpen}
        onCancel={handleDeleteSettingsCancel}
        onConfirm={handleDeleteSettingsConfirm}
      />
      <p className="text-sm font-medium text-muted-foreground mb-4">
        {t('settings.localDataOnly')}
      </p>

      <Separator className="my-4" />
    </div>
  )
}
