import { useWindowSize } from '@react-hook/window-size'
import { useContext } from 'react'
import { v4 as uuid } from 'uuid'

import { ChatTranscript } from 'components/ChatTranscript'
import { WholePageLoading } from 'components/Loading'
import { MessageForm } from 'components/MessageForm'
import { Separator } from 'components/ui/separator'
import { trackerUrls } from 'config/trackerUrls'
import { RoomContext } from 'contexts/RoomContext'
import { SettingsContext } from 'contexts/SettingsContext'
import { ShellContext } from 'contexts/ShellContext'
import { useTurnConfig } from 'hooks/useTurnConfig'
import { time } from 'lib/Time'
import { encryption } from 'services/Encryption'

import { RoomAudioControls } from './RoomAudioControls'
import { RoomFileUploadControls } from './RoomFileUploadControls'
import { RoomScreenShareControls } from './RoomScreenShareControls'
import { RoomShowMessagesControls } from './RoomShowMessagesControls'
import { RoomVideoControls } from './RoomVideoControls'
import { RoomVideoDisplay } from './RoomVideoDisplay'
import { TypingStatusBar } from './TypingStatusBar'
import { useRoom } from './useRoom'

export interface RoomProps {
  appId?: string
  getUuid?: typeof uuid
  password?: string
  roomId: string
  userId: string
  encryptionService?: typeof encryption
  timeService?: typeof time
  targetPeerId?: string
}

interface RoomInnerProps extends RoomProps {
  turnConfig: RTCConfiguration
}

const DEFAULT_APP_ID = `${encodeURI(window.location.origin)}_${import.meta.env.VITE_NAME}`

const RoomCore = ({
  appId = DEFAULT_APP_ID,
  getUuid = uuid,
  encryptionService = encryption,
  timeService = time,
  roomId,
  password,
  userId,
  targetPeerId,
  turnConfig,
}: RoomInnerProps) => {
  const settingsContext = useContext(SettingsContext)
  const { showActiveTypingStatus, publicKey } =
    settingsContext.getUserSettings()

  const {
    isDirectMessageRoom,
    handleInlineMediaUpload,
    handleMessageChange,
    isMessageSending,
    messageLog,
    peerRoom,
    roomContextValue,
    sendMessage,
    showVideoDisplay,
  } = useRoom(
    {
      appId,
      relayUrls: trackerUrls,
      password,
      relayRedundancy: 4,
      turnConfig: turnConfig.iceServers,
      // NOTE: Avoid using STUN severs in the E2E tests in order to make them
      // run faster
      ...(import.meta.env.VITE_IS_E2E_TEST && {
        rtcConfig: {
          iceServers: [],
        },
      }),
    },
    {
      roomId,
      userId,
      getUuid,
      publicKey,
      encryptionService,
      timeService,
      targetPeerId,
    }
  )

  const { showRoomControls } = useContext(ShellContext)
  const [windowWidth, windowHeight] = useWindowSize()
  const landscape = windowWidth > windowHeight

  const handleMessageSubmit = async (message: string) => {
    await sendMessage(message)
  }

  const showMessages = roomContextValue.isShowingMessages

  // NOTE: If rtcConfig fails to load, the useRtcConfig hook provides a
  // fallback so the room will continue to work with default settings

  return (
    <RoomContext.Provider value={roomContextValue}>
      <div className="Room flex h-full grow overflow-auto">
        <div className="flex grow flex-col overflow-auto">
          {!isDirectMessageRoom && (
            <div
              className={`flex items-start justify-center overflow-visible h-0 relative top-2 transition-all duration-300 ${
                showRoomControls
                  ? 'scale-100 opacity-100'
                  : 'pointer-events-none scale-0 opacity-0'
              }`}
            >
              <RoomAudioControls peerRoom={peerRoom} />
              <RoomVideoControls peerRoom={peerRoom} />
              <RoomScreenShareControls peerRoom={peerRoom} />
              <RoomFileUploadControls
                peerRoom={peerRoom}
                onInlineMediaUpload={handleInlineMediaUpload}
              />
              <div
                className={`transition-all duration-300 ${
                  showVideoDisplay
                    ? 'scale-100 opacity-100'
                    : 'pointer-events-none scale-0 opacity-0'
                }`}
              >
                {showVideoDisplay && <RoomShowMessagesControls />}
              </div>
            </div>
          )}
          <div
            className="flex h-full w-full overflow-auto"
            style={{ flexDirection: landscape ? 'row' : 'column' }}
          >
            {showVideoDisplay && (
              <RoomVideoDisplay
                userId={userId}
                width="100%"
                height={landscape || !showMessages ? '100%' : '60%'}
              />
            )}
            {showMessages && (
              <div
                className="flex flex-col grow"
                style={{
                  width: showVideoDisplay && landscape ? '400px' : '100%',
                  height: landscape ? '100%' : '40%',
                }}
              >
                <ChatTranscript
                  messageLog={messageLog}
                  userId={userId}
                  className={isDirectMessageRoom ? 'pt-2' : undefined}
                />
                <Separator />
                <div>
                  <MessageForm
                    onMessageSubmit={handleMessageSubmit}
                    isMessageSending={isMessageSending}
                    onMessageChange={handleMessageChange}
                  />
                  {showActiveTypingStatus ? (
                    <TypingStatusBar
                      isDirectMessageRoom={isDirectMessageRoom}
                    />
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </RoomContext.Provider>
  )
}

export const Room = (props: RoomProps) => {
  const { isEnhancedConnectivityEnabled } =
    useContext(SettingsContext).getUserSettings()

  // Fetch rtcConfig from server
  const { turnConfig, isLoading: isConfigLoading } = useTurnConfig(
    isEnhancedConnectivityEnabled
  )

  if (isConfigLoading) {
    return <WholePageLoading />
  }

  return <RoomCore {...props} turnConfig={turnConfig} />
}
