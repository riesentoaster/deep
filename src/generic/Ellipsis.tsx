import { FC, ReactNode } from 'react'

interface EllipsisProps {
  children: ReactNode
  className?: string
}
export const Ellipsis: FC<EllipsisProps> = ( { children, className = '' } ) => (
  <div className={`border rounded-full h-max w-max px-[2ex] ${className}`}>{children}</div>
)
