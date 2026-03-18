const BASE_URL = import.meta.env.BASE_URL ?? ''

export const soundOptions = [
  {
    labelKey: 'soundOptions.newMessage',
    value: `${BASE_URL}sounds/new-message.aac`,
  },
  { labelKey: 'soundOptions.chime', value: `${BASE_URL}sounds/chime.mp3` },
  { labelKey: 'soundOptions.beep', value: `${BASE_URL}sounds/beep.mp3` },
]

export const DEFAULT_SOUND =
  soundOptions.find(sound => sound.labelKey === 'soundOptions.newMessage')
    ?.value || `${BASE_URL}sounds/new-message.aac`
