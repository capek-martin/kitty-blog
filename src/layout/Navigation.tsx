import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { paths } from "../utils/core/routes";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

interface NavItem {
  title: string;
  path: string;
}

export const Navigation = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const navigation: NavItem[] = [
    { title: "Recent articles", path: paths.HOME },
    { title: "About", path: paths.ABOUT },
  ];

  const adminNavigation: NavItem[] = [
    { title: "My articles", path: paths.MY_ARTICLES },
    { title: "Create article", path: `${paths.ARTICLES}/new` },
  ];

  const activeLinkColor = `#212529`;
  return (
    <header>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <img
            className="logo"
            src={"/logo/logo.png"}
            alt={"logo"}
            title={"logo"}
          />
          <ul className="links">
            {navigation.map((item: NavItem, index: number) => (
              <li
                key={index}
                onClick={() => navigate(item.path)}
                style={{
                  color: currentPath.includes(item.path)
                    ? activeLinkColor
                    : undefined,
                }}
              >
                <Typography className="normal">{item.title}</Typography>
              </li>
            ))}
          </ul>
        </div>
        <div>
          {user ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <ul className="admin-menu">
                {adminNavigation.map((item: NavItem, index: number) => (
                  <li
                    key={index}
                    onClick={() => navigate(item.path)}
                    style={{
                      color: currentPath.includes(item.path)
                        ? activeLinkColor
                        : undefined,
                    }}
                  >
                    <Typography className="normal">{item.title}</Typography>
                  </li>
                ))}
              </ul>
              <img
                className="avatar"
                src={user?.avatarSrc}
                alt={"avatar"}
                title={"avatar"}
              />
            </div>
          ) : (
            <Button
              onClick={() => navigate(paths.LOGIN)}
              className="btn-login"
              title="Log in"
            >
              Log in
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};
