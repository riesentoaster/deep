interface ErrorMessageProps {
    text: string
    color?: 'red' | 'yellow' | 'none'
}

export const ErrorMessage = ( { text, color='red' }: ErrorMessageProps ): JSX.Element => (
  <p className={`mx-auto w-fit ${color === 'none' ? '' : `text-${color}-400`}`}>{text}</p>
)
