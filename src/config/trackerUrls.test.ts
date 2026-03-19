import { afterEach, describe, expect, test, vi } from 'vitest'

const originalTrackerUrl = import.meta.env.VITE_TRACKER_URL

afterEach(() => {
  import.meta.env.VITE_TRACKER_URL = originalTrackerUrl
  vi.resetModules()
})

describe('trackerUrls', () => {
  test('prioritizes the preferred hosted trackers', async () => {
    import.meta.env.VITE_TRACKER_URL = undefined
    vi.resetModules()

    const { trackerUrls } = await import('./trackerUrls')

    expect(trackerUrls).toEqual([
      'wss://tracker.openwebtorrent.com/',
      'wss://tracker.webtorrent.dev/',
    ])
  })

  test('prepends the environment override ahead of the default fallbacks', async () => {
    import.meta.env.VITE_TRACKER_URL = 'wss://tracker.example.test/'
    vi.resetModules()

    const { trackerUrls } = await import('./trackerUrls')

    expect(trackerUrls).toEqual([
      'wss://tracker.example.test/',
      'wss://tracker.openwebtorrent.com/',
      'wss://tracker.webtorrent.dev/',
    ])
  })

  test('ignores stringified empty env values', async () => {
    import.meta.env.VITE_TRACKER_URL = 'undefined'
    vi.resetModules()

    const { trackerUrls } = await import('./trackerUrls')

    expect(trackerUrls).toEqual([
      'wss://tracker.openwebtorrent.com/',
      'wss://tracker.webtorrent.dev/',
    ])
  })
})
