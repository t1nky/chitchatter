import { Alert02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useTranslation } from 'react-i18next'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'components/ui/dialog'
import { Button } from 'components/ui/button'

interface ConfirmDialogProps {
  isOpen: boolean
  onCancel: () => void
  onConfirm: () => void
}

export const ConfirmDialog = ({
  isOpen,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) => {
  const { t } = useTranslation()

  return (
    <Dialog
      open={isOpen}
      onOpenChange={open => {
        if (!open) onCancel()
      }}
    >
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HugeiconsIcon
              icon={Alert02Icon}
              strokeWidth={1.8}
              className="size-4"
            />
            {t('dialogs.confirm.title')}
          </DialogTitle>
          <DialogDescription>
            {t('dialogs.confirm.description')}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel} autoFocus>
            {t('dialogs.confirm.cancel')}
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            {t('dialogs.confirm.confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
