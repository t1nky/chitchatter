import { useWindowSize } from '@react-hook/window-size'
import {
  PropsWithChildren,
  SyntheticEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'

import { ErrorBoundary } from 'components/ErrorBoundary'
import { AppSidebar } from 'components/app-sidebar'
import { Sheet, SheetContent } from 'components/ui/sheet'
import { SidebarProvider } from 'components/ui/sidebar'
import { SettingsContext } from 'contexts/SettingsContext'
import {
  MessageLog,
  ShellContext,
  ShellMessageLog,
} from 'contexts/ShellContext'
import { PeerConnectionType, PeerRoom } from 'lib/PeerRoom'
import {
  AudioChannel,
  AudioChannelName,
  AudioState,
  Peer,
  PeerAudioChannelState,
  ScreenShareState,
  VideoState,
} from 'models/chat'
import { AlertOptions, AlertSeverity, QueryParamKeys } from 'models/shell'

import { allowAdvancedRoomLinkSharing } from './constants'
import {
  EnvironmentUnsupportedDialog,
  isEnvironmentSupported,
} from './EnvironmentUnsupportedDialog'
import { NotificationArea } from './NotificationArea'
import { PeerList, peerListWidth } from './PeerList'
import { QRCodeDialog } from './QRCodeDialog'
import { RoomShareDialog } from './RoomShareDialog'
import { RouteContent } from './RouteContent'
import { ServerConnectionFailureDialog } from './ServerConnectionFailureDialog'
import { ShellAppBar } from './ShellAppBar'
import { UpgradeDialog } from './UpgradeDialog'
import { useConnectionTest } from './useConnectionTest'
import { useShellTheme } from './useShellTheme'

export interface ShellProps extends PropsWithChildren {
  userPeerId: string
  appNeedsUpdate: boolean
}

const LG_BREAKPOINT = 1280

const queryParams = new URLSearchParams(window.location.search)

export const Shell = ({ appNeedsUpdate, children, userPeerId }: ShellProps) => {
  const { t } = useTranslation()
  const { getUserSettings, updateUserSettings } = useContext(SettingsContext)
  const isEmbedded = queryParams.get(QueryParamKeys.IS_EMBEDDED) !== null

  const theme = useShellTheme()

  const [windowWidth] = useWindowSize()
  const defaultSidebarsOpen = windowWidth >= LG_BREAKPOINT

  const peerRoomRef = useRef<PeerRoom>(null)
  const [isAlertShowing, setIsAlertShowing] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(defaultSidebarsOpen)
  const [isQRCodeDialogOpen, setIsQRCodeDialogOpen] = useState(false)
  const [isRoomShareDialogOpen, setIsRoomShareDialogOpen] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState<AlertSeverity>('info')
  const [showAppBar, setShowAppBar] = useState(true)
  const [showRoomControls, setShowRoomControls] = useState(!isEmbedded)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [title, setTitle] = useState('')
  const [alertText, setAlertText] = useState('')
  const [roomId, setRoomId] = useState<string | undefined>(undefined)
  const [password, setPassword] = useState<string | undefined>(undefined)
  const [isPeerListOpen, setIsPeerListOpen] = useState(defaultSidebarsOpen)
  const [peerList, setPeerList] = useState<Peer[]>([]) // except self
  const [
    isServerConnectionFailureDialogOpen,
    setIsServerConnectionFailureDialogOpen,
  ] = useState(false)
  const [peerConnectionTypes, setPeerConnectionTypes] = useState<
    Record<string, PeerConnectionType>
  >({})
  const [tabHasFocus, setTabHasFocus] = useState(true)
  const [audioChannelState, setAudioChannelState] =
    useState<PeerAudioChannelState>({
      [AudioChannelName.MICROPHONE]: AudioState.STOPPED,
      [AudioChannelName.SCREEN_SHARE]: AudioState.STOPPED,
    })
  const [videoState, setVideoState] = useState<VideoState>(VideoState.STOPPED)
  const [screenState, setScreenState] = useState<ScreenShareState>(
    ScreenShareState.NOT_SHARING
  )
  const [customUsername, setCustomUsername] = useState(
    getUserSettings().customUsername
  )
  const [peerAudioChannels, setPeerAudioChannels] = useState<
    Record<string, AudioChannel>
  >({})

  const [shellMessageLog, setShellMessageLog] = useState<ShellMessageLog>({
    groupMessageLog: [],
    directMessageLog: {},
  })

  const messageLog = shellMessageLog

  const setMessageLog = useCallback(
    (newMessageLog: MessageLog, targetPeerId: string | null) => {
      setShellMessageLog(prev => {
        const isDirectMessageLog = typeof targetPeerId === 'string'

        const newShellMessageLog: ShellMessageLog = {
          groupMessageLog: isDirectMessageLog
            ? prev.groupMessageLog
            : newMessageLog,
          directMessageLog: {
            ...prev.directMessageLog,
            ...(isDirectMessageLog && {
              [targetPeerId]: newMessageLog,
            }),
          },
        }

        return newShellMessageLog
      })
    },
    []
  )

  const showAlert = useCallback((message: string, options?: AlertOptions) => {
    setAlertText(message)
    setAlertSeverity(options?.severity ?? 'info')
    setIsAlertShowing(true)
  }, [])

  const { connectionTestResults } = useConnectionTest()

  const updatePeer = useCallback(
    (peerId: string, updatedProperties: Partial<Peer>) => {
      setPeerList(prev => {
        const peerIndex = prev.findIndex(peer => peer.peerId === peerId)
        const doesPeerExist = peerIndex !== -1

        if (!doesPeerExist) return prev

        const peerListClone = [...prev]
        const peer = prev[peerIndex]
        peerListClone[peerIndex] = { ...peer, ...updatedProperties }
        return peerListClone
      })
    },
    []
  )

  const shellContextValue = useMemo(
    () => ({
      isEmbedded,
      tabHasFocus,
      showRoomControls,
      setShowRoomControls,
      setTitle,
      showAlert,
      isPeerListOpen,
      setIsQRCodeDialogOpen,
      roomId,
      setRoomId,
      password,
      setPassword,
      setIsPeerListOpen,
      peerList,
      setPeerList,
      isServerConnectionFailureDialogOpen,
      setIsServerConnectionFailureDialogOpen,
      peerConnectionTypes,
      setPeerConnectionTypes,
      audioChannelState,
      setAudioChannelState,
      videoState,
      setVideoState,
      screenState,
      setScreenState,
      peerAudioChannels,
      setPeerAudioChannels,
      customUsername,
      setCustomUsername,
      connectionTestResults,
      updatePeer,
      peerRoomRef,
      messageLog,
      setMessageLog,
    }),
    [
      isEmbedded,
      isPeerListOpen,
      setIsQRCodeDialogOpen,
      roomId,
      setRoomId,
      password,
      setPassword,
      peerList,
      isServerConnectionFailureDialogOpen,
      setIsServerConnectionFailureDialogOpen,
      peerConnectionTypes,
      tabHasFocus,
      showRoomControls,
      setShowRoomControls,
      setTitle,
      showAlert,
      audioChannelState,
      setAudioChannelState,
      videoState,
      setVideoState,
      screenState,
      setScreenState,
      peerAudioChannels,
      setPeerAudioChannels,
      customUsername,
      setCustomUsername,
      connectionTestResults,
      updatePeer,
      peerRoomRef,
      messageLog,
      setMessageLog,
    ]
  )

  const handleAlertClose = (
    _event?: SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setIsAlertShowing(false)
  }

  useEffect(() => {
    if (customUsername === getUserSettings().customUsername) return

    updateUserSettings({ customUsername })
  }, [customUsername, getUserSettings, updateUserSettings])

  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    const root = document.documentElement
    const isDarkMode = theme.mode === 'dark'

    root.classList.toggle('dark', isDarkMode)
    root.style.colorScheme = theme.mode
  }, [theme.mode])

  const enterFullscreen = async () => {
    const body: any = document.body

    try {
      if (body.requestFullscreen) {
        await body.requestFullscreen()
      } else if (body.webkitRequestFullscreen) {
        await body.webkitRequestFullscreen()
      } else if (body.mozRequestFullScreen) {
        await body.mozRequestFullScreen()
      } else if (body.msRequestFullscreen) {
        await body.msRequestFullscreen()
      }
    } catch (_e) {
      // Silence harmless errors
    }
  }

  const exitFullscreen = async () => {
    const document: any = window.document
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        await document.webkitExitFullscreen()
      } else if (document.mozCancelFullScreen) {
        await document.mozCancelFullScreen()
      } else if (document.msExitFullScreen) {
        await document.msExitFullScreen()
      }
    } catch (_e) {
      // Silence harmless errors
    }
  }

  useEffect(() => {
    if (isFullscreen) {
      enterFullscreen()
      setShowRoomControls(false)
      setShowAppBar(false)
    } else {
      exitFullscreen()
      setShowAppBar(true)

      if (!isEmbedded) {
        setShowRoomControls(true)
      }
    }
  }, [isFullscreen, setShowRoomControls, setShowAppBar, isEmbedded])

  useEffect(() => {
    if (isFullscreen) setShowAppBar(showRoomControls)
  }, [isFullscreen, showRoomControls, setShowAppBar])

  useEffect(() => {
    const handleFocus = () => {
      setTabHasFocus(true)
    }
    const handleBlur = () => {
      setTabHasFocus(false)
    }
    const handleFullscreen = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    window.addEventListener('focus', handleFocus)
    window.addEventListener('blur', handleBlur)
    document.addEventListener('fullscreenchange', handleFullscreen)
    return () => {
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('blur', handleBlur)
      document.removeEventListener('fullscreenchange', handleFullscreen)
    }
  }, [])

  const handlePeerListClick = () => {
    setIsPeerListOpen(prev => !prev)
  }

  const peerListAsOverlay = windowWidth < LG_BREAKPOINT

  const copyToClipboard = async (
    content: string,
    alert: string,
    severity: AlertSeverity = 'success'
  ) => {
    await navigator.clipboard.writeText(content)
    shellContextValue.showAlert(alert, { severity })
  }

  const handleLinkButtonClick = async () => {
    if (
      roomId !== undefined &&
      password !== undefined &&
      allowAdvancedRoomLinkSharing
    ) {
      setIsRoomShareDialogOpen(true)
    } else {
      copyToClipboard(
        window.location.href,
        t('dialogs.roomShare.copiedCurrentUrl')
      )
    }
  }

  const handleQRCodeDialogClose = () => {
    setIsQRCodeDialogOpen(false)
  }

  const handleRoomShareDialogClose = () => {
    setIsRoomShareDialogOpen(false)
  }

  return (
    <ShellContext.Provider value={shellContextValue}>
      {isEnvironmentSupported ? (
        <>
          <UpgradeDialog appNeedsUpdate={appNeedsUpdate} />
          <div className="Chitchatter flex h-screen overflow-hidden">
            <NotificationArea
              alertSeverity={alertSeverity}
              alertText={alertText}
              isAlertShowing={isAlertShowing}
              onAlertClose={handleAlertClose}
            />
            <SidebarProvider
              defaultOpen={defaultSidebarsOpen}
              open={isEmbedded ? true : isDrawerOpen}
              onOpenChange={isEmbedded ? undefined : setIsDrawerOpen}
              style={
                {
                  '--header-height': '3.5rem',
                } as React.CSSProperties
              }
            >
              {isEmbedded ? null : <AppSidebar />}
              <RouteContent
                isPeerListOpen={!peerListAsOverlay && isPeerListOpen}
              >
                <ShellAppBar
                  onLinkButtonClick={handleLinkButtonClick}
                  title={title}
                  onPeerListClick={handlePeerListClick}
                  onRoomControlsClick={() => setShowRoomControls(prev => !prev)}
                  setIsQRCodeDialogOpen={setIsQRCodeDialogOpen}
                  showAppBar={showAppBar}
                  isFullscreen={isFullscreen}
                  setIsFullscreen={setIsFullscreen}
                />
                <div className="flex min-h-0 grow flex-col overflow-auto">
                  <ErrorBoundary>{children}</ErrorBoundary>
                </div>
              </RouteContent>
              {!peerListAsOverlay && (
                <>
                  {/* Gap div that pushes content left when peer list is open */}
                  <div
                    className="shrink-0 transition-[width] duration-200"
                    style={{ width: isPeerListOpen ? peerListWidth : 0 }}
                  />
                  {/* Fixed peer list panel */}
                  <div
                    className={`fixed inset-y-0 right-0 z-30 p-2 transition-transform duration-200 ${
                      isPeerListOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                    style={{ width: peerListWidth }}
                  >
                    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
                      <PeerList
                        userId={userPeerId}
                        roomId={roomId}
                        onPeerListClose={handlePeerListClick}
                        peerList={peerList}
                        peerConnectionTypes={peerConnectionTypes}
                        peerAudioChannelState={audioChannelState}
                        peerAudioChannels={peerAudioChannels}
                        connectionTestResults={connectionTestResults}
                      />
                      {isEmbedded ? (
                        <p className="px-4 py-4 pb-7 text-center text-xs text-muted-foreground">
                          {t('shell.embeddedFooterPrefix')}{' '}
                          <a
                            href="https://github.com/jeremyckahn/chitchatter"
                            target="_blank"
                            className="text-primary underline underline-offset-4 hover:text-primary/80"
                            rel="noreferrer"
                          >
                            {t('shell.embeddedFooterLink')}
                          </a>
                        </p>
                      ) : null}
                    </div>
                  </div>
                </>
              )}
            </SidebarProvider>
            {peerListAsOverlay && (
              <Sheet
                open={isPeerListOpen}
                onOpenChange={open => setIsPeerListOpen(open)}
              >
                <SheetContent
                  side="right"
                  className="w-[280px] p-0"
                  showCloseButton={false}
                >
                  <PeerList
                    userId={userPeerId}
                    roomId={roomId}
                    onPeerListClose={handlePeerListClick}
                    peerList={peerList}
                    peerConnectionTypes={peerConnectionTypes}
                    peerAudioChannelState={audioChannelState}
                    peerAudioChannels={peerAudioChannels}
                    connectionTestResults={connectionTestResults}
                  />
                </SheetContent>
              </Sheet>
            )}
            <QRCodeDialog
              isOpen={isQRCodeDialogOpen}
              handleClose={handleQRCodeDialogClose}
            />
            <RoomShareDialog
              isOpen={isRoomShareDialogOpen}
              handleClose={handleRoomShareDialogClose}
              roomId={roomId ?? ''}
              password={password ?? ''}
              showAlert={showAlert}
              copyToClipboard={copyToClipboard}
            />
            <ServerConnectionFailureDialog />
          </div>
        </>
      ) : (
        <EnvironmentUnsupportedDialog />
      )}
    </ShellContext.Provider>
  )
}
