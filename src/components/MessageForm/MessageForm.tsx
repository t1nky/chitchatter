import {
  KeyboardEvent,
  SyntheticEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { ArrowUp01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useTranslation } from 'react-i18next'

import { messageCharacterSizeLimit } from 'config/messaging'
import { SettingsContext } from 'contexts/SettingsContext'
import { Form } from 'components/Elements'
import { Button } from 'components/ui/button'

import { cn } from '@/lib/utils'

interface MessageFormProps {
  onMessageSubmit: (message: string) => void
  onMessageChange: (message: string) => void
  isMessageSending: boolean
}

export const MessageForm = ({
  onMessageSubmit,
  onMessageChange,
  isMessageSending,
}: MessageFormProps) => {
  const { t } = useTranslation()
  const settingsContext = useContext(SettingsContext)
  const { showActiveTypingStatus } = settingsContext.getUserSettings()
  const textFieldRef = useRef<HTMLTextAreaElement>(null)
  const [textMessage, setTextMessage] = useState('')

  useEffect(() => {
    const { current: textField } = textFieldRef
    if (!textField) return

    textField.focus()
  }, [textFieldRef])

  const canMessageBeSent = () => {
    return (
      textMessage.trim().length > 0 &&
      textMessage.length < messageCharacterSizeLimit &&
      !isMessageSending
    )
  }

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = event.target
    setTextMessage(value)
    onMessageChange(value)
  }

  const submitMessage = () => {
    onMessageSubmit(textMessage)
    setTextMessage('')
  }

  const handleMessageKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    const { key, shiftKey } = event

    if (key === 'Enter' && shiftKey === false) {
      event.preventDefault()

      if (!canMessageBeSent()) return

      submitMessage()
    }
  }

  const handleMessageSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    submitMessage()
  }

  return (
    <Form
      onSubmit={handleMessageSubmit}
      className={cn(showActiveTypingStatus ? 'pt-4 px-4' : 'p-4')}
    >
      <div className="flex items-center gap-2">
        <textarea
          className="flex-1 min-h-10 resize-none rounded-lg border border-input bg-transparent px-3 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30"
          value={textMessage}
          onChange={handleMessageChange}
          onKeyPress={handleMessageKeyPress}
          placeholder={t('messageForm.placeholder')}
          ref={textFieldRef}
          rows={1}
        />
        <Button
          size="icon"
          className="rounded-full shrink-0 size-10"
          aria-label={t('messageForm.send')}
          type="submit"
          disabled={!canMessageBeSent()}
        >
          <HugeiconsIcon
            icon={ArrowUp01Icon}
            strokeWidth={1.8}
            className="size-4"
          />
        </Button>
      </div>
    </Form>
  )
}
