import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function Content({ children }: Props) {
  return <main className={"content"}>{children}</main>;
}
