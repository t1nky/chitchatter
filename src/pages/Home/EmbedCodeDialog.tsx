import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useTranslation } from 'react-i18next'

import { CopyableBlock } from 'components/CopyableBlock/CopyableBlock'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'components/ui/dialog'
import { Separator } from 'components/ui/separator'
import { iframeFeatureAllowList } from 'config/iframeFeatureAllowList'
import { homepageUrl } from 'config/routes'
import { ChatEmbedAttributes } from 'models/sdk'

interface EmbedCodeDialogProps {
  showEmbedCode: boolean
  handleEmbedCodeWindowClose: () => void
  roomName: string
}

const basePackageHomepage =
  import.meta.env.VITE_HOMEPAGE ?? window.location.origin
const packageHomepage = basePackageHomepage.endsWith('/')
  ? basePackageHomepage
  : `${basePackageHomepage}/`

export const EmbedCodeDialog = ({
  showEmbedCode,
  handleEmbedCodeWindowClose,
  roomName,
}: EmbedCodeDialogProps) => {
  const { t } = useTranslation()
  const iframeSrc = new URL(`${packageHomepage}public/${roomName}`)
  iframeSrc.search = new URLSearchParams({ embed: '1' }).toString()

  const needsRootUrlAttribute =
    new URL(packageHomepage).origin !== homepageUrl.origin

  const chatRoomAttributes = {
    width: '800',
    height: '800',
    [ChatEmbedAttributes.ROOM_NAME]: roomName,
    ...(needsRootUrlAttribute && {
      [ChatEmbedAttributes.ROOT_URL]: packageHomepage,
    }),
  }

  const attributesString = Object.entries(chatRoomAttributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ')

  const sdkEmbedCode = `<script src="${packageHomepage}sdk.js"></script>

<chat-room ${attributesString} />`

  const syntaxProps = {
    language: 'html' as const,
    style: materialDark,
    PreTag: 'div' as const,
    lineProps: {
      style: {
        wordBreak: 'break-all' as const,
        whiteSpace: 'pre-wrap' as const,
      },
    },
    wrapLines: true,
  }

  return (
    <Dialog
      open={showEmbedCode}
      onOpenChange={open => {
        if (!open) handleEmbedCodeWindowClose()
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('dialogs.embedCode.title')}</DialogTitle>
          <DialogDescription>
            {t('dialogs.embedCode.iframeIntro')}
          </DialogDescription>
        </DialogHeader>

        <CopyableBlock>
          <SyntaxHighlighter {...syntaxProps}>
            {`<iframe src="${iframeSrc}" allow="${iframeFeatureAllowList.join(';')}" width="800" height="800" />`}
          </SyntaxHighlighter>
        </CopyableBlock>

        <Separator />

        <div className="space-y-2">
          <h3 className="text-sm font-medium">
            {t('dialogs.embedCode.advancedTitle')}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t('dialogs.embedCode.advancedIntroPrefix')}{' '}
            <a
              href="https://github.com/jeremyckahn/chitchatter#SDK"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 hover:text-foreground"
            >
              {t('dialogs.embedCode.sdkLink')}
            </a>{' '}
            {t('dialogs.embedCode.advancedIntroMiddle')}{' '}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/Web_components"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 hover:text-foreground"
            >
              {t('dialogs.embedCode.webComponentLink')}
            </a>{' '}
            {t('dialogs.embedCode.advancedIntroSuffix')}
          </p>
        </div>

        <CopyableBlock>
          <SyntaxHighlighter {...syntaxProps}>{sdkEmbedCode}</SyntaxHighlighter>
        </CopyableBlock>

        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  )
}
