import * as React from "react";
import Box from "@mui/material/Box";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Mainbar from "./components/common/Mainbar";
import Navbar, { DrawerHeader } from "./components/common/Navbar";
import Dashboard from "./views/dashboard/Dashboard";
import ErrorPage from "./views/error/ErrorPage";
import Todo from "./views/todo/Todo";
import LabelsView from "./views/labels/LabelsView";
import MilestonesView from "./views/milestones/Milestones";
import { routes } from "./utils/appUtils";

export default function App() {
  const [open, setOpen] = React.useState(false);

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Router>
      <Box>
        <Mainbar handleDrawerOpen={handleDrawer} open={open} />
        <Box sx={{ display: "flex" }}>
          <Navbar open={open} handleDrawerClose={handleDrawer} />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <Routes>
              <Route path={routes.dashboard.path} element={<Dashboard />} />
              <Route path={routes.todo.path} element={<Todo />} />
              <Route path={routes.labels.path} element={<LabelsView />} />
              <Route
                path={routes.milestones.path}
                element={<MilestonesView />}
              />
              <Route path={routes.error.path} element={<ErrorPage />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </Router>
  );
}
