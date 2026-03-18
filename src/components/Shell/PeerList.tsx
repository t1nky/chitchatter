import { PropsWithChildren } from 'react'
import { VolumeHighIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useTranslation } from 'react-i18next'

import { UserInfo } from 'components/UserInfo'
import {
  AudioState,
  Peer,
  AudioChannel,
  AudioChannelName,
  PeerAudioChannelState,
} from 'models/chat'
import { PeerConnectionType } from 'lib/PeerRoom'
import { TrackerConnection } from 'lib/ConnectionTest'

import { PeerListHeader } from './PeerListHeader'
import { PeerListItem } from './PeerListItem'
import { ConnectionTestResults as IConnectionTestResults } from './useConnectionTest'

export const peerListWidth = 300

export interface PeerListProps extends PropsWithChildren {
  userId: string
  roomId: string | undefined
  onPeerListClose: () => void
  peerList: Peer[]
  peerConnectionTypes: Record<string, PeerConnectionType>
  peerAudioChannelState: PeerAudioChannelState
  peerAudioChannels: Record<string, AudioChannel>
  connectionTestResults: IConnectionTestResults
}

export const PeerList = ({
  userId,
  roomId,
  onPeerListClose,
  peerList,
  peerConnectionTypes,
  peerAudioChannelState,
  peerAudioChannels,
  connectionTestResults,
}: PeerListProps) => {
  const { t } = useTranslation()

  return (
    <>
      <PeerListHeader
        onPeerListClose={onPeerListClose}
        connectionTestResults={connectionTestResults}
      />
      <ul>
        <li className="flex items-center border-b px-4 py-2">
          {peerAudioChannelState[AudioChannelName.MICROPHONE] ===
            AudioState.PLAYING && (
            <span className="mr-3 flex shrink-0 items-center">
              <HugeiconsIcon
                icon={VolumeHighIcon}
                strokeWidth={1.8}
                className="size-4"
              />
            </span>
          )}
          <span className="min-w-0 flex-1">
            <UserInfo userId={userId} />
          </span>
        </li>
        {peerList.map((peer: Peer) => (
          <PeerListItem
            key={peer.peerId}
            peer={peer}
            peerConnectionTypes={peerConnectionTypes}
            peerAudioChannels={peerAudioChannels}
            roomId={roomId ?? ''}
          />
        ))}
        {peerList.length === 0 &&
        typeof roomId === 'string' &&
        connectionTestResults.trackerConnection ===
          TrackerConnection.CONNECTED &&
        connectionTestResults.hasHost ? (
          <div className="m-4 flex items-center">
            <div className="mr-3 size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span>{t('peerList.searching')}</span>
          </div>
        ) : null}
      </ul>
    </>
  )
}
