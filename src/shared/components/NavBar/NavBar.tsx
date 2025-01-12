import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import { addTask } from "../../../features/task/taskSlice.ts";
import NavBarDrawer from "./NavBarDrawer.tsx";
import TaskModal from "./NavBarModal.tsx";

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
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
        handleModalOpen={handleModalOpen}
      />

      <TaskModal
        open={modalOpen}
        onClose={handleModalClose}
        onSave={handleCreateTask}
      />
    </Box>
  );
};

export default NavBar;
