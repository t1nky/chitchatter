import { useEffect, useRef } from 'react'

import { PeerNameDisplay } from 'components/PeerNameDisplay'
import { Tooltip, TooltipTrigger, TooltipContent } from 'components/ui/tooltip'
import { StreamType } from 'models/chat'

import { SelectedPeerStream } from './RoomVideoDisplay'

interface PeerVideoProps {
  isSelfScreenStream?: boolean
  isSelfVideo?: boolean
  numberOfVideos: number
  onVideoClick?: (
    userId: string,
    streamType: StreamType,
    videoStream: MediaStream
  ) => void
  selectedPeerStream: SelectedPeerStream | null
  userId: string
  videoStream: MediaStream
  streamType: StreamType
}

// Adapted from https://www.geeksforgeeks.org/find-the-next-perfect-square-greater-than-a-given-number/
const nextPerfectSquare = (base: number) => {
  const nextInteger = Math.floor(Math.sqrt(base)) + 1

  return nextInteger * nextInteger
}

export const PeerVideo = ({
  isSelfScreenStream,
  isSelfVideo,
  numberOfVideos,
  onVideoClick,
  userId,
  selectedPeerStream,
  videoStream,
  streamType,
}: PeerVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const { current: video } = videoRef
    if (!video) return

    video.autoplay = true
    video.srcObject = videoStream
    video.muted = true
  }, [videoRef, videoStream])

  const cols = Math.sqrt(nextPerfectSquare(numberOfVideos - 1))
  const rows = Math.ceil(numberOfVideos / cols)

  const handleVideoClick = () => {
    onVideoClick?.(userId, streamType, videoStream)
  }

  const sizeStyle = selectedPeerStream
    ? {
        height: 'calc(100% - 5px)',
        width: 'calc(100% - 5px)',
      }
    : {
        width: `calc(${100 / cols}% - 5px)`,
        height: `calc(${100 / rows}% - 5px)`,
      }

  return (
    <div
      className="flex shrink flex-col justify-center overflow-auto rounded-lg border bg-card shadow-lg"
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '5px',
        paddingRight: '5px',
        padding: '0px',
        ...sizeStyle,
      }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <video
            playsInline
            muted={isSelfScreenStream}
            ref={videoRef}
            onClick={handleVideoClick}
            style={{
              borderRadius: '.25em',
              cursor: 'pointer',
              overflow: 'auto',
              marginLeft: 'auto',
              marginRight: 'auto',
              height: '100%',
              width: '100%',
              ...(isSelfVideo && {
                transform: 'rotateY(180deg)',
              }),
            }}
          />
        </TooltipTrigger>
        <TooltipContent side="top" className="absolute top-[25px]">
          <PeerNameDisplay>{userId}</PeerNameDisplay>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
