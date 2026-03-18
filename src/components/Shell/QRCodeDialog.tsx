import { QRCode } from 'react-qrcode-logo'
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

const QR_CODE_SIZE = 256
const QR_IMAGE_OPACITY = 0.3

export interface QRCodeDialogProps {
  isOpen: boolean
  handleClose: () => void
}

export function QRCodeDialog({ isOpen, handleClose }: QRCodeDialogProps) {
  const { t } = useTranslation()
  const url = window.location.href
  return (
    <Dialog
      open={isOpen}
      onOpenChange={open => {
        if (!open) handleClose()
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('dialogs.qrCode.title')}</DialogTitle>
          <DialogDescription className="sr-only">
            {t('dialogs.qrCode.title')}
          </DialogDescription>
        </DialogHeader>
        <QRCode
          value={url}
          size={QR_CODE_SIZE}
          logoImage={'/logo512.png'}
          logoWidth={QR_CODE_SIZE}
          logoHeight={QR_CODE_SIZE}
          logoOpacity={QR_IMAGE_OPACITY}
        />
        <DialogFooter>
          <Button onClick={handleClose} autoFocus>
            {t('dialogs.qrCode.dismiss')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
