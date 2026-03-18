import { useState, useContext, ChangeEvent, SyntheticEvent } from 'react'
import { InformationCircleIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useTranslation } from 'react-i18next'

import { ShellContext } from 'contexts/ShellContext'
import { getPeerName } from 'components/PeerNameDisplay'
import { SettingsContext } from 'contexts/SettingsContext'
import { PublicKey } from 'components/PublicKey'
import { PeerNameDisplay } from 'components/PeerNameDisplay'

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

interface UserInfoProps {
  userId: string
  showLabel?: boolean
}

const maxCustomUsernameLength = 30

export const UserInfo = ({ userId, showLabel = true }: UserInfoProps) => {
  const { t } = useTranslation()
  const userName = getPeerName(userId)

  const { customUsername, setCustomUsername, showAlert } =
    useContext(ShellContext)
  const { getUserSettings } = useContext(SettingsContext)
  const [inflightCustomUsername, setInflightCustomUsername] =
    useState(customUsername)
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false)

  const { publicKey } = getUserSettings()

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInflightCustomUsername(evt.target.value)
  }

  const updateCustomUsername = () => {
    const trimmedUsername = inflightCustomUsername.trim()
    setCustomUsername(trimmedUsername)

    if (trimmedUsername.length) {
      showAlert(t('userInfo.changed', { name: trimmedUsername }), {
        severity: 'success',
      })
    } else {
      showAlert(t('userInfo.reset'), { severity: 'success' })
    }
  }

  const handleSubmit = (evt: SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault()
    updateCustomUsername()
  }

  const handleBlur = () => {
    updateCustomUsername()
  }

  const handleInfoButtonClick = () => {
    setIsInfoDialogOpen(true)
  }

  const handleInfoDialogClose = () => {
    setIsInfoDialogOpen(false)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid min-w-0 gap-1.5">
          {showLabel && (
            <Label
              htmlFor="custom-username"
              className="text-xs text-muted-foreground"
            >
              {t('userInfo.yourUsername')}
            </Label>
          )}
          <div className="flex items-center gap-2">
            <Input
              id="custom-username"
              className="min-w-0 flex-1"
              onChange={handleChange}
              onBlur={handleBlur}
              value={inflightCustomUsername}
              maxLength={maxCustomUsernameLength}
              placeholder={userName}
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={handleInfoButtonClick}
                >
                  <HugeiconsIcon
                    icon={InformationCircleIcon}
                    strokeWidth={1.8}
                    className="size-4"
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{t('userInfo.reveal')}</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </form>
      <Dialog
        open={isInfoDialogOpen}
        onOpenChange={open => {
          if (!open) handleInfoDialogClose()
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <PeerNameDisplay>{userId}</PeerNameDisplay>
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-2">
            <DialogDescription>{t('userInfo.publicKey')}</DialogDescription>
            <PublicKey publicKey={publicKey} />
            <DialogDescription>{t('userInfo.privateKey')}</DialogDescription>
          </div>
          <DialogFooter>
            <Button onClick={handleInfoDialogClose}>
              {t('userInfo.close')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
