import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import Divider from "@mui/material/Divider";
import SearchIcon from "@mui/icons-material/Search";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useSelector, useDispatch } from "react-redux";
import { addTask } from "../../../features/task/taskSlice.ts";
import { setFilter } from "../../../features/filter/filterSlice.ts";
import { RootState } from "../../../store.ts";
import { setSortBy } from "../../../features/sortBy/sortBySlice.ts";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#fcac64",
  "&:hover": {
    backgroundColor: "#fcbc7c",
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "15ch",
      "&:focus": {
        width: "40ch",
      },
    },
  },
}));

const NavBar: React.FC = ({}) => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "",
    deadline: "",
    responsible: "",
  });

  const handleFilterChange = (name: string, value: string) => {
    dispatch(setFilter({ name, value }));
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const validateForm = (data) => {
    return (
      data.title.trim() !== "" &&
      data.description.trim() !== "" &&
      data.priority.trim() !== "" &&
      data.deadline.trim() !== "" &&
      data.responsible.trim() !== ""
    );
  };

  const handleCreateTask = () => {
    const newTask = {
      title: "Nova Tarefa",
      description: "Descrição da nova tarefa",
      priority: "Alta",
      createdAt: Date.now(),
      deadline: Date.now(),
      responsible: "João",
      status: "Pendente",
    };
    dispatch(addTask(newTask));
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
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "#9C5E39" }} />
            </SearchIconWrapper>
            <StyledInputBase
              sx={{ color: "#693110" }}
              placeholder="Buscar tarefa..."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <Typography variant="h6" sx={{ mx: 2, my: 1 }}>
              Filtrar
            </Typography>
            <Box sx={{ px: 2 }}>
              <TextField
                select
                fullWidth
                label="Prioridade"
                value={filters.priority}
                onChange={(e) => handleFilterChange("priority", e.target.value)}
                sx={{ mb: 2 }}
              >
                <MenuItem value="">Todas</MenuItem>
                <MenuItem value="Baixa">Baixa</MenuItem>
                <MenuItem value="Média">Média</MenuItem>
                <MenuItem value="Alta">Alta</MenuItem>
              </TextField>
            </Box>
            <Box sx={{ px: 2 }}>
              <TextField
                select
                fullWidth
                label="Status"
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                sx={{ mb: 2 }}
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="Pendente">Pendente</MenuItem>
                <MenuItem value="Em Progresso">Em Progresso</MenuItem>
                <MenuItem value="Concluído">Concluído</MenuItem>
              </TextField>
            </Box>
            <Divider />
            <Typography variant="h6" sx={{ mx: 2, my: 1 }}>
              Ordenar
            </Typography>
            <Box sx={{ px: 2 }}>
              <TextField
                select
                fullWidth
                label="Data"
                value={filters.priority}
                onChange={(e) => dispatch(setSortBy(e.target.value))}
                sx={{ mb: 2 }}
              >
                <MenuItem value="recent">Criação mais recente</MenuItem>
                <MenuItem value="oldest">Criação mais antiga</MenuItem>
                <MenuItem value="nearDeadline">Prazo mais próximo</MenuItem>
                <MenuItem value="farDeadline">Prazo mais distante</MenuItem>
              </TextField>
            </Box>
            <Divider />
            <ListItemButton onClick={handleModalOpen}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Adicionar Tarefa" />
            </ListItemButton>
            <Divider />
            <ListItemButton>
              <ListItemIcon>
                <LeaderboardIcon />
              </ListItemIcon>
              <ListItemText primary="Gráficos" />
            </ListItemButton>
            <Divider />
          </List>
        </Box>
      </Drawer>

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
