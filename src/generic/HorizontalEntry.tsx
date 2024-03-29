import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { FC, ReactNode } from 'react'

interface HorizontalEntryProps {
  onMoveToLeft: () => void
  onMoveToRight: () => void
  children: ReactNode
  leftDisabled?: boolean
  rightDisabled?: boolean
  className?: string
}

export const HorizontalEntry: FC<HorizontalEntryProps> = ( {
  onMoveToLeft,
  onMoveToRight,
  children,
  className = '',
  leftDisabled = false,
  rightDisabled = false
} ) => (
  <div className={`flex flex-row ${className}`}>
    <ChevronLeftIcon
      className={`h-6 w-6 grow shrink-0 my-auto ${leftDisabled && 'invisible'}`}
      onClick={onMoveToLeft}
    />
    {children}
    <ChevronRightIcon
      className={`h-6 w-6 grow shrink-0 my-auto ${rightDisabled && 'invisible'}`}
      onClick={onMoveToRight}
    />
  </div>
)
