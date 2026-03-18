import { HTMLAttributes } from 'react'
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import YouTube from 'react-youtube'
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Markdown, { ExtraProps } from 'react-markdown'
import remarkGfm from 'remark-gfm'

import {
  InlineMedia as I_InlineMedia,
  Message as IMessage,
  isMessageReceived,
  isInlineMedia,
} from 'models/chat'
import { PeerNameDisplay } from 'components/PeerNameDisplay'
import { CopyableBlock } from 'components/CopyableBlock/CopyableBlock'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'components/ui/tooltip'

import { InlineMedia } from './InlineMedia'

import { cn } from '@/lib/utils'

export interface MessageProps {
  message: IMessage | I_InlineMedia
  showAuthor: boolean
  userId: string
}

const headingFactory =
  (Tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', className: string) =>
  (args: HTMLAttributes<HTMLElement>) => (
    <Tag {...args} className={cn(className, args.className)} />
  )

const componentMap = {
  h1: headingFactory('h1', 'text-4xl font-bold'),
  h2: headingFactory('h2', 'text-3xl font-bold'),
  h3: headingFactory('h3', 'text-2xl font-bold'),
  h4: headingFactory('h4', 'text-xl font-bold'),
  h5: headingFactory('h5', 'text-lg font-bold'),
  h6: headingFactory('h6', 'text-base font-bold'),
  p: (args: HTMLAttributes<HTMLElement>) => (
    <p {...args} className={cn('text-base', args.className)} />
  ),
  a: ({ children, ...args }: HTMLAttributes<HTMLElement>) => (
    <a
      {...args}
      className={cn('text-base underline text-inherit', args.className)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  // https://github.com/remarkjs/react-markdown#use-custom-components-syntax-highlight
  code({
    node,
    className,
    children,
    style,
    ...props
  }: HTMLAttributes<HTMLElement> & ExtraProps) {
    const match = /language-(\w+)/.exec(className || '')

    return match ? (
      <CopyableBlock>
        <SyntaxHighlighter
          children={String(children).replace(/\n$/, '')}
          language={match[1]}
          style={materialDark}
          PreTag="div"
          {...props}
        />
      </CopyableBlock>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    )
  },
}

const spaceNeededForSideDateTooltip = 850

const getYouTubeVideoId = (videoUrl: string) => {
  const trimmedMessage = videoUrl.trim()

  const matchArray =
    trimmedMessage.match(/https:\/\/www.youtube.com\/watch\?v=(\S{8,})$/) ||
    trimmedMessage.match(/https:\/\/youtu.be\/(\S{8,})$/)

  return matchArray?.pop()
}

const isYouTubeLink = (message: IMessage) => {
  return typeof getYouTubeVideoId(message.text) === 'string'
}

export const Message = ({ message, showAuthor, userId }: MessageProps) => {
  const isOwn = message.authorId === userId

  let bgClass: string
  if (isOwn) {
    bgClass = isMessageReceived(message)
      ? 'bg-primary text-primary-foreground'
      : 'bg-primary/70 text-primary-foreground'
  } else {
    bgClass = 'bg-secondary text-secondary-foreground'
  }

  return (
    <div className="Message">
      {showAuthor && (
        <span
          className={cn('text-xs block', isOwn ? 'text-right' : 'text-left')}
        >
          <PeerNameDisplay>{message.authorId}</PeerNameDisplay>
        </span>
      )}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={cn(
                bgClass,
                'm-1 px-3 py-2 rounded-2xl max-w-[85%] transition-colors duration-1000 break-words',
                isOwn ? 'float-right' : 'float-left'
              )}
            >
              {isInlineMedia(message) ? (
                <InlineMedia magnetURI={message.magnetURI} />
              ) : isYouTubeLink(message) ? (
                <YouTube videoId={getYouTubeVideoId(message.text)} />
              ) : (
                <Markdown
                  components={componentMap}
                  remarkPlugins={[remarkGfm]}
                  className="[&_pre]:overflow-auto [&_ol]:pl-4 [&_ol]:list-decimal [&_ul]:pl-4 [&_ul]:list-disc"
                >
                  {message.text}
                </Markdown>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent
            side={
              window.innerWidth >= spaceNeededForSideDateTooltip
                ? 'left'
                : 'top'
            }
          >
            {String(
              Intl.DateTimeFormat(undefined, {
                dateStyle: 'short',
                timeStyle: 'short',
              }).format(message.timeSent)
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
