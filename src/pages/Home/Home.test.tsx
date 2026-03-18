import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import type { ReactNode } from 'react'

import type { SettingsContextProps } from 'contexts/SettingsContext'
import type { ShellContextProps } from 'contexts/ShellContext'
import { SettingsContext } from 'contexts/SettingsContext'
import { ShellContext } from 'contexts/ShellContext'
import { TooltipProvider } from 'components/ui/tooltip'
import { userSettingsContextStubFactory } from 'test-utils/stubs/settingsContext'

import { Home } from './Home'

const settingsContextValue = userSettingsContextStubFactory({
  userId: 'test-user-id',
})

const shellContextValue = {
  setTitle: vi.fn(),
} as unknown as ShellContextProps

const HomeTestWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <MemoryRouter>
      <TooltipProvider>
        <SettingsContext.Provider
          value={settingsContextValue as SettingsContextProps}
        >
          <ShellContext.Provider value={shellContextValue}>
            {children}
          </ShellContext.Provider>
        </SettingsContext.Provider>
      </TooltipProvider>
    </MemoryRouter>
  )
}

describe('Home', () => {
  it('renders room creation form and secondary actions', () => {
    render(<Home userId="test-user-id" />, { wrapper: HomeTestWrapper })

    expect(
      screen.getByRole('heading', {
        name: 'Private calls without the usual mess',
      })
    ).toBeVisible()
    expect(screen.getByLabelText('Room name')).toBeVisible()
    expect(
      screen.getByRole('button', { name: 'Start private room' })
    ).toBeVisible()
    expect(screen.getByText('Community rooms')).toBeVisible()
  })

  it('opens the embed code dialog', async () => {
    const user = userEvent.setup()

    render(<Home userId="test-user-id" />, { wrapper: HomeTestWrapper })

    await user.click(
      screen.getAllByRole('button', { name: 'Get embed code' })[0]
    )

    expect(
      await screen.findByRole('heading', { name: 'Embedding Chitchatter' })
    ).toBeVisible()
  })
})
