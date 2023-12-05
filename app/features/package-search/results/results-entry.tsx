import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export enum ResultType {
  success,
  warning,
  neutral,
}

interface Props {
  children?: ReactNode;
  icon: ReactNode;
  title: ReactNode;
  type: ResultType;
}

export function ResultEntry({ children, icon, title, type }: Props) {
  const cellClasses = twMerge(
    "font-bold text-sm leading-5 flex items-center",
    type === ResultType.success && "text-success",
    type === ResultType.warning && "text-warning",
    type === ResultType.neutral && "text-neutral",
  );

  return (
    <div className="grid-cols-status grid gap-2">
      <div className={cellClasses}>{icon}</div>
      <div className={cellClasses}>{title}</div>
      {children && <div className="col-start-2">{children}</div>}
    </div>
  );
}

export {
  X as ErrorIcon,
  CheckCircle as SuccessIcon,
  AlertTriangle as WarningIcon,
} from "~/components/icons";
