import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { ShellContext } from 'contexts/ShellContext'
import { usePeerNameDisplay } from 'components/PeerNameDisplay'

export const TypingStatusBar = ({
  isDirectMessageRoom,
}: {
  isDirectMessageRoom: boolean
}) => {
  const { t } = useTranslation()
  const { peerList } = useContext(ShellContext)
  const { getDisplayUsername } = usePeerNameDisplay()
  const typingPeers = peerList.filter(
    ({ isTypingGroupMessage, isTypingDirectMessage }) =>
      isDirectMessageRoom ? isTypingDirectMessage : isTypingGroupMessage
  )

  let statusMessage = <></>

  if (typingPeers.length === 1) {
    statusMessage = (
      <>
        {t('room.typing.one', {
          name: getDisplayUsername(typingPeers[0].userId),
        })}
      </>
    )
  } else if (typingPeers.length === 2) {
    statusMessage = (
      <>
        {t('room.typing.two', {
          first: getDisplayUsername(typingPeers[0].userId),
          second: getDisplayUsername(typingPeers[1].userId),
        })}
      </>
    )
  } else if (typingPeers.length > 2) {
    statusMessage = <>{t('room.typing.many')}</>
  }

  return (
    <div>
      <span className="block h-7 max-h-7 overflow-hidden text-ellipsis whitespace-nowrap px-4 py-1 text-xs font-bold text-muted-foreground">
        {statusMessage}
      </span>
    </div>
  )
}
