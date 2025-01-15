import React from "react";
import { useTaskService } from "../../../services/taskService.ts";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";

interface NavBarDrawerProps {
  drawerOpen: boolean;
  toggleDrawer: (open: boolean) => () => void;
  handleModalOpen: () => void;
}

const NavBarDrawer: React.FC<NavBarDrawerProps> = ({
  drawerOpen,
  toggleDrawer,
  handleModalOpen,
}) => {
  const { filters, sortBy, handleFilterChange, handleSortChange } =
    useTaskService();

  return (
    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={toggleDrawer(false)}
      data-testid="nav-bar-drawer"
    >
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
              value={filters?.priority || ""}
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
              value={filters?.status || ""}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              sx={{ mb: 2 }}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="Pendente">Pendente</MenuItem>
              <MenuItem value="Em progresso">Em Progresso</MenuItem>
              <MenuItem value="Concluída">Concluída</MenuItem>
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
              value={sortBy?.sortBy || ""}
              onChange={(e) => handleSortChange(e.target.value)}
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
  );
};

export default NavBarDrawer;
