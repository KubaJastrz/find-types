import { twMerge } from "cnfast";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
	children: ReactNode;
};

export function InlineLink({ className, ...props }: Props) {
	// eslint-disable-next-line jsx-a11y/anchor-has-content
	return <a {...props} className={twMerge("font-bold hover:underline", className)} />;
}
