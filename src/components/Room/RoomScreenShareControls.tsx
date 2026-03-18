import { ComputerPhoneSyncIcon, Cancel01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useTranslation } from 'react-i18next'

import { PeerRoom } from 'lib/PeerRoom'

import { Tooltip, TooltipTrigger, TooltipContent } from 'components/ui/tooltip'

import { useRoomScreenShare } from './useRoomScreenShare'
import { MediaButton } from './MediaButton'

export interface RoomFileUploadControlsProps {
  peerRoom: PeerRoom
}

export function RoomScreenShareControls({
  peerRoom,
}: RoomFileUploadControlsProps) {
  const { t } = useTranslation()
  const { isSharingScreen, handleScreenShareStart, handleScreenShareStop } =
    useRoomScreenShare({
      peerRoom,
    })

  const handleToggleScreenShareButtonClick = () => {
    if (isSharingScreen) {
      handleScreenShareStop()
    } else {
      handleScreenShareStart()
    }
  }

  if (!window.navigator?.mediaDevices?.getDisplayMedia) {
    return <></>
  }

  return (
    <div className="flex flex-col items-center justify-center px-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <MediaButton
            isActive={isSharingScreen}
            aria-label={t('room.controls.shareScreenAria')}
            onClick={handleToggleScreenShareButtonClick}
          >
            {isSharingScreen ? (
              <HugeiconsIcon
                icon={ComputerPhoneSyncIcon}
                strokeWidth={1.8}
                className="size-4"
              />
            ) : (
              <HugeiconsIcon
                icon={Cancel01Icon}
                strokeWidth={1.8}
                className="size-4"
              />
            )}
          </MediaButton>
        </TooltipTrigger>
        <TooltipContent>
          {isSharingScreen
            ? t('room.controls.stopSharingScreen')
            : t('room.controls.shareScreen')}
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
