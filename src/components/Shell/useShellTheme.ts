import { SettingsContext } from 'contexts/SettingsContext'
import { useContext, useMemo } from 'react'

export const useShellTheme = () => {
  const { getUserSettings } = useContext(SettingsContext)
  const { colorMode } = getUserSettings()

  const theme = useMemo(
    () => ({
      mode: colorMode,
    }),
    [colorMode]
  )

  return theme
}
