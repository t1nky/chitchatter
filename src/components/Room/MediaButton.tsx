import { forwardRef } from 'react'

import { Button } from 'components/ui/button'

import { cn } from '@/lib/utils'

interface MediaButtonProps extends React.ComponentProps<typeof Button> {
  isActive: boolean
}

export const MediaButton = forwardRef<HTMLButtonElement, MediaButtonProps>(
  ({ isActive, className, ...props }: MediaButtonProps, ref) => {
    return (
      <Button
        {...props}
        ref={ref}
        variant="ghost"
        size="icon"
        className={cn(
          'size-12 rounded-full',
          isActive
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground',
          className
        )}
      />
    )
  }
)
