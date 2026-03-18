import { Component, ErrorInfo, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Cancel01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import i18n from 'i18n'

import { routes } from 'config/routes'

interface Props {
  children?: ReactNode
}

interface State {
  error: Error | null
  showError: boolean
}

// Adapted from https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/error_boundaries/
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    error: null,
    showError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { error, showError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.error && this.state.showError) {
      const { name, message, stack } = this.state.error

      return (
        <div>
          <div className="flex items-start gap-3 rounded-lg border border-red-300 bg-red-50 p-4 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200">
            <div className="flex-1">
              <h2 className="text-xl font-semibold">
                <pre>{name}</pre>
              </h2>
              <h3 className="text-lg">
                <code>{message}</code>
              </h3>
              <pre className="mt-2 overflow-auto text-sm">{stack}</pre>
            </div>
            <button
              type="button"
              aria-label={i18n.t('dialogs.qrCode.close')}
              className="inline-flex items-center justify-center rounded-md p-1 hover:bg-red-200 dark:hover:bg-red-900"
              onClick={() => {
                this.setState({ error: null, showError: false })
              }}
            >
              <Link to={routes.ROOT}>
                <HugeiconsIcon
                  icon={Cancel01Icon}
                  strokeWidth={1.8}
                  className="size-4"
                />
              </Link>
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
