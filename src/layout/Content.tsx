import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

/**
 * Main content
 */
export function Content({ children }: Props) {
  return <main className={"main-container"}>{children}</main>;
}
