import clsx from 'clsx'
import React from 'react'

export enum ResultType {
  success,
  warning,
  neutral,
}

interface Props {
  icon: React.ReactChild
  title: React.ReactChild
  type: ResultType
}

export const ResultEntry: React.FC<Props> = ({children, icon, title, type}) => {
  const cellClasses = clsx('font-bold text-sm leading-5 flex items-center', {
    'text-success': type === ResultType.success,
    'text-warning': type === ResultType.warning,
    'text-neutral': type === ResultType.neutral,
  })

  return (
    <div className="grid grid-cols-status gap-2">
      <div className={cellClasses}>{icon}</div>
      <div className={cellClasses}>{title}</div>
      {children && <div className="col-start-2">{children}</div>}
    </div>
  )
}

export {
  X as ErrorIcon,
  CheckCircle as SuccessIcon,
  AlertTriangle as WarningIcon,
} from '@/components/Icons'
