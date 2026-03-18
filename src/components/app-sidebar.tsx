import { useContext, useEffect } from 'react'
import {
  BubbleChatLockIcon,
  Home01Icon,
  Moon02Icon,
  QuestionIcon,
  Setting06Icon,
  Sun03Icon,
  Alert02Icon,
  Cancel01Icon,
  Github01Icon,
  BookOpen02Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import GitInfo from 'react-git-info/macro'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar'
import { routes } from '@/config/routes'
import { SettingsContext } from '@/contexts/SettingsContext'
import { ColorMode } from '@/models/settings'

const { commit } = GitInfo()

const githubRepoUrl =
  import.meta.env.VITE_GITHUB_REPO ??
  'https://github.com/jeremyckahn/chitchatter'

const primaryNavItems = [
  {
    icon: Home01Icon,
    labelKey: 'navigation.home',
    to: routes.ROOT,
  },
  {
    icon: Setting06Icon,
    labelKey: 'navigation.settings',
    to: routes.SETTINGS,
  },
  {
    icon: QuestionIcon,
    labelKey: 'navigation.about',
    to: routes.ABOUT,
  },
  {
    icon: Alert02Icon,
    labelKey: 'navigation.disclaimer',
    to: routes.DISCLAIMER,
  },
] as const

const secondaryNavItems = [
  {
    icon: Github01Icon,
    labelKey: 'home.sourceCode',
    href: githubRepoUrl,
  },
  {
    icon: BookOpen02Icon,
    labelKey: 'home.docs',
    href: `${githubRepoUrl}/blob/develop/README.md`,
  },
] as const

export const AppSidebar = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const { toggleSidebar, setOpenMobile } = useSidebar()
  const settingsContext = useContext(SettingsContext)
  const colorMode = settingsContext.getUserSettings().colorMode

  useEffect(() => {
    setOpenMobile(false)
  }, [location.pathname, setOpenMobile])

  const handleColorModeToggleClick = () => {
    const newMode =
      colorMode === ColorMode.LIGHT ? ColorMode.DARK : ColorMode.LIGHT

    settingsContext.updateUserSettings({ colorMode: newMode })
  }

  return (
    <Sidebar variant="inset" collapsible="offcanvas">
      <SidebarHeader className="h-14 flex-row items-center border-b">
        <SidebarMenu className="flex-1">
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link to={routes.ROOT}>
                <span className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <HugeiconsIcon icon={BubbleChatLockIcon} strokeWidth={1.8} />
                </span>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Chitchatter</span>
                  <span className="truncate text-xs text-sidebar-foreground/70">
                    Private chat dashboard
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="md:hidden"
          aria-label={t('navigation.closeMenu')}
          onClick={toggleSidebar}
        >
          <HugeiconsIcon icon={Cancel01Icon} strokeWidth={1.8} />
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {t('navigation.navigationMenu')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <nav aria-label={t('navigation.navigationMenu')}>
              <SidebarMenu>
                {primaryNavItems.map(item => (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.to}
                      tooltip={t(item.labelKey)}
                    >
                      <Link to={item.to}>
                        <HugeiconsIcon icon={item.icon} strokeWidth={1.8} />
                        <span>{t(item.labelKey)}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={handleColorModeToggleClick}
                    tooltip={t('navigation.changeTheme')}
                  >
                    <HugeiconsIcon
                      icon={
                        colorMode === ColorMode.DARK ? Sun03Icon : Moon02Icon
                      }
                      strokeWidth={1.8}
                    />
                    <span>{t('navigation.changeTheme')}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </nav>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>
            {t('home.additionalInfoAriaLabel')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryNavItems.map(item => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild tooltip={t(item.labelKey)}>
                    <a href={item.href} target="_blank" rel="noreferrer">
                      <HugeiconsIcon icon={item.icon} strokeWidth={1.8} />
                      <span>{t(item.labelKey)}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <a
                href={`${githubRepoUrl}/commit/${commit.hash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="flex size-8 items-center justify-center rounded-lg border border-sidebar-border bg-background">
                  <HugeiconsIcon icon={Github01Icon} strokeWidth={1.8} />
                </span>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {t('navigation.buildSignature')}
                  </span>
                  <span className="truncate font-mono text-xs text-sidebar-foreground/70">
                    {commit.shortHash}
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
