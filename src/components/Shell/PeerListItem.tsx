import {
  ShieldKeyIcon,
  ComputerPhoneSyncIcon,
  SecurityLockIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { AudioVolume } from 'components/AudioVolume'
import { PeerNameDisplay } from 'components/PeerNameDisplay'
import { PublicKey } from 'components/PublicKey'
import { Room } from 'components/Room'
import { Button } from 'components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from 'components/ui/collapsible'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'components/ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'components/ui/tooltip'
import { PeerConnectionType } from 'lib/PeerRoom'
import {
  AudioChannel,
  AudioChannelName,
  Peer,
  PeerVerificationState,
} from 'models/chat'
import { SettingsContext } from 'contexts/SettingsContext'

import { PeerDownloadFileButton } from './PeerDownloadFileButton'

interface PeerListItemProps {
  peer: Peer
  peerConnectionTypes: Record<string, PeerConnectionType>
  peerAudioChannels: Record<string, AudioChannel>
  roomId: string
}

export const PeerListItem = ({
  peer,
  peerConnectionTypes,
  peerAudioChannels,
  roomId,
}: PeerListItemProps) => {
  const { t } = useTranslation()
  const { getUserSettings } = useContext(SettingsContext)
  const { userId } = getUserSettings()
  const [showPeerDialog, setShowPeerDialog] = useState(false)

  const hasPeerConnection = peer.peerId in peerConnectionTypes

  const isPeerConnectionDirect =
    peerConnectionTypes[peer.peerId] === PeerConnectionType.DIRECT

  const handleListItemTextClick = () => {
    setShowPeerDialog(true)
  }

  const handleDialogClose = () => {
    setShowPeerDialog(false)
  }

  const microphoneAudio =
    peerAudioChannels[peer.peerId]?.[AudioChannelName.MICROPHONE]
  const screenShareAudio =
    peerAudioChannels[peer.peerId]?.[AudioChannelName.SCREEN_SHARE]

  const verificationStateDisplayMap = {
    [PeerVerificationState.UNVERIFIED]: (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <HugeiconsIcon
                icon={SecurityLockIcon}
                strokeWidth={1.8}
                className="size-4"
              />
            </span>
          </TooltipTrigger>
          <TooltipContent>
            {t('room.verification.unverifiedTooltip')}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
    [PeerVerificationState.VERIFIED]: (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <HugeiconsIcon
                icon={ShieldKeyIcon}
                strokeWidth={1.8}
                className="size-4"
              />
            </span>
          </TooltipTrigger>
          <TooltipContent>
            {t('room.verification.verifiedTooltip')}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
    [PeerVerificationState.VERIFYING]: (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <div className="relative top-[3px] size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            </span>
          </TooltipTrigger>
          <TooltipContent>
            {t('room.verification.verifyingTooltip')}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  }

  return (
    <>
      <li key={peer.peerId} className="flex items-center border-b px-4 py-2">
        <PeerDownloadFileButton peer={peer} />
        <div className="min-w-0 flex-1">
          <div
            className="flex cursor-pointer items-center"
            onClick={handleListItemTextClick}
          >
            {hasPeerConnection ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-pointer pr-2">
                      {isPeerConnectionDirect ? (
                        <HugeiconsIcon
                          icon={ComputerPhoneSyncIcon}
                          strokeWidth={1.8}
                          className="size-4"
                        />
                      ) : (
                        <HugeiconsIcon
                          icon={ComputerPhoneSyncIcon}
                          strokeWidth={1.8}
                          className="size-4"
                        />
                      )}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    {isPeerConnectionDirect
                      ? t('room.connection.directTo', { name: peer.userId })
                      : t('room.connection.relayedTo', {
                          name: peer.userId,
                        })}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : null}
            <span className="cursor-pointer pr-2">
              {verificationStateDisplayMap[peer.verificationState]}
            </span>
            <PeerNameDisplay>{peer.userId}</PeerNameDisplay>
          </div>
          {microphoneAudio && (
            <AudioVolume
              audioEl={microphoneAudio}
              audioChannelName={AudioChannelName.MICROPHONE}
            />
          )}
          {screenShareAudio && (
            <AudioVolume
              audioEl={screenShareAudio}
              audioChannelName={AudioChannelName.SCREEN_SHARE}
            />
          )}
        </div>
      </li>
      <Dialog open={showPeerDialog} onOpenChange={setShowPeerDialog}>
        <DialogContent className="h-[calc(100vh-4rem)] max-w-md sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              {verificationStateDisplayMap[peer.verificationState]}
              <span className="ml-2">
                <PeerNameDisplay>{peer.userId}</PeerNameDisplay>
              </span>
            </DialogTitle>
            <DialogDescription className="sr-only">
              {t('room.peerDetails')}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-1 flex-col overflow-hidden">
            <Collapsible>
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted">
                {t('room.verification.publicKey')}
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 py-2">
                <PublicKey publicKey={peer.publicKey} />
              </CollapsibleContent>
            </Collapsible>
            <div className="mt-2 flex flex-1 flex-col overflow-auto rounded-md bg-background">
              <Room
                roomId={roomId}
                userId={userId}
                targetPeerId={peer.peerId}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleDialogClose}>
              {t('userInfo.close')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
