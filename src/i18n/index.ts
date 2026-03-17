import { Language } from 'models/settings'

const translations = {
  en: {
    appName: 'Chitchatter',
    language: 'Language',
    languageHelp: 'Choose the language that feels easiest for your family.',
    english: 'English',
    spanish: 'Spanish',
    russian: 'Russian',
    homeTitle: 'Private calls without the usual mess',
    homeSubtitle:
      'Pick a room name, share the link, and start talking. Everything stays in the browser between the people in the room.',
    yourName: 'Your name',
    roomNameLabel: 'Room name',
    roomNameHelp:
      'You can paste a full invitation link here, or use a simple room name like family-call.',
    regenerateRoomId: 'Create another room name',
    roomNameType: 'Room name style',
    readableWords: 'Readable words',
    technicalId: 'Technical ID',
    startPrivateRoom: 'Start private room',
    openPublicRoom: 'Open public room',
    startPrivateRoomHelp:
      'Best for family calls and one-off private conversations.',
    openPublicRoomHelp:
      'Use this only when anyone with the room link can join.',
    advancedOptions: 'Advanced options',
    advancedOptionsHelp:
      'Community rooms, embed code, and connectivity tools live here.',
    communityRooms: 'Community rooms',
    embedCode: 'Get embed code',
    privacySummary:
      'Private, encrypted, and temporary. When everyone leaves, the conversation disappears.',
    sourceCode: 'Source code',
    docs: 'docs',
    settingsTitle: 'Settings',
    settingsLanguageTitle: 'Language',
    settingsChatTitle: 'Chat',
    chatBackgroundBehavior: 'When a message arrives in the background:',
    playSound: 'Play a sound',
    showNotification: 'Show a notification',
    soundSelectorLabel: 'Choose the message sound:',
    typingIndicators: 'Show active typing indicators',
    typingIndicatorsHelp:
      'If you turn this off, other people will not see when you are typing.',
    networkingTitle: 'Networking',
    dataTitle: 'Data',
    exportProfileTitle: 'Export profile data',
    exportProfileBody:
      'Export your profile so you can move it to another browser or device. Do not share it with anyone else.',
    exportProfile: 'Export profile data',
    importProfileTitle: 'Import profile data',
    importProfileBody:
      'Import a profile backup to keep the same identity on another device.',
    importProfile: 'Import profile data',
    deleteProfileTitle: 'Delete local profile data',
    deleteProfileBody:
      'This removes your saved profile and resets the app on this device.',
    deleteProfile: 'Delete local profile data',
    deleteProfileWarningStart:
      'Be careful with this. This will change your visible name from',
    deleteProfileWarningEnd:
      'to a new random one and reset your saved Chitchatter preferences.',
    localDataOnly:
      'Chitchatter only stores local preferences and never stores message content on a server.',
    profileImported: 'Profile successfully imported',
  },
  es: {
    appName: 'Chitchatter',
    language: 'Idioma',
    languageHelp: 'Elegí el idioma que sea más fácil para tu familia.',
    english: 'Inglés',
    spanish: 'Español',
    russian: 'Ruso',
    homeTitle: 'Llamadas privadas sin complicaciones',
    homeSubtitle:
      'Elegí un nombre de sala, compartí el enlace y empezá a hablar. Todo queda en el navegador entre las personas de la sala.',
    yourName: 'Tu nombre',
    roomNameLabel: 'Nombre de la sala',
    roomNameHelp:
      'Podés pegar un enlace completo de invitación o usar un nombre simple como familia-domingo.',
    regenerateRoomId: 'Crear otro nombre de sala',
    roomNameType: 'Estilo del nombre de sala',
    readableWords: 'Palabras fáciles',
    technicalId: 'ID técnico',
    startPrivateRoom: 'Abrir sala privada',
    openPublicRoom: 'Abrir sala pública',
    startPrivateRoomHelp:
      'Lo mejor para llamadas familiares y conversaciones privadas.',
    openPublicRoomHelp:
      'Usalo solo cuando cualquier persona con el enlace pueda entrar.',
    advancedOptions: 'Opciones avanzadas',
    advancedOptionsHelp:
      'Las salas comunitarias, el código para embeber y la conectividad están acá.',
    communityRooms: 'Salas comunitarias',
    embedCode: 'Obtener código para embeber',
    privacySummary:
      'Privado, cifrado y temporal. Cuando todos salen, la conversación desaparece.',
    sourceCode: 'Código fuente',
    docs: 'documentación',
    settingsTitle: 'Configuración',
    settingsLanguageTitle: 'Idioma',
    settingsChatTitle: 'Chat',
    chatBackgroundBehavior: 'Cuando llega un mensaje en segundo plano:',
    playSound: 'Reproducir un sonido',
    showNotification: 'Mostrar una notificación',
    soundSelectorLabel: 'Elegí el sonido del mensaje:',
    typingIndicators: 'Mostrar indicadores de escritura',
    typingIndicatorsHelp:
      'Si desactivás esto, los demás no verán cuando estés escribiendo.',
    networkingTitle: 'Red',
    dataTitle: 'Datos',
    exportProfileTitle: 'Exportar datos del perfil',
    exportProfileBody:
      'Exportá tu perfil para moverlo a otro navegador o dispositivo. No lo compartas con nadie más.',
    exportProfile: 'Exportar datos del perfil',
    importProfileTitle: 'Importar datos del perfil',
    importProfileBody:
      'Importá una copia del perfil para mantener la misma identidad en otro dispositivo.',
    importProfile: 'Importar datos del perfil',
    deleteProfileTitle: 'Borrar datos locales del perfil',
    deleteProfileBody:
      'Esto elimina tu perfil guardado y reinicia la app en este dispositivo.',
    deleteProfile: 'Borrar datos locales del perfil',
    deleteProfileWarningStart:
      'Cuidado con esto. Tu nombre visible cambiará de',
    deleteProfileWarningEnd:
      'a uno nuevo generado al azar y se reiniciarán tus preferencias guardadas de Chitchatter.',
    localDataOnly:
      'Chitchatter solo guarda preferencias locales y nunca guarda mensajes en un servidor.',
    profileImported: 'Perfil importado correctamente',
  },
  ru: {
    appName: 'Chitchatter',
    language: 'Язык',
    languageHelp: 'Выберите язык, который проще всего вашей семье.',
    english: 'Английский',
    spanish: 'Испанский',
    russian: 'Русский',
    homeTitle: 'Приватные звонки без лишней сложности',
    homeSubtitle:
      'Выберите имя комнаты, отправьте ссылку и начинайте разговор. Все остается только в браузерах участников комнаты.',
    yourName: 'Ваше имя',
    roomNameLabel: 'Имя комнаты',
    roomNameHelp:
      'Сюда можно вставить полную ссылку-приглашение или простой идентификатор вроде family-call.',
    regenerateRoomId: 'Создать другое имя комнаты',
    roomNameType: 'Формат имени комнаты',
    readableWords: 'Простые слова',
    technicalId: 'Технический ID',
    startPrivateRoom: 'Открыть приватную комнату',
    openPublicRoom: 'Открыть публичную комнату',
    startPrivateRoomHelp:
      'Лучше всего подходит для семейных звонков и приватных разговоров.',
    openPublicRoomHelp:
      'Используйте это только если любой человек по ссылке может присоединиться.',
    advancedOptions: 'Дополнительные настройки',
    advancedOptionsHelp:
      'Комнаты сообщества, код для встраивания и параметры сети находятся здесь.',
    communityRooms: 'Комнаты сообщества',
    embedCode: 'Получить код для встраивания',
    privacySummary:
      'Приватно, зашифровано и временно. Когда все выходят, разговор исчезает.',
    sourceCode: 'Исходный код',
    docs: 'документацию',
    settingsTitle: 'Настройки',
    settingsLanguageTitle: 'Язык',
    settingsChatTitle: 'Чат',
    chatBackgroundBehavior: 'Когда сообщение приходит в фоновом режиме:',
    playSound: 'Проигрывать звук',
    showNotification: 'Показывать уведомление',
    soundSelectorLabel: 'Выберите звук сообщения:',
    typingIndicators: 'Показывать индикатор набора текста',
    typingIndicatorsHelp:
      'Если отключить это, другие не будут видеть, что вы печатаете.',
    networkingTitle: 'Сеть',
    dataTitle: 'Данные',
    exportProfileTitle: 'Экспорт данных профиля',
    exportProfileBody:
      'Экспортируйте профиль, чтобы перенести его в другой браузер или на другое устройство. Не делитесь этим файлом.',
    exportProfile: 'Экспорт данных профиля',
    importProfileTitle: 'Импорт данных профиля',
    importProfileBody:
      'Импортируйте резервную копию профиля, чтобы сохранить ту же личность на другом устройстве.',
    importProfile: 'Импорт данных профиля',
    deleteProfileTitle: 'Удалить локальные данные профиля',
    deleteProfileBody:
      'Это удалит сохраненный профиль и сбросит приложение на этом устройстве.',
    deleteProfile: 'Удалить локальные данные профиля',
    deleteProfileWarningStart:
      'Будьте осторожны. Ваше отображаемое имя изменится с',
    deleteProfileWarningEnd:
      'на новое случайное имя, а сохраненные настройки Chitchatter будут сброшены.',
    localDataOnly:
      'Chitchatter хранит только локальные настройки и никогда не сохраняет сообщения на сервере.',
    profileImported: 'Профиль успешно импортирован',
  },
} as const

type TranslationKey = keyof (typeof translations)[Language.ENGLISH]

const defaultLanguage = Language.ENGLISH

export const getPreferredLanguage = (locale: string | undefined): Language => {
  const normalizedLocale = locale?.toLowerCase() ?? ''

  if (normalizedLocale.startsWith(Language.SPANISH)) {
    return Language.SPANISH
  }

  if (normalizedLocale.startsWith(Language.RUSSIAN)) {
    return Language.RUSSIAN
  }

  return defaultLanguage
}

export const getLanguageLabel = (language: Language) => {
  switch (language) {
    case Language.SPANISH:
      return translations[language].spanish
    case Language.RUSSIAN:
      return translations[language].russian
    case Language.ENGLISH:
    default:
      return translations[language].english
  }
}

export const t = (language: Language, key: TranslationKey): string => {
  return translations[language][key] ?? translations[defaultLanguage][key]
}
