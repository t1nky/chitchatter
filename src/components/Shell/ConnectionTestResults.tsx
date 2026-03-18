import { CheckmarkCircle02Icon, Alert02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'

import { SettingsContext } from 'contexts/SettingsContext'
import { ShellContext } from 'contexts/ShellContext'
import { TrackerConnection } from 'lib/ConnectionTest'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'components/ui/tooltip'

import { ConnectionTestResults as IConnectionTestResults } from './useConnectionTest'

interface ConnectionTestResultsProps {
  connectionTestResults: IConnectionTestResults
}
export const ConnectionTestResults = ({
  connectionTestResults: { hasHost, hasTURNServer, trackerConnection },
}: ConnectionTestResultsProps) => {
  const { t } = useTranslation()
  const { setIsServerConnectionFailureDialogOpen } = useContext(ShellContext)
  const { getUserSettings } = useContext(SettingsContext)
  const { isEnhancedConnectivityEnabled } = getUserSettings()

  const handleServerConnectionFailedMessageClick = () => {
    setIsServerConnectionFailureDialogOpen(true)
  }

  if (trackerConnection === TrackerConnection.FAILED) {
    return (
      <p
        className="cursor-pointer text-sm font-medium"
        onClick={handleServerConnectionFailedMessageClick}
      >
        <span className="flex items-center">
          <HugeiconsIcon
            icon={Alert02Icon}
            strokeWidth={1.8}
            className="size-4"
          />
          <span>{t('connectionStatus.serverConnectionFailed')}</span>
        </span>
      </p>
    )
  }

  if (trackerConnection !== TrackerConnection.CONNECTED) {
    return (
      <p className="text-sm font-medium">
        <span className="flex items-center">
          <div className="mr-3 size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <span>{t('connectionStatus.searching')}</span>
        </span>
      </p>
    )
  }

  // NOTE: hasTURNServer will be true when the user has disabled TURN server
  // connectivity but the STUN server is in use. This results in a misleading
  // false positive of full network connectivity, so
  // isEnhancedConnectivityEnabled is used as an additional condition.
  const hasFullConnectivity =
    hasHost && hasTURNServer && isEnhancedConnectivityEnabled

  if (hasFullConnectivity) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="flex items-center gap-1 text-sm font-medium">
              <span className="text-green-500">
                <HugeiconsIcon
                  icon={CheckmarkCircle02Icon}
                  strokeWidth={1.8}
                  className="size-4"
                />
              </span>
              {t('connectionStatus.full')}
            </p>
          </TooltipTrigger>
          <TooltipContent>{t('connectionStatus.fullTooltip')}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  } else if (hasHost) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="flex items-center gap-1 text-sm font-medium">
              <span className="text-yellow-500">
                <HugeiconsIcon
                  icon={CheckmarkCircle02Icon}
                  strokeWidth={1.8}
                  className="size-4"
                />
              </span>
              {t('connectionStatus.partial')}
            </p>
          </TooltipTrigger>
          <TooltipContent>
            {t('connectionStatus.partialTooltip')}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  } else {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="flex items-center gap-1 text-sm font-medium">
              <span className="text-red-500">
                <HugeiconsIcon
                  icon={CheckmarkCircle02Icon}
                  strokeWidth={1.8}
                  className="size-4"
                />
              </span>
              {t('connectionStatus.none')}
            </p>
          </TooltipTrigger>
          <TooltipContent>{t('connectionStatus.noneTooltip')}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
}
