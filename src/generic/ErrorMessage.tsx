import { FC } from 'react'

type ErrorMessageType = 'error' | 'warn' | 'none'
interface ErrorMessageProps {
  text: string
  type?: ErrorMessageType
}

const colors: Record<ErrorMessageType, string> = {
  'error': 'fg-red',
  'warn': 'fg-yellow',
  'none': ''
}

export const ErrorMessage: FC<ErrorMessageProps> = ( { text, type = 'error' } ) => (
  <p className={`mx-auto w-fit ${colors[type]}`}>{text}</p>
)
