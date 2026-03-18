import { ArrowDown01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'

import { SiteHeader } from 'components/site-header'
import { Button } from 'components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/tooltip'
import { ShellContext } from 'contexts/ShellContext'

interface ShellAppBarProps {
  onLinkButtonClick: () => Promise<void>
  title: string
  onPeerListClick: () => void
  onRoomControlsClick: () => void
  setIsQRCodeDialogOpen: (isOpen: boolean) => void
  showAppBar: boolean
  isFullscreen: boolean
  setIsFullscreen: (isFullscreen: boolean) => void
}

export const ShellAppBar = ({
  onLinkButtonClick,
  setIsQRCodeDialogOpen,
  title,
  onPeerListClick,
  onRoomControlsClick,
  showAppBar,
  isFullscreen,
  setIsFullscreen,
}: ShellAppBarProps) => {
  const { t } = useTranslation()
  const { peerList, isEmbedded, showRoomControls, roomId } =
    useContext(ShellContext)

  const handleQRCodeClick = () => setIsQRCodeDialogOpen(true)
  const handleFullscreenToggle = () => setIsFullscreen(!isFullscreen)

  return (
    <>
      <div
        className={
          showAppBar
            ? 'translate-y-0 opacity-100 transition-all duration-200 ease-out'
            : 'pointer-events-none -translate-y-2 opacity-0 transition-all duration-150 ease-in'
        }
      >
        <SiteHeader
          isEmbedded={isEmbedded}
          isFullscreen={isFullscreen}
          peerCount={peerList.length + 1}
          roomId={roomId}
          showRoomControls={showRoomControls}
          title={title}
          onLinkButtonClick={onLinkButtonClick}
          onPeerListClick={onPeerListClick}
          onQRCodeClick={handleQRCodeClick}
          onRoomControlsClick={onRoomControlsClick}
          onToggleFullscreen={handleFullscreenToggle}
          t={t}
        />
      </div>

      <div
        className={
          showAppBar
            ? 'pointer-events-none opacity-0 transition-opacity duration-150'
            : 'pointer-events-auto opacity-100 transition-opacity duration-200'
        }
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              size="icon"
              className="fixed top-4 left-4 z-30 rounded-full shadow-lg"
              aria-label={t('shell.roomControlsAria')}
              onClick={onRoomControlsClick}
            >
              <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={1.8} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{t('shell.showRoomControls')}</TooltipContent>
        </Tooltip>
      </div>
    </>
  )
}
