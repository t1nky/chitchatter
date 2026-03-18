import { Copy01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useContext, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from 'components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/tooltip'
import { ShellContext } from 'contexts/ShellContext'

interface CopyableBlockProps {
  children: React.ReactNode
}

export const CopyableBlock = ({ children }: CopyableBlockProps) => {
  const { t } = useTranslation()
  const { showAlert } = useContext(ShellContext)
  const boxRef = useRef<HTMLDivElement>(null)

  const handleCopyClick = async () => {
    const div = boxRef?.current
    if (!div) return

    await navigator.clipboard.writeText(div.innerText)
    showAlert(t('copyable.copied'), { severity: 'success' })
  }

  return (
    <div ref={boxRef} className="group relative">
      {children}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="secondary"
            size="icon-sm"
            onClick={handleCopyClick}
            className="absolute top-3 right-3 opacity-0 transition-opacity group-hover:opacity-75"
          >
            <HugeiconsIcon
              icon={Copy01Icon}
              strokeWidth={2}
              className="size-4"
            />
            <span className="sr-only">{t('copyable.copy')}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>{t('copyable.copy')}</TooltipContent>
      </Tooltip>
    </div>
  )
}
