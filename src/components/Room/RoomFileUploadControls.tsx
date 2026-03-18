import { ChangeEventHandler, useContext, useRef } from 'react'
import { Folder01Icon, FolderRemoveIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useTranslation } from 'react-i18next'

import { RoomContext } from 'contexts/RoomContext'
import { PeerRoom } from 'lib/PeerRoom'

import { Tooltip, TooltipTrigger, TooltipContent } from 'components/ui/tooltip'

import { useRoomFileShare } from './useRoomFileShare'
import { MediaButton } from './MediaButton'

export interface RoomFileUploadControlsProps {
  onInlineMediaUpload: (files: File[]) => void
  peerRoom: PeerRoom
}

export function RoomFileUploadControls({
  peerRoom,
  onInlineMediaUpload,
}: RoomFileUploadControlsProps) {
  const { t } = useTranslation()
  const roomContext = useContext(RoomContext)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { isMessageSending } = roomContext

  const {
    isFileSharingEnabled,
    isSharingFile,
    handleFileShareStart,
    handleFileShareStop,
    sharedFiles,
  } = useRoomFileShare({
    peerRoom,
    onInlineMediaUpload,
  })

  const handleToggleScreenShareButtonClick = () => {
    const { current: fileInput } = fileInputRef

    if (isSharingFile) {
      handleFileShareStop()
    } else {
      if (!fileInput) return

      fileInput.click()
    }
  }

  const handleFileSelect: ChangeEventHandler<HTMLInputElement> = e => {
    const { files } = e.target

    if (!files || files.length < 1) return

    handleFileShareStart(files)
  }

  const shareFileLabel =
    (sharedFiles && sharedFiles.length === 1 && sharedFiles[0].name) ||
    t('room.controls.fileFallbackName')

  const disableFileUpload = !isFileSharingEnabled || isMessageSending

  const buttonIcon = isSharingFile ? (
    <HugeiconsIcon icon={Folder01Icon} strokeWidth={1.8} className="size-4" />
  ) : (
    <HugeiconsIcon
      icon={FolderRemoveIcon}
      strokeWidth={1.8}
      className="size-4"
    />
  )

  return (
    <div className="flex flex-col items-center justify-center px-2">
      <input
        multiple
        ref={fileInputRef}
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleFileSelect}
      />
      <Tooltip>
        <TooltipTrigger asChild>
          <MediaButton
            isActive={isSharingFile}
            aria-label={t('room.controls.shareFilesAria')}
            onClick={handleToggleScreenShareButtonClick}
            disabled={disableFileUpload}
          >
            {isFileSharingEnabled ? (
              buttonIcon
            ) : (
              <div className="size-5 animate-spin rounded-full border-2 border-muted border-t-foreground" />
            )}
          </MediaButton>
        </TooltipTrigger>
        <TooltipContent>
          {isSharingFile
            ? t('room.controls.stopSharingFile', { name: shareFileLabel })
            : t('room.controls.shareFiles')}
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
