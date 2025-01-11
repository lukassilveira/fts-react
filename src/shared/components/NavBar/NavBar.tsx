import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useSelector, useDispatch } from "react-redux";
import { addTask } from "../../../features/task/taskSlice.ts";
import { setFilter } from "../../../features/filter/filterSlice.ts";
import { RootState } from "../../../store.ts";
import { setSortBy } from "../../../features/sortBy/sortBySlice.ts";
import NavBarDrawer from "./NavBarDrawer.tsx";

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "",
    deadline: 0,
    responsible: "",
    createdAt: Date.now(),
    status: "Pendente",
  });

  const handleFilterChange = (name: string, value: string) => {
    dispatch(setFilter({ name, value }));
  };

  const handleSortChange = (value: string) => {
    dispatch(setSortBy(value));
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const validateForm = (data) => {
    return (
      data.title.trim() !== "" &&
      data.description.trim() !== "" &&
      data.priority.trim() !== "" &&
      data.deadline !== 0 &&
      data.responsible.trim() !== ""
    );
  };

  const handleCreateTask = () => {
    dispatch(addTask(taskData));
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTaskData((prev) => {
      const data = { ...prev, [name]: value };
      setIsFormValid(validateForm(data));
      return data;
    });
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
        filters={filters}
        handleFilterChange={handleFilterChange}
        handleModalOpen={handleModalOpen}
        handleSortChange={handleSortChange}
      />

      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Nova Tarefa
          </Typography>
          <TextField
            fullWidth
            label="Título"
            name="title"
            value={taskData.title}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Descrição"
            name="description"
            multiline
            rows={4}
            value={taskData.description}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            select
            label="Prioridade"
            name="priority"
            value={taskData.priority}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          >
            <MenuItem value="Baixa">Baixa</MenuItem>
            <MenuItem value="Média">Média</MenuItem>
            <MenuItem value="Alta">Alta</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Prazo"
            name="deadline"
            type="date"
            value={taskData.deadline}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Responsável"
            name="responsible"
            value={taskData.responsible}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateTask}
            fullWidth
            disabled={!isFormValid}
          >
            Criar Tarefa
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default NavBar;
