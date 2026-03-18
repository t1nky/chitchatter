// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import 'i18n'
import { vi } from 'vitest'

// Mock console methods to silence log noise during tests
const silenceConsole = () => {
  vi.spyOn(console, 'log').mockImplementation(() => {})
  vi.spyOn(console, 'error').mockImplementation(() => {})
  vi.spyOn(console, 'warn').mockImplementation(() => {})
}

// Apply console silencing initially
silenceConsole()

afterEach(() => {
  vi.restoreAllMocks()
  // Re-apply console mocks to keep them silenced after restoration
  silenceConsole()
})

vi.mock('trystero')
vi.mock('trystero/torrent')

vi.mock('secure-file-transfer', () => ({
  __esModule: true,
  FileTransfer: class FileTransfer {
    rescindAll() {}
  },
  setStreamSaverMitm: () => {},
}))

if (!globalThis.ResizeObserver) {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver
}

if (!window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  })
}
