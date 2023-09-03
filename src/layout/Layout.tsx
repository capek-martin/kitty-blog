import { ReactNode } from "react";
import { Content } from "./Content";
import { Navigation } from "./Navigation";
import "./Layout.scss";

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div style={{ display: "block" }}>
      <Navigation />
      <Content>{children}</Content>
    </div>
  );
};
