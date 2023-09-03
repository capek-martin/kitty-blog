import { Route, Routes } from "react-router-dom";
import { routes } from "./utils/core/routes";
import { Layout } from "./layout/Layout";

export function AppContent() {
  return (
    <>
      <Layout>
        <Routes>
          {routes.map(({ path, component }) => {
            return <Route key={path} path={path} element={component} />;
          })}
        </Routes>
      </Layout>
    </>
  );
}
