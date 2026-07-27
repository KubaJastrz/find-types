import { twMerge } from "cnfast";
import type { ReactNode } from "react";

export type ResultType = "success" | "warning" | "neutral";

interface Props {
	children?: ReactNode;
	icon: ReactNode;
	title: ReactNode;
	type: ResultType;
}

export function ResultEntry({ children, icon, title, type }: Props) {
	const cellClasses = twMerge(
		"font-bold text-sm leading-5 flex items-center",
		type === "success" && "text-success",
		type === "warning" && "text-warning",
		type === "neutral" && "text-neutral",
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
	AlertTriangle as WarningIcon,
	CheckCircle as SuccessIcon,
	X as ErrorIcon,
} from "#app/components/icons";
