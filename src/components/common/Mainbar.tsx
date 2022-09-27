import {
  Typography,
  IconButton,
  Toolbar,
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
} from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import { drawerWidth, routes } from "../../utils/appUtils";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
interface IMainbar {
  open: boolean;
  handleDrawerOpen: () => void;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Mainbar = ({ handleDrawerOpen, open }: IMainbar) => {
  const { pathname } = useLocation();

  function getHeader() {
    const location = pathname.substring(1);
    let result = "TODOer";
    Object.keys(routes).forEach((x) => {
      if (location === "") result = routes.dashboard.name;
      if (x === location) result = routes[x].name;
    });
    return result;
  }
  getHeader();

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          {getHeader()}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Mainbar;
