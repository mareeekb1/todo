import * as React from "react";
import { Link, useLocation } from "react-router-dom";

import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import {
  Drawer as MuiDrawer,
  List,
  Divider,
  IconButton,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListItem,
  Typography,
} from "@mui/material";
import {
  ListAlt as ListIcon,
  Dashboard as DashboardIcon,
  CalendarMonth as MilestonesIcon,
  Label as LabelIcon,
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";

import { drawerWidth, routes } from "../../utils/appUtils";

interface INavbar {
  open: boolean;
  handleDrawerClose: () => void;
}
interface INavbarItem {
  text: string;
  icon: React.ReactElement;
  path: string;
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Navbar({ open, handleDrawerClose }: INavbar) {
  const theme = useTheme();
  const { pathname } = useLocation();

  const NavbarItem = ({ text, icon, path }: INavbarItem) => {
    return (
      <Link
        to={path}
        style={{ textDecoration: "none", color: "#272D2D", fontWeight: "bold" }}
      >
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            selected={pathname === path}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText
              sx={{
                opacity: open ? 1 : 0,
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>{text}</Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </Link>
    );
  };

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <NavbarItem
          text={routes.dashboard.name}
          icon={<DashboardIcon />}
          path={routes.dashboard.path}
        />
        <NavbarItem
          text={routes.todo.name}
          icon={<ListIcon />}
          path={routes.todo.path}
        />
        <NavbarItem
          text={routes.labels.name}
          icon={<LabelIcon />}
          path={routes.labels.path}
        />
        <NavbarItem
          text={routes.milestones.name}
          icon={<MilestonesIcon />}
          path={routes.milestones.path}
        />
      </List>
    </Drawer>
  );
}
