import { PropsWithChildren } from 'react'

import { SidebarInset } from 'components/ui/sidebar'

interface RouteContentProps extends PropsWithChildren {
  isPeerListOpen: boolean
}

export const RouteContent = ({
  children,
  isPeerListOpen,
}: RouteContentProps) => {
  return (
    <SidebarInset
      className="flex w-full flex-col overflow-hidden transition-[margin] duration-200"
      style={{ marginRight: isPeerListOpen ? 0 : undefined }}
    >
      {children}
    </SidebarInset>
  )
}
