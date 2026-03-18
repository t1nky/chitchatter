import { AlertOptions, AlertSeverity } from 'models/shell'
import { useEffect, useState, SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { sleep } from 'lib/sleep'
import { encryption } from 'services/Encryption'

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
import { Checkbox } from 'components/ui/checkbox'
import { Alert, AlertDescription } from 'components/ui/alert'
import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/tooltip'

export interface RoomShareDialogProps {
  isOpen: boolean
  handleClose: () => void
  roomId: string
  password: string
  showAlert: (message: string, options?: AlertOptions) => void
  copyToClipboard: (
    content: string,
    alert: string,
    severity: AlertSeverity
  ) => Promise<void>
}

export function RoomShareDialog(props: RoomShareDialogProps) {
  const { t } = useTranslation()
  const [isAdvanced, setIsAdvanced] = useState(false)
  const [isUnderstood, setIsUnderstood] = useState(false)
  const [password, setPassword] = useState('')
  const [passThrottled, setPassThrottled] = useState(false)
  const handleClose = () => {
    props.handleClose()
    setPassword('')
  }

  useEffect(() => {
    if (!isAdvanced) setIsUnderstood(false)
  }, [isAdvanced])

  useEffect(() => {
    if (!isUnderstood) setPassword('')
  }, [isUnderstood])

  const url = window.location.href.split('#')[0]

  const copyWithPass = async () => {
    const encoded = await encryption.encodePassword(props.roomId, password)

    if (encoded === props.password) {
      const params = new URLSearchParams()
      params.set('secret', props.password)

      await props.copyToClipboard(
        `${url}#${params}`,
        t('dialogs.roomShare.copiedPrivateUrlWithPassword'),
        'warning'
      )

      handleClose()
    } else {
      setPassThrottled(true)
      props.showAlert(t('dialogs.roomShare.incorrectPassword'), {
        severity: 'error',
      })

      await sleep(2000)

      setPassThrottled(false)
    }
  }

  const copyWithoutPass = async () => {
    await props.copyToClipboard(
      url,
      isAdvanced
        ? t('dialogs.roomShare.copiedPrivateUrl')
        : t('dialogs.roomShare.copiedCurrentUrl'),
      'success'
    )

    handleClose()
  }

  const handleFormSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!passThrottled) copyWithPass()
  }

  return (
    <Dialog
      open={props.isOpen}
      onOpenChange={open => {
        if (!open) handleClose()
      }}
    >
      <DialogContent>
        <form onSubmit={handleFormSubmit} className="grid gap-4">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <DialogTitle>
                {t(
                  isAdvanced
                    ? 'dialogs.roomShare.title'
                    : 'dialogs.roomShare.simpleTitle'
                )}
              </DialogTitle>
              {isAdvanced && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAdvanced(false)}
                >
                  {t('dialogs.roomShare.simple')}
                </Button>
              )}
            </div>
            {isAdvanced && (
              <DialogDescription>
                {t('dialogs.roomShare.advancedDescription')}
              </DialogDescription>
            )}
          </DialogHeader>
          {isAdvanced && (
            <div className="grid gap-3">
              <Alert variant="destructive">
                <AlertDescription>
                  {t('dialogs.roomShare.dangerAlert')}
                </AlertDescription>
              </Alert>
              <Alert className="border-yellow-500/50 text-yellow-700 dark:text-yellow-400">
                <AlertDescription className="text-yellow-700 dark:text-yellow-400">
                  {t('dialogs.roomShare.warningAlert')}
                </AlertDescription>
              </Alert>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="understood"
                  checked={isUnderstood}
                  onCheckedChange={checked => setIsUnderstood(checked === true)}
                />
                <Label htmlFor="understood">
                  {t('dialogs.roomShare.understood')}
                </Label>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">
                  {t('dialogs.roomShare.password')}
                </Label>
                <Input
                  autoFocus
                  id="password"
                  type="password"
                  value={password}
                  disabled={!isUnderstood}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            {isAdvanced ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <Button
                      type="submit"
                      variant="destructive"
                      onClick={copyWithPass}
                      disabled={
                        password.length === 0 || !isUnderstood || passThrottled
                      }
                    >
                      {t('dialogs.roomShare.copyUrlWithPassword')}
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  {t('dialogs.roomShare.copyUrlWithPasswordTooltip')}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Button
                type="button"
                variant="destructive"
                onClick={() => setIsAdvanced(true)}
              >
                {t('dialogs.roomShare.advanced')}
              </Button>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button type="button" onClick={copyWithoutPass} autoFocus>
                  {t('dialogs.roomShare.copyUrl')}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {t('dialogs.roomShare.copyUrlTooltip')}
              </TooltipContent>
            </Tooltip>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
