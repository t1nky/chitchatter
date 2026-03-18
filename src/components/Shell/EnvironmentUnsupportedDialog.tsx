import { Alert02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useTranslation } from 'react-i18next'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from 'components/ui/dialog'

const { isSecureContext, RTCDataChannel } = window
const doesSupportWebRtc = RTCDataChannel !== undefined

export const isEnvironmentSupported =
  (isSecureContext && doesSupportWebRtc) || import.meta.env.MODE === 'test'

export const EnvironmentUnsupportedDialog = () => {
  const { t } = useTranslation()

  return (
    <Dialog open={!isEnvironmentSupported}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HugeiconsIcon
              icon={Alert02Icon}
              strokeWidth={1.8}
              className="size-4"
            />
            {t('dialogs.environmentUnsupported.title')}
          </DialogTitle>
          <DialogDescription>
            {t('dialogs.environmentUnsupported.description')}
          </DialogDescription>
        </DialogHeader>
        <ul className="ml-4 list-disc text-sm text-muted-foreground">
          {!isSecureContext ? (
            <li>
              {t('dialogs.environmentUnsupported.secureContextPrefix')}{' '}
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts"
                rel="noreferrer"
                target="_blank"
                className="underline underline-offset-2 hover:text-foreground"
              >
                {t('dialogs.environmentUnsupported.secureContextLink')}
              </a>
              .
            </li>
          ) : null}
          {!doesSupportWebRtc ? (
            <li>
              {t('dialogs.environmentUnsupported.browserSupportPrefix')}{' '}
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection#browser_compatibility"
                rel="noreferrer"
                target="_blank"
                className="underline underline-offset-2 hover:text-foreground"
              >
                {t('dialogs.environmentUnsupported.browserSupportLink')}
              </a>
              .
            </li>
          ) : null}
        </ul>
      </DialogContent>
    </Dialog>
  )
}
