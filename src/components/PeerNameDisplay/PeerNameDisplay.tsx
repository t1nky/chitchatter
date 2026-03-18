import { usePeerNameDisplay } from './usePeerNameDisplay'
import { getPeerName } from './getPeerName'

export interface PeerNameDisplayProps {
  children: string
  className?: string
  /** @deprecated MUI prop kept for backward compatibility — use className instead */
  sx?: object
  /** @deprecated MUI prop kept for backward compatibility */
  paragraph?: boolean
}

export const PeerNameDisplay = ({
  children: userId,
  className,
}: PeerNameDisplayProps) => {
  const { getCustomUsername, getFriendlyName } = usePeerNameDisplay()

  const friendlyName = getFriendlyName(userId)
  const customUsername = getCustomUsername(userId)

  if (customUsername === friendlyName) {
    return (
      <span className={className}>
        {friendlyName}
        <span className="text-xs"> ({getPeerName(userId)})</span>
      </span>
    )
  }

  return <span className={className}>{getPeerName(userId)}</span>
}
