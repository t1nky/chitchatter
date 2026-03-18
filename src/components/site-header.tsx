import {
  ComputerPhoneSyncIcon,
  CopyLinkIcon,
  FullScreenIcon,
  MoreHorizontalIcon,
  QrCodeIcon,
  UserMultipleIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

type SiteHeaderProps = {
  isEmbedded: boolean
  isFullscreen: boolean
  peerCount: number
  roomId?: string
  showRoomControls: boolean
  title: string
  onLinkButtonClick: () => Promise<void>
  onPeerListClick: () => void
  onQRCodeClick: () => void
  onRoomControlsClick: () => void
  onToggleFullscreen: () => void
  t: (key: string) => string
}

type HeaderActionProps = {
  ariaLabel: string
  icon: typeof CopyLinkIcon
  label: string
  onClick: () => void | Promise<void>
}

const HeaderAction = ({
  ariaLabel,
  icon,
  label,
  onClick,
}: HeaderActionProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={ariaLabel}
          onClick={onClick}
        >
          <HugeiconsIcon icon={icon} strokeWidth={1.8} className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

export const SiteHeader = ({
  isEmbedded,
  isFullscreen,
  peerCount,
  roomId,
  showRoomControls,
  title,
  onLinkButtonClick,
  onPeerListClick,
  onQRCodeClick,
  onRoomControlsClick,
  onToggleFullscreen,
  t,
}: SiteHeaderProps) => {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        {isEmbedded ? null : <SidebarTrigger className="-ml-1" />}
        {isEmbedded ? null : (
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4 data-[orientation=vertical]:self-center"
          />
        )}

        <Breadcrumb className="mr-auto min-w-0">
          <BreadcrumbList
            className={`flex-nowrap ${roomId ? 'text-xs md:text-sm' : ''}`}
          >
            {!isEmbedded && (
              <>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbPage>Chitchatter</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
              </>
            )}
            <BreadcrumbItem className="min-w-0">
              <BreadcrumbPage className="truncate">
                <span className="hidden md:inline">{title}</span>
                <span className="md:hidden">{roomId ?? title}</span>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {roomId && !isEmbedded && (
          <>
            {/* Desktop: individual buttons */}
            <div className="hidden items-center md:flex">
              <HeaderAction
                ariaLabel={t('shell.copyCurrentUrl')}
                icon={CopyLinkIcon}
                label={t('shell.copyCurrentUrl')}
                onClick={onLinkButtonClick}
              />
              <HeaderAction
                ariaLabel={t('shell.showQrCode')}
                icon={QrCodeIcon}
                label={t('shell.showQrCode')}
                onClick={onQRCodeClick}
              />
              <Separator
                orientation="vertical"
                className="mx-2 data-[orientation=vertical]:h-4 data-[orientation=vertical]:self-center"
              />
            </div>

            {/* Mobile: overflow menu for secondary actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="md:hidden"
                >
                  <HugeiconsIcon
                    icon={MoreHorizontalIcon}
                    strokeWidth={1.8}
                    className="size-4"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-48">
                <DropdownMenuItem onClick={onLinkButtonClick}>
                  <HugeiconsIcon
                    icon={CopyLinkIcon}
                    strokeWidth={1.8}
                    className="mr-2 size-4"
                  />
                  {t('shell.copyCurrentUrl')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onQRCodeClick}>
                  <HugeiconsIcon
                    icon={QrCodeIcon}
                    strokeWidth={1.8}
                    className="mr-2 size-4"
                  />
                  {t('shell.showQrCode')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onToggleFullscreen}>
                  <HugeiconsIcon
                    icon={FullScreenIcon}
                    strokeWidth={1.8}
                    className="mr-2 size-4"
                  />
                  {isFullscreen
                    ? t('shell.exitFullscreen')
                    : t('shell.enterFullscreen')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <HeaderAction
              ariaLabel={t('shell.roomControlsAria')}
              icon={ComputerPhoneSyncIcon}
              label={
                showRoomControls
                  ? t('shell.hideRoomControls')
                  : t('shell.showRoomControls')
              }
              onClick={onRoomControlsClick}
            />
            <div className="hidden md:block">
              <HeaderAction
                ariaLabel={t('shell.fullscreenAria')}
                icon={FullScreenIcon}
                label={
                  isFullscreen
                    ? t('shell.exitFullscreen')
                    : t('shell.enterFullscreen')
                }
                onClick={onToggleFullscreen}
              />
            </div>
          </>
        )}

        {roomId && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                aria-label={t('peerList.list')}
                onClick={onPeerListClick}
                className="ml-2 min-w-11 gap-2"
              >
                <HugeiconsIcon
                  icon={UserMultipleIcon}
                  strokeWidth={1.8}
                  className="size-4"
                />
                <span className="text-xs font-medium tabular-nums">
                  {peerCount}
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('peerList.show')}</TooltipContent>
          </Tooltip>
        )}
      </div>
    </header>
  )
}
