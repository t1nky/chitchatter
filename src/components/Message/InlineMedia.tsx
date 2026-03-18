import { useContext, useEffect, useRef, useState } from 'react'
import { TorrentFile } from 'webtorrent'

import { RoomContext } from 'contexts/RoomContext'
import { ShellContext } from 'contexts/ShellContext'

type TorrentFiles = TorrentFile[]

interface InlineMediaProps {
  magnetURI: string
}

interface InlineFileProps {
  file: TorrentFile
}

// NOTE: These filename extensions are copied from render-media, the upstream
// library used to embed media files:
// https://github.com/feross/render-media/blob/a445b2ab90fcd4a248552d32027b2bc6a02600c8/index.js#L15-L72
const supportedImageExtensions = [
  '.bmp',
  '.gif',
  '.jpeg',
  '.jpg',
  '.png',
  '.svg',
]

const supportedAudioExtensions = ['.aac', '.oga', '.ogg', '.wav', '.flac']

const supportedMediaExtensions = [
  ...supportedImageExtensions,
  ...supportedAudioExtensions,
]

export const InlineFile = ({ file }: InlineFileProps) => {
  const containerRef = useRef(null)
  const [didRenderingMediaFail, setDidRenderingMediaFail] = useState(false)
  const [isMediaSupported, setIsMediaSupported] = useState(true)
  const shellContext = useContext(ShellContext)

  useEffect(() => {
    const { current: container } = containerRef

    if (!container) return

    const { name } = file
    const fileNameExtension = name.split('.').pop() ?? ''

    if (!supportedMediaExtensions.includes(`.${fileNameExtension}`)) {
      setIsMediaSupported(false)
      return
    }

    try {
      file.appendTo(container)
    } catch (e) {
      console.error(e)
      setDidRenderingMediaFail(true)
    }
  }, [file, containerRef, shellContext.roomId])

  return (
    <div ref={containerRef} className="[&_img]:max-w-full">
      {!isMediaSupported && (
        <p className="italic">Media preview not supported</p>
      )}
      {didRenderingMediaFail && (
        <p className="italic">Media failed to render</p>
      )}
    </div>
  )
}

export const InlineMedia = ({ magnetURI }: InlineMediaProps) => {
  const [hasDownloadInitiated, setHasDownloadInitiated] = useState(false)
  const [downloadedFiles, setDownloadedFiles] = useState<TorrentFiles>([])
  const shellContext = useContext(ShellContext)
  const {
    fileTransferService: { fileTransfer },
  } = useContext(RoomContext)

  useEffect(() => {
    ;(async () => {
      if (hasDownloadInitiated) return
      if (typeof shellContext.roomId !== 'string') {
        throw new Error('shellContext.roomId is not a string')
      }

      setHasDownloadInitiated(true)
      const files = await fileTransfer.download(magnetURI, shellContext.roomId)
      setDownloadedFiles(files)
    })()
  }, [fileTransfer, hasDownloadInitiated, magnetURI, shellContext.roomId])

  return (
    <>
      {hasDownloadInitiated && downloadedFiles.length === 0 ? (
        <div className="size-6 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        downloadedFiles.map(file => <InlineFile file={file} key={file.name} />)
      )}
    </>
  )
}
