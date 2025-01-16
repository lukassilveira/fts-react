import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TaskModal from "./TaskModal/TaskModal.tsx";
import NavBarDrawer from "./Drawer/NavBarDrawer.tsx";
import { addTask } from "../../../features/task/taskSlice.ts";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import GraphModal from "./GraphModal/GraphModal.tsx";

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [graphModalOpen, setGraphModalOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleTaskModalOpen = () => {
    setTaskModalOpen(true);
  };

  const handleTaskModalClose = () => {
    setTaskModalOpen(false);
  };

  const handleGraphModalOpen = () => {
    setGraphModalOpen(true);
  };

  const handleGraphModalClose = () => {
    setGraphModalOpen(false);
  };

  const handleCreateTask = (taskData: any) => {
    dispatch(addTask(taskData));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#ff6600" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            FTS - Lukas Silveira
          </Typography>
        </Toolbar>
      </AppBar>

      <NavBarDrawer
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        handleTaskModalOpen={handleTaskModalOpen}
        handleGraphModalOpen={handleGraphModalOpen}
      />

      <TaskModal
        open={taskModalOpen}
        onClose={handleTaskModalClose}
        onSave={handleCreateTask}
      />

      <GraphModal open={graphModalOpen} onClose={handleGraphModalClose} />
    </Box>
  );
};

export default NavBar;
