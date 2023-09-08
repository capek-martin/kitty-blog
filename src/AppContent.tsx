import { Route, Routes, Navigate } from "react-router-dom";
import { paths, routes } from "./utils/core/routes";
import { Layout } from "./layout/Layout";
import { useAuth } from "./contexts/authContext";

export const AppContent = () => {
  const { user } = useAuth();

  return (
    <>
      <Layout>
        <Routes>
          {routes.map(({ path, component: Component, isRestricted }) => (
            <Route
              key={path}
              path={path}
              element={
                isRestricted && !user ? (
                  <Navigate
                    to={paths.LOGIN}
                    replace={true}
                    state={{ restricted: true }}
                  />
                ) : (
                  <Component />
                )
              }
            />
          ))}
        </Routes>
      </Layout>
    </>
  );
};
