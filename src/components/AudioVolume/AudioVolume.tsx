import { useState, useEffect } from 'react'
import {
  VolumeHighIcon,
  VolumeLowIcon,
  VolumeMute01Icon,
  Mic01Icon,
  ComputerPhoneSyncIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useTranslation } from 'react-i18next'

import { AudioChannelName } from 'models/chat'
import { Slider } from 'components/ui/slider'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'components/ui/tooltip'

interface AudioVolumeProps {
  audioEl: HTMLAudioElement
  audioChannelName: AudioChannelName
}

export const AudioVolume = ({
  audioEl,
  audioChannelName,
}: AudioVolumeProps) => {
  const { t } = useTranslation()
  const [audioVolume, setAudioVolume] = useState(audioEl.volume)

  useEffect(() => {
    audioEl.volume = audioVolume
  }, [audioEl, audioVolume])

  const handleIconClick = () => {
    if (audioVolume === 0) {
      setAudioVolume(1)
    } else {
      setAudioVolume(0)
    }
  }

  const handleSliderChange = (value: number[]) => {
    setAudioVolume(value[0] / 100)
  }

  let VolumeIconData = VolumeHighIcon

  if (audioVolume === 0) {
    VolumeIconData = VolumeMute01Icon
  } else if (audioVolume < 0.5) {
    VolumeIconData = VolumeLowIcon
  }

  return (
    <div className="flex items-center mt-3 pl-4 pr-6 py-2 rounded-xl border bg-card shadow-sm">
      <span
        className="cursor-pointer flex items-center"
        onClick={handleIconClick}
      >
        <HugeiconsIcon
          icon={VolumeIconData}
          strokeWidth={1.8}
          className="size-4"
        />
        <TooltipProvider>
          {audioChannelName === AudioChannelName.MICROPHONE && (
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <HugeiconsIcon
                    icon={Mic01Icon}
                    strokeWidth={1.8}
                    className="size-4"
                  />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                {t('room.audio.peerMicrophoneVolume')}
              </TooltipContent>
            </Tooltip>
          )}
          {audioChannelName === AudioChannelName.SCREEN_SHARE && (
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <HugeiconsIcon
                    icon={ComputerPhoneSyncIcon}
                    strokeWidth={1.8}
                    className="size-4"
                  />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                {t('room.audio.peerScreenVolume')}
              </TooltipContent>
            </Tooltip>
          )}
        </TooltipProvider>
      </span>
      <div className="flex w-full ml-3">
        <Slider
          aria-label={t('room.audio.volume')}
          onValueChange={handleSliderChange}
          value={[audioVolume * 100]}
          max={100}
          step={1}
        />
      </div>
    </div>
  )
}
