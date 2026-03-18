import { ArrowDown01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ShellContext } from 'contexts/ShellContext'
import { isError } from 'lib/type-guards'
import { Peer } from 'models/chat'
import { Button } from 'components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'components/ui/tooltip'

import { usePeerNameDisplay } from 'components/PeerNameDisplay/usePeerNameDisplay'
import { RoomContext } from 'contexts/RoomContext'

interface PeerDownloadFileButtonProps {
  peer: Peer
}

export const PeerDownloadFileButton = ({
  peer,
}: PeerDownloadFileButtonProps) => {
  const { t } = useTranslation()
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null)
  const shellContext = useContext(ShellContext)
  const {
    fileTransferService: { fileTransfer },
  } = useContext(RoomContext)
  const { getDisplayUsername } = usePeerNameDisplay()
  const { offeredFileId } = peer

  const onProgress = (progress: number) => {
    setDownloadProgress(progress * 100)
  }

  if (!offeredFileId) {
    return <></>
  }

  const handleDownloadFileClick = async () => {
    setIsDownloading(true)
    setDownloadProgress(null)

    try {
      if (typeof shellContext.roomId !== 'string') {
        throw new Error('shellContext.roomId is not a string')
      }

      await fileTransfer.download(offeredFileId, shellContext.roomId, {
        doSave: true,
        onProgress,
      })
    } catch (e) {
      if (isError(e)) {
        shellContext.showAlert(e.message, {
          severity: 'error',
        })
      }
    }

    setIsDownloading(false)
    setDownloadProgress(null)
  }

  return (
    <div className="mr-4">
      {isDownloading ? (
        <div className="relative flex size-9 items-center justify-center">
          <svg className="size-9 -rotate-90" viewBox="0 0 36 36">
            <circle
              className="stroke-muted"
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              strokeWidth="3"
            />
            {downloadProgress !== null ? (
              <circle
                className="stroke-primary transition-none"
                cx="18"
                cy="18"
                r="15.5"
                fill="none"
                strokeWidth="3"
                strokeDasharray="97.4"
                strokeDashoffset={97.4 - (97.4 * downloadProgress) / 100}
                strokeLinecap="round"
              />
            ) : (
              <circle
                className="origin-center animate-spin stroke-primary"
                cx="18"
                cy="18"
                r="15.5"
                fill="none"
                strokeWidth="3"
                strokeDasharray="97.4"
                strokeDashoffset="73"
                strokeLinecap="round"
              />
            )}
          </svg>
        </div>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                className="size-9 rounded-full"
                onClick={handleDownloadFileClick}
              >
                <HugeiconsIcon
                  icon={ArrowDown01Icon}
                  strokeWidth={1.8}
                  className="size-4"
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {t('room.download.tooltip', {
                name: getDisplayUsername(peer.userId),
              })}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  )
}
