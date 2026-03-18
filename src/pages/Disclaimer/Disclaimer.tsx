import { useContext, useEffect } from 'react'
import Markdown from 'react-markdown'
import { useTranslation } from 'react-i18next'

import { ShellContext } from 'contexts/ShellContext'

export const Disclaimer = () => {
  const { setTitle } = useContext(ShellContext)
  const { t } = useTranslation()

  useEffect(() => {
    setTitle(t('disclaimer.title'))
  }, [setTitle, t])

  return (
    <div className="Disclaimer mx-auto max-w-screen-md p-4 [&_p]:mb-4">
      <Markdown>{t('disclaimer.content')}</Markdown>
    </div>
  )
}
