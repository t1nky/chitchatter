import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
  ChatLockIcon,
  CopyLinkIcon,
  GithubIcon,
  GlobeIcon,
  ArrowReloadHorizontalIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import { UserInfo } from 'components/UserInfo'
import { Button } from 'components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'components/ui/card'
import { Input } from 'components/ui/input'
import { Label } from 'components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select'
import { Separator } from 'components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/tooltip'
import { routes } from 'config/routes'
import Logo from 'img/logo.svg?react'
import { RoomNameType } from 'lib/RoomNameGenerator'

import { CommunityRoomSelector } from './CommunityRoomSelector'
import { EmbedCodeDialog } from './EmbedCodeDialog'
import { useHome } from './useHome'

export interface HomeProps {
  userId: string
}

const iconClass = 'size-4 shrink-0'
const githubRepoUrl =
  import.meta.env.VITE_GITHUB_REPO ??
  'https://github.com/jeremyckahn/chitchatter'

export const Home = ({ userId }: HomeProps) => {
  const { t } = useTranslation()
  const {
    roomName,
    roomNameType,
    showEmbedCode,
    handleRoomNameChange,
    handleRoomNameTypeChange,
    handleFormSubmit,
    handleJoinPublicRoomClick,
    handleJoinPrivateRoomClick,
    handleGetEmbedCodeClick,
    handleEmbedCodeWindowClose,
    isRoomNameValid,
    regenerateRoomName,
  } = useHome()

  const handleRoomNameTypeSelect = (newType: string) => {
    handleRoomNameTypeChange(
      {} as React.MouseEvent<HTMLElement>,
      newType as RoomNameType
    )
  }

  return (
    <>
      <EmbedCodeDialog
        showEmbedCode={showEmbedCode}
        handleEmbedCodeWindowClose={handleEmbedCodeWindowClose}
        roomName={roomName}
      />

      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-6 md:px-6 lg:max-w-3xl">
        {/* Hero */}
        <header className="flex flex-col items-center gap-2 text-center">
          <Link
            to={routes.ABOUT}
            aria-label={t('home.aboutPageAriaLabel')}
            className="mb-1 inline-flex"
          >
            <Logo className="h-10 w-auto" aria-label={t('appName')} />
          </Link>
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {t('home.title')}
          </h1>
          <div className="p-2 border-1 rounded-lg w-full bg-accent flex flex-col gap-1 font-mono text-accent-foreground">
            <p className="whitespace-pre-line text-left text-sm">
              {t('home.subtitle')}
            </p>
            <p className="whitespace-pre-line text-left text-sm">
              {t('home.subTitleSecond')}
            </p>
          </div>
        </header>

        {/* Username */}
        <Card>
          <CardHeader>
            <CardTitle>{t('userInfo.yourUsername')}</CardTitle>
          </CardHeader>
          <CardContent>
            <UserInfo userId={userId} showLabel={false} />
          </CardContent>
        </Card>

        {/* Room Creation */}
        <Card>
          <CardHeader>
            <div className="min-w-0 space-y-0.5">
              <CardTitle>{t('home.roomNameLabel')}</CardTitle>
              <CardDescription>{t('home.roomNameHelp')}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <div className="grid gap-3 lg:grid-cols-2">
                <div className="flex min-w-0 flex-col gap-1.5">
                  <div className="flex items-center gap-1">
                    <Label
                      htmlFor="room-name-input"
                      className="whitespace-nowrap"
                    >
                      {t('home.roomNameLabel')}
                    </Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          onClick={regenerateRoomName}
                          aria-label={t('home.regenerateRoomId')}
                        >
                          <HugeiconsIcon
                            icon={ArrowReloadHorizontalIcon}
                            strokeWidth={2}
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {t('home.regenerateRoomId')}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    id="room-name-input"
                    value={roomName}
                    onChange={handleRoomNameChange}
                    aria-label={t('home.roomNameLabel')}
                    className="mt-auto"
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-1.5">
                  <Label
                    htmlFor="home-room-type-select"
                    className="whitespace-nowrap"
                  >
                    {t('home.roomNameType')}
                  </Label>
                  <div className="mt-auto">
                    <Select
                      value={roomNameType}
                      onValueChange={handleRoomNameTypeSelect}
                    >
                      <SelectTrigger
                        id="home-room-type-select"
                        className="w-full"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={RoomNameType.PASSPHRASE}>
                          {t('home.readableWords')}
                        </SelectItem>
                        <SelectItem value={RoomNameType.UUID}>
                          {t('home.technicalId')}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid gap-2.5 sm:grid-cols-2">
                <Button
                  type="button"
                  onClick={handleJoinPrivateRoomClick}
                  disabled={!isRoomNameValid}
                >
                  <HugeiconsIcon
                    icon={ChatLockIcon}
                    strokeWidth={1.8}
                    className={iconClass}
                  />
                  {t('home.startPrivateRoom')}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleJoinPublicRoomClick}
                  disabled={!isRoomNameValid}
                >
                  <HugeiconsIcon
                    icon={GlobeIcon}
                    strokeWidth={1.8}
                    className={iconClass}
                  />
                  {t('home.openPublicRoom')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Secondary actions */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Card size="sm">
            <CardHeader>
              <CardTitle>{t('home.communityRooms')}</CardTitle>
            </CardHeader>
            <CardContent>
              <CommunityRoomSelector />
            </CardContent>
          </Card>

          <Card size="sm" className="justify-between">
            <CardHeader>
              <CardTitle>{t('home.embedCode')}</CardTitle>
              <CardDescription>
                {t('dialogs.embedCode.advancedIntroSuffix')}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={handleGetEmbedCodeClick}
                disabled={!isRoomNameValid}
              >
                <HugeiconsIcon
                  icon={CopyLinkIcon}
                  strokeWidth={1.8}
                  className={iconClass}
                />
                {t('home.embedCode')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                asChild
              >
                <a href={githubRepoUrl} target="_blank" rel="noreferrer">
                  <HugeiconsIcon
                    icon={GithubIcon}
                    strokeWidth={1.8}
                    className={iconClass}
                  />
                  {t('home.sourceCode')}
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Privacy footer */}
        <p className="text-center text-xs leading-relaxed text-muted-foreground">
          <span className="whitespace-pre-line">
            {t('home.privacySummary')}
          </span>
        </p>
      </div>
    </>
  )
}
