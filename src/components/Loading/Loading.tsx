import { useTranslation } from 'react-i18next'

interface WholePageLoadingProps {
  className?: string
}

export const WholePageLoading = ({ className = '' }: WholePageLoadingProps) => {
  const { t } = useTranslation()

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center ${className}`}
    >
      <div
        className="size-8 animate-spin rounded-full border-2 border-muted border-t-foreground"
        role="progressbar"
        aria-label={t('loading')}
      />
    </div>
  )
}
