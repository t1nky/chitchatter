import { useContext } from 'react'
import { Alert02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useTranslation } from 'react-i18next'

import { ShellContext } from 'contexts/ShellContext'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'components/ui/dialog'
import { Button } from 'components/ui/button'

export const ServerConnectionFailureDialog = () => {
  const { t } = useTranslation()
  const {
    isServerConnectionFailureDialogOpen,
    setIsServerConnectionFailureDialogOpen,
  } = useContext(ShellContext)

  const handleDialogClose = () => {
    setIsServerConnectionFailureDialogOpen(false)
  }

  return (
    <Dialog
      open={isServerConnectionFailureDialogOpen}
      onOpenChange={open => {
        if (!open) handleDialogClose()
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HugeiconsIcon
              icon={Alert02Icon}
              strokeWidth={1.8}
              className="size-4"
            />
            {t('dialogs.serverConnectionFailure.title')}
          </DialogTitle>
          <DialogDescription>
            {t('dialogs.serverConnectionFailure.description')}
          </DialogDescription>
        </DialogHeader>
        <ul className="ml-4 list-disc text-sm text-muted-foreground">
          <li>{t('dialogs.serverConnectionFailure.refresh')}</li>
          <li>{t('dialogs.serverConnectionFailure.disableAdblockers')}</li>
          <li>{t('dialogs.serverConnectionFailure.differentNetwork')}</li>
        </ul>
        <DialogFooter>
          <Button onClick={handleDialogClose}>
            {t('dialogs.serverConnectionFailure.close')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
