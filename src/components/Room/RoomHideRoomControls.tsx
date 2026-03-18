import { useContext } from 'react'

import { ArrowUp01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useTranslation } from 'react-i18next'

import { ShellContext } from 'contexts/ShellContext'

import { Button } from 'components/ui/button'
import { Tooltip, TooltipTrigger, TooltipContent } from 'components/ui/tooltip'

export function RoomHideRoomControls() {
  const { t } = useTranslation()
  const { setShowRoomControls } = useContext(ShellContext)

  return (
    <div className="flex flex-col items-center justify-center px-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="default"
            size="icon"
            className="rounded-full"
            aria-label={t('room.controls.hideControlsAria')}
            onClick={() => setShowRoomControls(false)}
          >
            <HugeiconsIcon
              icon={ArrowUp01Icon}
              strokeWidth={1.8}
              className="size-4"
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{t('room.controls.hideControls')}</TooltipContent>
      </Tooltip>
    </div>
  )
}
