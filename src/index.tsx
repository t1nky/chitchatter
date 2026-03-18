import './polyfills'
import 'i18n'
import ReactDOM from 'react-dom/client'

import './index.css'

import Init from './Init'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<Init />)

// Warm SyntaxHighlighter's internal cache after the app renders to avoid a
// race condition when EmbedCodeDialog first mounts.
// See: https://github.com/react-syntax-highlighter/react-syntax-highlighter/issues/513
requestIdleCallback(() => {
  import('react-syntax-highlighter').then(({ PrismAsyncLight }) => {
    ReactDOM.createRoot(document.createElement('div')).render(
      <PrismAsyncLight language="" children={''} />
    )
  })
})
