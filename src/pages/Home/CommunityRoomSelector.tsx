import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Button } from 'components/ui/button'
import { Label } from 'components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select'
import { communityRoomNames } from 'config/communityRooms'

export const CommunityRoomSelector = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [selectedRoom, setSelectedRoom] = useState('')

  const handleJoinClick = () => {
    navigate(`/public/${selectedRoom}`)
  }

  return (
    <div className="space-y-3">
      <p className="text-sm leading-6 text-muted-foreground">
        {t('communityRooms.description')}
      </p>
      <div className="space-y-2">
        <Label htmlFor="community-room-select">
          {t('communityRooms.room')}
        </Label>
        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
          <Select value={selectedRoom} onValueChange={setSelectedRoom}>
            <SelectTrigger id="community-room-select" className="w-full">
              <SelectValue placeholder={t('communityRooms.room')} />
            </SelectTrigger>
            <SelectContent>
              {communityRoomNames.map(roomName => (
                <SelectItem key={roomName} value={roomName}>
                  {roomName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            type="button"
            variant="secondary"
            onClick={handleJoinClick}
            disabled={!selectedRoom}
          >
            {t('communityRooms.join')}
          </Button>
        </div>
      </div>
    </div>
  )
}
