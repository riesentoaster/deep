import { ReactNode } from 'react'

interface EllipsisProps {
  children: ReactNode
  className?: string
}
export const Ellipsis = ( { children, className = '' }: EllipsisProps ): JSX.Element => (
  <div className={`border rounded-full h-max w-max px-[2ex] ${className}`}>{children}</div>
)
