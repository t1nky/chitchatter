import { Route, Routes } from 'react-router-dom'
import { ArrowRight01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useTranslation } from 'react-i18next'

import { routes } from 'config/routes'
import { Button } from 'components/ui/button'

import { ConnectionTestResults as IConnectionTestResults } from './useConnectionTest'
import { ConnectionTestResults } from './ConnectionTestResults'

interface PeerListWrapperProps {
  onPeerListClose: () => void
  connectionTestResults: IConnectionTestResults
}

export const PeerListHeader = ({
  onPeerListClose,
  connectionTestResults,
}: PeerListWrapperProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex h-14 shrink-0 items-center border-b px-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={onPeerListClose}
        aria-label={t('peerList.close')}
      >
        <HugeiconsIcon
          icon={ArrowRight01Icon}
          strokeWidth={1.8}
          className="size-4"
        />
      </Button>
      <div className="flex-1 px-4 py-2">
        <Routes>
          {/*
          These stub routes are needed to silence spurious warnings in the console.
          */}
          {[routes.ROOT, routes.SETTINGS].map(route => (
            <Route key={route} path={route} element={<></>} />
          ))}

          {[routes.PUBLIC_ROOM, routes.PRIVATE_ROOM].map(route => (
            <Route
              key={route}
              path={route}
              element={
                <ConnectionTestResults
                  connectionTestResults={connectionTestResults}
                />
              }
            />
          ))}
        </Routes>
      </div>
    </div>
  )
}
