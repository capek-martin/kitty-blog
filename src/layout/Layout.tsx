import { ReactNode } from "react";
import { Content } from "./Content";
import { Navigation } from "./Navigation";
import "./Layout.scss";

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Navigation />
      <Content>{children}</Content>
    </>
  );
};
