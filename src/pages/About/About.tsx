import { useContext, useEffect } from 'react'
import Markdown from 'react-markdown'
import { useTranslation } from 'react-i18next'

import { ShellContext } from 'contexts/ShellContext'
import {
  messageTranscriptSizeLimit,
  messageCharacterSizeLimit,
} from 'config/messaging'

const messageTranscriptSizeLimitFormatted = Intl.NumberFormat().format(
  messageTranscriptSizeLimit
)

const messageCharacterSizeLimitFormatted = Intl.NumberFormat().format(
  messageCharacterSizeLimit
)

export const About = () => {
  const { setTitle } = useContext(ShellContext)
  const { t } = useTranslation()

  useEffect(() => {
    setTitle(t('about.title'))
  }, [setTitle, t])

  return (
    <div className="About mx-auto max-w-screen-md p-4 [&_p]:mb-4">
      <Markdown>
        {t('about.content', {
          messageTranscriptSizeLimitFormatted,
          messageCharacterSizeLimitFormatted,
        })}
      </Markdown>
    </div>
  )
}
