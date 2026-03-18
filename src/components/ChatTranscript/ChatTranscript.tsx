import { useRef, useEffect, useState, useContext } from 'react'

import { Message as IMessage, InlineMedia } from 'models/chat'
import { Message } from 'components/Message'
import { ShellContext } from 'contexts/ShellContext'

import { cn } from '@/lib/utils'

export interface ChatTranscriptProps {
  messageLog: Array<IMessage | InlineMedia>
  userId: string
  className?: string
}

export const ChatTranscript = ({
  messageLog,
  userId,
  className,
}: ChatTranscriptProps) => {
  const { showRoomControls } = useContext(ShellContext)
  const boxRef = useRef<HTMLDivElement>(null)
  const [previousMessageLogLength, setPreviousMessageLogLength] = useState(0)

  useEffect(() => {
    const { current: boxEl } = boxRef
    if (!boxEl) return

    const { scrollHeight, clientHeight, scrollTop, children } = boxEl
    const scrollTopMax = scrollHeight - clientHeight

    if (children.length === 0) return

    const lastChild = children[children.length - 1]
    const lastChildHeight = lastChild.clientHeight
    const previousScrollTopMax = scrollTopMax - lastChildHeight

    // Accounts for rounding errors in layout calculations
    const marginBuffer = 1

    const wasPreviouslyScrolledToBottom =
      Math.ceil(scrollTop) >= Math.ceil(previousScrollTopMax) - marginBuffer
    const wasMessageLogPreviouslyEmpty = previousMessageLogLength === 0
    const shouldScrollToLatestMessage =
      wasPreviouslyScrolledToBottom || wasMessageLogPreviouslyEmpty

    if (
      shouldScrollToLatestMessage &&
      // scrollTo is not defined in the unit test environment
      'scrollTo' in boxEl
    ) {
      boxEl.scrollTo({ top: scrollTopMax })
    }
  }, [messageLog, previousMessageLogLength])

  useEffect(() => {
    setPreviousMessageLogLength(messageLog.length)
  }, [messageLog.length])

  return (
    <div
      ref={boxRef}
      className={cn(
        'ChatTranscript flex flex-col grow overflow-auto pb-2 px-2 w-full transition-[padding-top] duration-200 ease-in-out max-w-screen-md mx-auto',
        showRoomControls ? 'pt-20' : 'pt-4',
        className
      )}
    >
      {messageLog.map((message, idx) => {
        const previousMessage = messageLog[idx - 1]
        const isFirstMessageInGroup =
          previousMessage?.authorId !== message.authorId

        return (
          // This wrapper div is necessary for accurate layout calculations
          // when new messages cause the transcript to scroll to the bottom.
          <div key={message.id}>
            <Message
              message={message}
              userId={userId}
              showAuthor={isFirstMessageInGroup}
            />
          </div>
        )
      })}
    </div>
  )
}
