import { useContext } from 'react'
import { Link } from 'react-router-dom'

import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import GitHubIcon from '@mui/icons-material/GitHub'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import MuiLink from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import { Cached, ExpandMore } from '@mui/icons-material'
import styled from '@mui/material/styles/styled'
import useTheme from '@mui/material/styles/useTheme'

import { Form, Main } from 'components/Elements'
import { EnhancedConnectivityControl } from 'components/EnhancedConnectivityControl'
import { PeerNameDisplay } from 'components/PeerNameDisplay'
import { routes } from 'config/routes'
import { SettingsContext } from 'contexts/SettingsContext'
import Logo from 'img/logo.svg?react'
import { getLanguageLabel, t } from 'i18n'
import { RoomNameType } from 'lib/RoomNameGenerator'
import { Language } from 'models/settings'

import { isEnhancedConnectivityAvailable } from '../../config/enhancedConnectivity'

import { CommunityRoomSelector } from './CommunityRoomSelector'
import { EmbedCodeDialog } from './EmbedCodeDialog'
import { useHome } from './useHome'

const StyledLogo = styled(Logo)({})

export interface HomeProps {
  userId: string
}

export function Home({ userId }: HomeProps) {
  const theme = useTheme()
  const { updateUserSettings, getUserSettings } = useContext(SettingsContext)
  const { isEnhancedConnectivityEnabled, language } = getUserSettings()
  const {
    roomName,
    roomNameType,
    showEmbedCode,
    handleRoomNameChange,
    handleRoomNameTypeChange,
    regenerateRoomName,
    handleFormSubmit,
    handleJoinPublicRoomClick,
    handleJoinPrivateRoomClick,
    handleGetEmbedCodeClick,
    handleEmbedCodeWindowClose,
    isRoomNameValid,
  } = useHome()

  const handleIsEnhancedConnectivityEnabledChange = (
    _event: React.ChangeEvent<{}>,
    newIsEnhancedConnectivityEnabled: boolean
  ) => {
    updateUserSettings({
      isEnhancedConnectivityEnabled: newIsEnhancedConnectivityEnabled,
    })
  }

  const handleLanguageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    await updateUserSettings({
      language: event.target.value as Language,
    })
  }

  return (
    <Box className="Home">
      <EmbedCodeDialog
        showEmbedCode={showEmbedCode}
        handleEmbedCodeWindowClose={handleEmbedCodeWindowClose}
        roomName={roomName}
      />
      <Main
        sx={{
          maxWidth: theme.breakpoints.values.md,
          mt: 3,
          mx: 'auto',
          px: 2,
          textAlign: 'center',
        }}
      >
        <Link to={routes.ABOUT} aria-label="Go to About page">
          <StyledLogo
            sx={{
              px: 0.5,
              pb: 2,
              mx: 'auto',
              maxWidth: theme.breakpoints.values.sm,
            }}
          />
        </Link>
        <Form
          onSubmit={handleFormSubmit}
          sx={{ maxWidth: theme.breakpoints.values.sm, mx: 'auto' }}
        >
          <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, textAlign: 'left' }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: theme.typography.h4.fontSize, sm: '2.4rem' },
                fontWeight: theme.typography.fontWeightBold,
                lineHeight: 1.1,
                mb: 1.5,
              }}
            >
              {t(language, 'homeTitle')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {t(language, 'homeSubtitle')}
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                select
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
            </FormControl>
            <Typography sx={{ mb: 2 }}>
              {t(language, 'yourName')}:{' '}
              <PeerNameDisplay paragraph={false} sx={{ fontWeight: 'bold' }}>
                {userId}
              </PeerNameDisplay>
            </Typography>
            <FormControl fullWidth>
              <TextField
                label={t(language, 'roomNameLabel')}
                variant="outlined"
                value={roomName}
                onChange={handleRoomNameChange}
                helperText={t(language, 'roomNameHelp')}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label={t(language, 'regenerateRoomId')}
                      onClick={regenerateRoomName}
                      size="small"
                    >
                      <Cached />
                    </IconButton>
                  ),
                }}
              />
            </FormControl>
            <Box sx={{ mt: 2, mb: 3 }}>
              <Typography
                variant="subtitle2"
                sx={{ color: theme.palette.text.secondary, mb: 1 }}
              >
                {t(language, 'roomNameType')}
              </Typography>
              <ToggleButtonGroup
                value={roomNameType}
                exclusive
                onChange={handleRoomNameTypeChange}
                aria-label={t(language, 'roomNameType')}
                size="small"
              >
                <ToggleButton
                  value={RoomNameType.PASSPHRASE}
                  aria-label={t(language, 'readableWords')}
                >
                  {t(language, 'readableWords')}
                </ToggleButton>
                <ToggleButton
                  value={RoomNameType.UUID}
                  aria-label={t(language, 'technicalId')}
                >
                  {t(language, 'technicalId')}
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Box sx={{ display: 'grid', gap: 1.5 }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleJoinPrivateRoomClick}
                disabled={!isRoomNameValid}
              >
                {t(language, 'startPrivateRoom')}
              </Button>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary }}
              >
                {t(language, 'startPrivateRoomHelp')}
              </Typography>
              <Button
                variant="outlined"
                size="large"
                onClick={handleJoinPublicRoomClick}
                disabled={!isRoomNameValid}
              >
                {t(language, 'openPublicRoom')}
              </Button>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary }}
              >
                {t(language, 'openPublicRoomHelp')}
              </Typography>
            </Box>
          </Paper>
          <Accordion sx={{ mt: 2, textAlign: 'left' }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box>
                <Typography fontWeight={theme.typography.fontWeightMedium}>
                  {t(language, 'advancedOptions')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t(language, 'advancedOptionsHelp')}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'grid', gap: 2 }}>
                <Box>
                  <Typography sx={{ mb: 1, fontWeight: 500 }}>
                    {t(language, 'communityRooms')}
                  </Typography>
                  <CommunityRoomSelector />
                </Box>
                {isEnhancedConnectivityAvailable && (
                  <EnhancedConnectivityControl
                    isEnabled={isEnhancedConnectivityEnabled}
                    onChange={handleIsEnhancedConnectivityEnabledChange}
                    showSecondaryColor={true}
                  />
                )}
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleGetEmbedCodeClick}
                  disabled={!isRoomNameValid}
                >
                  {t(language, 'embedCode')}
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Form>
      </Main>
      <Box component="section" aria-label="Additional options and information">
        <Divider sx={{ my: 2 }} />
        <Box
          sx={{
            maxWidth: theme.breakpoints.values.sm,
            mx: 'auto',
            textAlign: 'center',
            px: 2,
          }}
        >
          <Typography variant="body1">
            {t(language, 'privacySummary')}
          </Typography>
        </Box>
        <Box
          component="footer"
          sx={{
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <MuiLink
            href={import.meta.env.VITE_GITHUB_REPO}
            target="_blank"
            sx={() => ({
              color: theme.palette.text.primary,
            })}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="View source code on GitHub"
            >
              <GitHubIcon sx={{ fontSize: '2em' }} />
            </IconButton>
          </MuiLink>
          <Typography variant="body1" sx={{ textAlign: 'center', mb: 1 }}>
            {t(language, 'sourceCode')} under{' '}
            <MuiLink
              href="https://github.com/jeremyckahn/chitchatter/blob/develop/LICENSE"
              target="_blank"
            >
              GPL v2
            </MuiLink>
            . Please read the{' '}
            <MuiLink
              href="https://github.com/jeremyckahn/chitchatter/blob/develop/README.md"
              target="_blank"
            >
              {t(language, 'docs')}
            </MuiLink>
            .
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
