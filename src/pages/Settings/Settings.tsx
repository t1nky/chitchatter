import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import useTheme from '@mui/material/styles/useTheme'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import FileReaderInput, { Result } from 'react-file-reader-input'

import { ConfirmDialog } from 'components/ConfirmDialog'
import { EnhancedConnectivityControl } from 'components/EnhancedConnectivityControl'
import { PeerNameDisplay } from 'components/PeerNameDisplay'
import { SoundSelector } from 'components/SoundSelector/SoundSelector'
import { isEnhancedConnectivityAvailable } from 'config/enhancedConnectivity'
import { SettingsContext } from 'contexts/SettingsContext'
import { ShellContext } from 'contexts/ShellContext'
import { StorageContext } from 'contexts/StorageContext'
import { getLanguageLabel, t } from 'i18n'
import { Language } from 'models/settings'
import { notification } from 'services/Notification'
import { settings } from 'services/Settings'

import { isErrorWithMessage } from '../../lib/type-guards'

interface SettingsProps {
  userId: string
}

export const Settings = ({ userId }: SettingsProps) => {
  const theme = useTheme()

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
    setTitle(t(language, 'settingsTitle'))
  }, [language, setTitle])

  const handleLanguageChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    updateUserSettings({ language: event.target.value as Language })
  }

  const handlePlaySoundOnNewMessageChange = (
    _event: ChangeEvent,
    newPlaySoundOnNewMessage: boolean
  ) => {
    updateUserSettings({ playSoundOnNewMessage: newPlaySoundOnNewMessage })
  }

  const handleShowNotificationOnNewMessageChange = (
    _event: ChangeEvent,
    newShowNotificationOnNewMessage: boolean
  ) => {
    updateUserSettings({
      showNotificationOnNewMessage: newShowNotificationOnNewMessage,
    })
  }

  const handleShowActiveTypingStatusChange = (
    _event: ChangeEvent,
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

  const handleImportSettingsClick = async ([[, file]]: Result[]) => {
    try {
      const userSettings = await settings.importSettings(file)

      updateUserSettings(userSettings)

      showAlert(t(language, 'profileImported'), { severity: 'success' })
    } catch (e) {
      if (isErrorWithMessage(e)) {
        showAlert(e.message, { severity: 'error' })
      }
    }
  }

  const areNotificationsAvailable = notification.permission === 'granted'

  return (
    <Box sx={{ p: 2, mx: 'auto', maxWidth: theme.breakpoints.values.md }}>
      <Typography
        variant="h2"
        sx={{
          fontSize: theme.typography.h3.fontSize,
          fontWeight: theme.typography.fontWeightMedium,
          mb: 2,
        }}
      >
        {t(language, 'settingsLanguageTitle')}
      </Typography>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <TextField
          select
          fullWidth
          label={t(language, 'language')}
          value={language}
          onChange={handleLanguageChange}
          helperText={t(language, 'languageHelp')}
        >
          {Object.values(Language).map(languageOption => (
            <MenuItem key={languageOption} value={languageOption}>
              {getLanguageLabel(languageOption)}
            </MenuItem>
          ))}
        </TextField>
      </Paper>
      <Typography
        variant="h2"
        sx={{
          fontSize: theme.typography.h3.fontSize,
          fontWeight: theme.typography.fontWeightMedium,
          mb: 2,
        }}
      >
        {t(language, 'settingsChatTitle')}
      </Typography>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography>{t(language, 'chatBackgroundBehavior')}</Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={playSoundOnNewMessage}
                onChange={handlePlaySoundOnNewMessageChange}
              />
            }
            label={t(language, 'playSound')}
          />
          <FormControlLabel
            control={
              <Switch
                checked={
                  areNotificationsAvailable && showNotificationOnNewMessage
                }
                onChange={handleShowNotificationOnNewMessageChange}
                disabled={!areNotificationsAvailable}
              />
            }
            label={t(language, 'showNotification')}
          />
        </FormGroup>
        <Typography mt={2}>{t(language, 'soundSelectorLabel')}</Typography>
        <SoundSelector disabled={!playSoundOnNewMessage} />
      </Paper>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={showActiveTypingStatus}
                onChange={handleShowActiveTypingStatusChange}
              />
            }
            label={t(language, 'typingIndicators')}
          />
        </FormGroup>
        <Typography variant="subtitle2">
          {t(language, 'typingIndicatorsHelp')}
        </Typography>
      </Paper>
      <Divider sx={{ my: 2 }} />
      {isEnhancedConnectivityAvailable && (
        <>
          <Typography
            variant="h2"
            sx={{
              fontSize: theme.typography.h3.fontSize,
              fontWeight: theme.typography.fontWeightMedium,
              mb: 2,
            }}
          >
            {t(language, 'networkingTitle')}
          </Typography>
          <EnhancedConnectivityControl
            isEnabled={isEnhancedConnectivityEnabled}
            onChange={handleIsEnhancedConnectivityEnabledChange}
            variant="subtitle2"
          />
          <Divider sx={{ my: 2 }} />
        </>
      )}
      <Typography
        variant="h2"
        sx={{
          fontSize: theme.typography.h3.fontSize,
          fontWeight: theme.typography.fontWeightMedium,
          mb: 2,
        }}
      >
        {t(language, 'dataTitle')}
      </Typography>
      <Typography
        variant="h2"
        sx={{
          fontSize: theme.typography.h5.fontSize,
          fontWeight: theme.typography.fontWeightMedium,
          mb: 1.5,
        }}
      >
        {t(language, 'exportProfileTitle')}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {t(language, 'exportProfileBody')}
      </Typography>
      <Button
        variant="outlined"
        sx={{ mb: 2 }}
        onClick={handleExportSettingsClick}
      >
        {t(language, 'exportProfile')}
      </Button>
      <Typography
        variant="h2"
        sx={{
          fontSize: theme.typography.h5.fontSize,
          fontWeight: theme.typography.fontWeightMedium,
          mb: 1.5,
        }}
      >
        {t(language, 'importProfileTitle')}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {t(language, 'importProfileBody')}
      </Typography>
      <FileReaderInput
        {...{
          as: 'text',
          onChange: (_e, results) => {
            handleImportSettingsClick(results)
          },
        }}
      >
        <Button color="warning" variant="outlined" sx={{ mb: 2 }}>
          {t(language, 'importProfile')}
        </Button>
      </FileReaderInput>
      <Typography
        variant="h2"
        sx={{
          fontSize: theme.typography.h5.fontSize,
          fontWeight: theme.typography.fontWeightMedium,
          mb: 1.5,
        }}
      >
        {t(language, 'deleteProfileTitle')}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {t(language, 'deleteProfileBody')}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>{t(language, 'deleteProfileWarningStart')}</strong>{' '}
        <strong>
          <PeerNameDisplay
            sx={{
              fontWeight: theme.typography.fontWeightMedium,
            }}
          >
            {userId}
          </PeerNameDisplay>
        </strong>{' '}
        {t(language, 'deleteProfileWarningEnd')}
      </Typography>
      <Button
        variant="outlined"
        color="error"
        sx={{ mb: 2 }}
        onClick={handleDeleteSettingsClick}
      >
        {t(language, 'deleteProfile')}
      </Button>
      <ConfirmDialog
        isOpen={isDeleteSettingsConfirmDiaglogOpen}
        onCancel={handleDeleteSettingsCancel}
        onConfirm={handleDeleteSettingsConfirm}
      />
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        {t(language, 'localDataOnly')}
      </Typography>
      <Divider sx={{ my: 2 }} />
    </Box>
  )
}
