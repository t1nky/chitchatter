import { useContext } from 'react'

import { BubbleChatIcon, BubbleChatLockIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useTranslation } from 'react-i18next'

import { RoomContext } from 'contexts/RoomContext'

import { Tooltip, TooltipTrigger, TooltipContent } from 'components/ui/tooltip'
import { Badge } from 'components/ui/badge'

import { MediaButton } from './MediaButton'

export function RoomShowMessagesControls() {
  const { t } = useTranslation()
  const { isShowingMessages, setIsShowingMessages, unreadMessages } =
    useContext(RoomContext)

  return (
    <div className="flex flex-col items-center justify-center px-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <MediaButton
            isActive={isShowingMessages}
            aria-label={t('room.controls.messagesControl')}
            onClick={() => setIsShowingMessages(!isShowingMessages)}
          >
            <span className="relative">
              {isShowingMessages ? (
                <HugeiconsIcon
                  icon={BubbleChatIcon}
                  strokeWidth={1.8}
                  className="size-4"
                />
              ) : (
                <HugeiconsIcon
                  icon={BubbleChatLockIcon}
                  strokeWidth={1.8}
                  className="size-4"
                />
              )}
              {unreadMessages > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 size-4 justify-center p-0 text-[10px]"
                >
                  {unreadMessages}
                </Badge>
              )}
            </span>
          </MediaButton>
        </TooltipTrigger>
        <TooltipContent>
          {isShowingMessages
            ? t('room.controls.hideMessages')
            : t('room.controls.showMessages')}
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
