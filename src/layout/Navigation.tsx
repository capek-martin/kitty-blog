import {
  Button,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import { paths } from "../utils/core/routes";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import EastIcon from "@mui/icons-material/East";
import { CSSProperties } from "@mui/material/styles/createMixins";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { Logout } from "@mui/icons-material";
interface NavItem {
  title: string;
  path: string;
  style?: CSSProperties;
}

/**
 * Navigation component
 */
export const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const navigation: NavItem[] = [
    { title: "Recent articles", path: paths.HOME },
    { title: "About", path: paths.ABOUT },
  ];

  const adminNavigation: NavItem[] = [
    { title: "My articles", path: paths.MY_ARTICLES },
    {
      title: "Create article",
      path: `${paths.ARTICLES}/new`,
      style: { color: "#007BFF" },
    },
  ];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
                  ...item.style,
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
            <div className="admin-menu">
              <ul>
                {adminNavigation.map((item: NavItem, index: number) => (
                  <li
                    key={index}
                    onClick={() => navigate(item.path)}
                    style={
                      item.style
                        ? item.style
                        : {
                            color: currentPath.includes(item.path)
                              ? activeLinkColor
                              : undefined,
                          }
                    }
                  >
                    <Typography className="normal">{item.title}</Typography>
                  </li>
                ))}
              </ul>
              <Button onClick={handleClick}>
                <ArrowDropDownIcon color="action" />
                <img
                  className="avatar"
                  src={user?.avatarSrc}
                  alt={"avatar"}
                  title={"avatar"}
                />
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => navigate(paths.LOGIN)}
              className="btn-login"
              title="Log in"
            >
              Log in <EastIcon style={{ marginLeft: 5, padding: 3 }} />
            </Button>
          )}
        </div>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          }}
          // style={{ position: "absolute" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              logout && logout();
            }}
          >
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </nav>
    </header>
  );
};
