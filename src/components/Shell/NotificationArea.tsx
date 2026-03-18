import { useEffect, useRef } from 'react'

import { AlertSeverity } from 'models/shell'

import { cn } from '@/lib/utils'

interface NotificationAreaProps {
  alertSeverity: AlertSeverity
  alertText: string
  isAlertShowing: boolean
  onAlertClose: () => void
}

const severityStyles: Record<AlertSeverity, string> = {
  success: 'bg-green-600 text-white',
  error: 'bg-red-600 text-white',
  warning: 'bg-yellow-500 text-black',
  info: 'bg-blue-600 text-white',
}

export const NotificationArea = ({
  alertSeverity,
  alertText,
  isAlertShowing,
  onAlertClose,
}: NotificationAreaProps) => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    if (!isAlertShowing) return

    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(onAlertClose, 6000)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isAlertShowing, onAlertClose])

  if (!isAlertShowing) return null

  return (
    <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2">
      <div
        className={cn(
          'flex items-center gap-2 rounded-md px-4 py-2 text-sm shadow-lg',
          severityStyles[alertSeverity]
        )}
      >
        <span>{alertText}</span>
        <button
          onClick={onAlertClose}
          className="ml-2 opacity-70 hover:opacity-100"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
