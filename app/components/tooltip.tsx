import { Arrow, Content, Root, Trigger } from "@radix-ui/react-tooltip";
import { type ReactNode } from "react";

interface Props {
  label: ReactNode;
  children: ReactNode;
}

export function Tooltip({ label, children }: Props) {
  return (
    <Root delayDuration={150} disableHoverableContent>
      <Trigger asChild>{children}</Trigger>
      <Content
        className="select-none rounded bg-gray-blue-950 px-4 py-2.5 text-sm leading-none text-gray-blue-100 will-change-[transform,opacity]"
        sideOffset={4}
      >
        {label}
        <Arrow width={14} height={7} className="fill-gray-blue-950" />
      </Content>
    </Root>
  );
}
