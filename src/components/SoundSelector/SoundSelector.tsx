import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { soundOptions } from 'config/soundNames'
import { SettingsContext } from 'contexts/SettingsContext'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select'

export const handleChange = async (
  newValue: string | undefined,
  updateUserSettings: Function
) => {
  const option = soundOptions.find(o => o.value === newValue)
  const newSound = option?.value || soundOptions[0].value

  if (newSound) {
    const audio = new Audio(newSound)
    audio.play().catch(error => console.error('Error playing sound:', error))
  }

  await updateUserSettings({ selectedSound: newSound })
}

interface SoundSelectorProps {
  disabled?: boolean
}

export const SoundSelector: React.FC<SoundSelectorProps> = ({ disabled }) => {
  const { t } = useTranslation()
  const { getUserSettings, updateUserSettings } = useContext(SettingsContext)
  const { selectedSound } = getUserSettings()

  const currentValue = selectedSound || soundOptions[0].value

  return (
    <div className="w-[300px] mt-4">
      <Select
        value={currentValue}
        onValueChange={value => handleChange(value, updateUserSettings)}
        disabled={disabled}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={t('settings.soundSelectorLabel')} />
        </SelectTrigger>
        <SelectContent>
          {soundOptions.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {t(option.labelKey)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
