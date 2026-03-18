import { Alert02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useTranslation } from 'react-i18next'
import { useRegisterSW } from 'virtual:pwa-register/react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'components/ui/dialog'
import { Button } from 'components/ui/button'

interface UpgradeDialogProps {
  appNeedsUpdate: boolean
}

export const UpgradeDialog = ({ appNeedsUpdate }: UpgradeDialogProps) => {
  const { t } = useTranslation()
  const { updateServiceWorker } = useRegisterSW()

  const handleRestartClick = () => {
    updateServiceWorker(true)
  }

  return (
    <Dialog open={appNeedsUpdate}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HugeiconsIcon
              icon={Alert02Icon}
              strokeWidth={1.8}
              className="size-4"
            />
            {t('dialogs.upgrade.title')}
          </DialogTitle>
          <DialogDescription>
            {t('dialogs.upgrade.description')}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleRestartClick} autoFocus>
            {t('dialogs.upgrade.refresh')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
