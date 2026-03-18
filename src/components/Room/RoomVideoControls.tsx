import { useState } from 'react'
import { Video01Icon, VideoOffIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useTranslation } from 'react-i18next'

import { PeerRoom } from 'lib/PeerRoom'

import { Tooltip, TooltipTrigger, TooltipContent } from 'components/ui/tooltip'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'components/ui/dropdown-menu'

import { useRoomVideo } from './useRoomVideo'
import { MediaButton } from './MediaButton'

export interface RoomVideoControlsProps {
  peerRoom: PeerRoom
}

export function RoomVideoControls({ peerRoom }: RoomVideoControlsProps) {
  const { t } = useTranslation()
  const {
    videoDevices,
    isCameraEnabled,
    setIsCameraEnabled,
    handleVideoDeviceSelect,
  } = useRoomVideo({ peerRoom })

  const [selectedVideoDeviceIdx, setSelectedVideoDeviceIdx] = useState(0)

  const handleEnableCameraClick = () => {
    setIsCameraEnabled(!isCameraEnabled)
  }

  const handleVideoDeviceMenuItemClick = (idx: number) => {
    setSelectedVideoDeviceIdx(idx)
    handleVideoDeviceSelect(videoDevices[idx])
  }

  return (
    <div className="flex flex-col items-center justify-center px-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <MediaButton
            isActive={isCameraEnabled}
            aria-label={t('room.controls.cameraControl')}
            onClick={handleEnableCameraClick}
          >
            {isCameraEnabled ? (
              <HugeiconsIcon
                icon={Video01Icon}
                strokeWidth={1.8}
                className="size-4"
              />
            ) : (
              <HugeiconsIcon
                icon={VideoOffIcon}
                strokeWidth={1.8}
                className="size-4"
              />
            )}
          </MediaButton>
        </TooltipTrigger>
        <TooltipContent>
          {isCameraEnabled
            ? t('room.controls.turnOffCamera')
            : t('room.controls.turnOnCamera')}
        </TooltipContent>
      </Tooltip>
      {videoDevices.length > 0 && isCameraEnabled && (
        <div className="mt-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                id="video-input-select-button"
                aria-haspopup="listbox"
                aria-label={t('room.controls.cameraToUse')}
                className="cursor-pointer rounded-md bg-card px-3 py-2 text-left text-sm"
              >
                <div className="text-xs text-muted-foreground">
                  {t('room.controls.selectedCamera')}
                </div>
                <div>{videoDevices[selectedVideoDeviceIdx]?.label}</div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              id="video-input-select-menu"
              aria-labelledby="video-input-select-button"
              role="listbox"
            >
              {videoDevices.map((videoDevice, idx) => (
                <DropdownMenuItem
                  key={videoDevice.deviceId}
                  className={idx === selectedVideoDeviceIdx ? 'bg-accent' : ''}
                  onClick={() => handleVideoDeviceMenuItemClick(idx)}
                >
                  {videoDevice.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  )
}
