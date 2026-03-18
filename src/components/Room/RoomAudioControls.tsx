import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { Mic01Icon, MicOff01Icon } from '@hugeicons/core-free-icons'
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

import { useRoomAudio } from './useRoomAudio'
import { MediaButton } from './MediaButton'

export interface RoomAudioControlsProps {
  peerRoom: PeerRoom
}

export function RoomAudioControls({ peerRoom }: RoomAudioControlsProps) {
  const { t } = useTranslation()
  const {
    audioDevices,
    isSpeakingToRoom,
    setIsSpeakingToRoom,
    handleAudioDeviceSelect,
  } = useRoomAudio({ peerRoom })

  const [selectedAudioDeviceIdx, setSelectedAudioDeviceIdx] = useState(0)

  useHotkeys('ctrl+`', () => {
    setIsSpeakingToRoom(true)
  })

  useHotkeys(
    'ctrl+`',
    () => {
      setIsSpeakingToRoom(false)
    },
    { keyup: true }
  )

  const handleVoiceCallClick = () => {
    setIsSpeakingToRoom(!isSpeakingToRoom)
  }

  const handleAudioDeviceMenuItemClick = (idx: number) => {
    setSelectedAudioDeviceIdx(idx)
    handleAudioDeviceSelect(audioDevices[idx])
  }

  return (
    <div className="flex flex-col items-center justify-center px-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <MediaButton
            isActive={isSpeakingToRoom}
            aria-label={t('room.controls.microphoneControl')}
            onClick={handleVoiceCallClick}
          >
            {isSpeakingToRoom ? (
              <HugeiconsIcon
                icon={Mic01Icon}
                strokeWidth={1.8}
                className="size-4"
              />
            ) : (
              <HugeiconsIcon
                icon={MicOff01Icon}
                strokeWidth={1.8}
                className="size-4"
              />
            )}
          </MediaButton>
        </TooltipTrigger>
        <TooltipContent>
          {isSpeakingToRoom
            ? t('room.controls.turnOffMicrophone')
            : t('room.controls.turnOnMicrophone')}
        </TooltipContent>
      </Tooltip>
      {audioDevices.length > 0 && isSpeakingToRoom && (
        <div className="mt-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                id="audio-input-select-button"
                aria-haspopup="listbox"
                aria-label={t('room.controls.microphoneToUse')}
                className="cursor-pointer rounded-md bg-card px-3 py-2 text-left text-sm"
              >
                <div className="text-xs text-muted-foreground">
                  {t('room.controls.selectedMicrophone')}
                </div>
                <div>{audioDevices[selectedAudioDeviceIdx]?.label}</div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              id="audio-input-select-menu"
              aria-labelledby="audio-input-select-button"
              role="listbox"
            >
              {audioDevices.map((audioDevice, idx) => (
                <DropdownMenuItem
                  key={audioDevice.deviceId}
                  className={idx === selectedAudioDeviceIdx ? 'bg-accent' : ''}
                  onClick={() => handleAudioDeviceMenuItemClick(idx)}
                >
                  {audioDevice.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  )
}
