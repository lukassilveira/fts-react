import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import MenuItem from "@mui/material/MenuItem";

interface NavBarDrawerProps {
  drawerOpen: boolean;
  toggleDrawer: (open: boolean) => () => void;
  filters: any;
  handleFilterChange: (name: string, value: string) => void;
  handleModalOpen: () => void;
  handleSortChange: (value: string) => void;
}

const NavBarDrawer: React.FC<NavBarDrawerProps> = ({
  drawerOpen,
  toggleDrawer,
  filters,
  handleFilterChange,
  handleModalOpen,
  handleSortChange,
}) => {
  return (
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
              value={filters.priority}
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