import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

import { Switch } from 'components/ui/switch'

import { cn } from '@/lib/utils'

interface EnhancedConnectivityControlProps {
  isEnabled: boolean
  onChange: (event: ChangeEvent, newValue: boolean) => void
  variant?: 'body2' | 'subtitle2'
  className?: string
}

export const EnhancedConnectivityControl = ({
  isEnabled,
  onChange,
  variant = 'body2',
  className,
}: EnhancedConnectivityControlProps) => {
  const { t } = useTranslation()

  return (
    <div
      className={cn('rounded-xl border bg-card p-4 mb-4 shadow-sm', className)}
    >
      <div className="space-y-3">
        <label className="flex items-center gap-2">
          <Switch
            checked={isEnabled}
            onCheckedChange={(checked: boolean) =>
              onChange({} as ChangeEvent, checked)
            }
          />
          <span>{t('enhancedConnectivity.label')}</span>
        </label>
      </div>
      <p
        className={cn(
          'mt-2',
          variant === 'subtitle2'
            ? 'text-sm font-medium text-muted-foreground'
            : 'text-sm text-muted-foreground'
        )}
      >
        {t('enhancedConnectivity.help')}
      </p>
    </div>
  )
}
