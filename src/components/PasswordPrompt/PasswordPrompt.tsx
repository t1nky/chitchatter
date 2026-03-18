import { ChangeEvent, useState, SyntheticEvent, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ViewIcon, ViewOffIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useTranslation } from 'react-i18next'

import { QueryParamKeys } from 'models/shell'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'components/ui/dialog'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { Label } from 'components/ui/label'
import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/tooltip'

interface PasswordPromptProps {
  isOpen: boolean
  onPasswordEntered: (password: string) => void
}

export const PasswordPrompt = ({
  isOpen,
  onPasswordEntered,
}: PasswordPromptProps) => {
  const { t } = useTranslation()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const queryParams = useMemo(
    () => new URLSearchParams(window.location.search),
    []
  )

  const isEmbedded = queryParams.has(QueryParamKeys.IS_EMBEDDED)

  const navigate = useNavigate()

  const handleFormSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    onPasswordEntered(password)
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleGoBackClick = () => {
    navigate(-1)
  }

  const passwordToggleLabel = showPassword
    ? t('dialogs.passwordPrompt.hidePassword')
    : t('dialogs.passwordPrompt.showPassword')

  return (
    <Dialog open={isOpen}>
      <DialogContent showCloseButton={false}>
        <form onSubmit={handleFormSubmit} className="grid gap-4">
          <DialogHeader>
            <DialogTitle>{t('dialogs.passwordPrompt.title')}</DialogTitle>
            <DialogDescription>
              {t('dialogs.passwordPrompt.description1')}
            </DialogDescription>
            <DialogDescription>
              {t('dialogs.passwordPrompt.description2')}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            <Label htmlFor="password">
              {t('dialogs.passwordPrompt.password')}
            </Label>
            <div className="relative">
              <Input
                autoFocus
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                className="pr-10"
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="absolute top-1/2 right-1 -translate-y-1/2"
                    aria-label={passwordToggleLabel}
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? (
                      <HugeiconsIcon
                        icon={ViewIcon}
                        strokeWidth={1.8}
                        className="size-4"
                      />
                    ) : (
                      <HugeiconsIcon
                        icon={ViewOffIcon}
                        strokeWidth={1.8}
                        className="size-4"
                      />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{passwordToggleLabel}</TooltipContent>
              </Tooltip>
            </div>
          </div>
          <DialogFooter>
            {!isEmbedded && (
              <Button variant="secondary" onClick={handleGoBackClick}>
                {t('dialogs.passwordPrompt.goBack')}
              </Button>
            )}
            <Button type="submit" disabled={password.length === 0}>
              {t('dialogs.passwordPrompt.submit')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
