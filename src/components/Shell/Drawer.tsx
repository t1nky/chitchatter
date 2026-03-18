import { PropsWithChildren, useContext } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Home01Icon,
  Setting06Icon,
  QuestionIcon,
  Alert02Icon,
  Moon02Icon,
  Sun03Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import GitInfo from 'react-git-info/macro'
import { useTranslation } from 'react-i18next'

import { routes } from 'config/routes'
import { SettingsContext } from 'contexts/SettingsContext'
import { ColorMode } from 'models/settings'
import { Button } from 'components/ui/button'
import { Separator } from 'components/ui/separator'

const { commit } = GitInfo()

export const drawerWidth = 240

export interface DrawerProps extends PropsWithChildren {
  isDrawerOpen: boolean
  onDrawerClose: () => void
}

export const Drawer = ({ isDrawerOpen, onDrawerClose }: DrawerProps) => {
  const { t } = useTranslation()
  const settingsContext = useContext(SettingsContext)
  const colorMode = settingsContext.getUserSettings().colorMode

  const handleColorModeToggleClick = () => {
    const newMode =
      colorMode === ColorMode.LIGHT ? ColorMode.DARK : ColorMode.LIGHT
    settingsContext.updateUserSettings({ colorMode: newMode })
  }

  return (
    <div
      className={`fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r bg-background transition-transform duration-200 ${
        isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex h-14 items-center justify-end px-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={onDrawerClose}
          aria-label={t('navigation.closeMenu')}
        >
          <HugeiconsIcon
            icon={
              document.documentElement.dir === 'rtl'
                ? ArrowRight01Icon
                : ArrowLeft01Icon
            }
            strokeWidth={1.8}
            className="size-4"
          />
        </Button>
      </div>
      <Separator />
      <nav aria-label={t('navigation.navigationMenu')}>
        <ul className="flex flex-col">
          <li>
            <Link
              to={routes.ROOT}
              className="flex items-center gap-3 px-4 py-2 hover:bg-muted"
            >
              <HugeiconsIcon
                icon={Home01Icon}
                strokeWidth={1.8}
                className="size-4"
              />
              <span>{t('navigation.home')}</span>
            </Link>
          </li>
          <li>
            <Link
              to={routes.SETTINGS}
              className="flex items-center gap-3 px-4 py-2 hover:bg-muted"
            >
              <HugeiconsIcon
                icon={Setting06Icon}
                strokeWidth={1.8}
                className="size-4"
              />
              <span>{t('navigation.settings')}</span>
            </Link>
          </li>
          <li>
            <Link
              to={routes.ABOUT}
              className="flex items-center gap-3 px-4 py-2 hover:bg-muted"
            >
              <HugeiconsIcon
                icon={QuestionIcon}
                strokeWidth={1.8}
                className="size-4"
              />
              <span>{t('navigation.about')}</span>
            </Link>
          </li>
          <li>
            <Link
              to={routes.DISCLAIMER}
              className="flex items-center gap-3 px-4 py-2 hover:bg-muted"
            >
              <HugeiconsIcon
                icon={Alert02Icon}
                strokeWidth={1.8}
                className="size-4"
              />
              <span>{t('navigation.disclaimer')}</span>
            </Link>
          </li>
          <li>
            <button
              onClick={handleColorModeToggleClick}
              className="flex w-full items-center gap-3 px-4 py-2 hover:bg-muted"
            >
              {colorMode === ColorMode.DARK ? (
                <HugeiconsIcon
                  icon={Sun03Icon}
                  strokeWidth={1.8}
                  className="size-4"
                />
              ) : (
                <HugeiconsIcon
                  icon={Moon02Icon}
                  strokeWidth={1.8}
                  className="size-4"
                />
              )}
              <span>{t('navigation.changeTheme')}</span>
            </button>
          </li>
        </ul>
        <Separator />
        <div className="p-4">
          <p className="text-sm font-medium">
            {t('navigation.buildSignature')}:{' '}
            <span className="font-mono">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`${import.meta.env.VITE_GITHUB_REPO}/commit/${commit.hash}`}
                className="text-primary underline underline-offset-4 hover:text-primary/80"
              >
                {commit.shortHash}
              </a>
            </span>
          </p>
        </div>
      </nav>
    </div>
  )
}
