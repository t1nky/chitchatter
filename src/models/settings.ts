export enum ColorMode {
  DARK = 'dark',
  LIGHT = 'light',
}

export enum Language {
  ENGLISH = 'en',
  SPANISH = 'es',
  RUSSIAN = 'ru',
}

const ColorModeValueStrings = Object.values(ColorMode).map(String)
const LanguageValueStrings = Object.values(Language).map(String)

export const isColorMode = (color: string): color is ColorMode => {
  return ColorModeValueStrings.includes(color)
}

export const isLanguage = (language: string): language is Language => {
  return LanguageValueStrings.includes(language)
}

export interface UserSettings {
  colorMode: ColorMode
  language: Language
  userId: string
  customUsername: string
  playSoundOnNewMessage: boolean
  showNotificationOnNewMessage: boolean
  showActiveTypingStatus: boolean
  isEnhancedConnectivityEnabled: boolean
  publicKey: CryptoKeyPair['publicKey']
  privateKey: CryptoKeyPair['privateKey']
  selectedSound: string
}
