import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { Task } from "../../../../models/task";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

interface GraphModalProps {
  open: boolean;
  onClose: () => void;
}

const GraphModal: React.FC<GraphModalProps> = ({ open, onClose }) => {
  const tasks = useSelector((state: RootState) => state.tasks);

  const [filterBy, setFilterBy] = useState<string>("status");

  const countTasksByParameter = (parameter: string) => {
    const counts: Record<string, number> = {};
    tasks.forEach((task: Task) => {
      const key = task[parameter as keyof Task] as string;
      counts[key] = (counts[key] || 0) + 1;
    });
    const customOrder =
      parameter === "status"
        ? ["Pendente", "Em progresso", "Concluída"]
        : ["Alta", "Média", "Baixa"];

    const sortedCounts = Object.fromEntries(
      customOrder
        .filter((key) => counts[key] !== undefined)
        .map((key) => [key, counts[key]])
    );

    return sortedCounts;
  };

  const filteredData = countTasksByParameter(filterBy);
  const labels = Object.keys(filteredData);
  const dataValues = Object.values(filteredData);

  const chartData = {
    labels,
    datasets: [
      {
        label: `Quantidade de tarefas por ${filterBy}`,
        data: dataValues,
        backgroundColor: ["#ffa3a3", "#fff7a3", "#bdffa3"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: {
            xs: 300,
            sm: 400,
            md: 600,
          },
          height: {
            xs: 400,
            sm: 450,
            md: 500,
          },
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Gráficos
        </Typography>

        <FormControl fullWidth sx={{ mb: 1 }}>
          <Typography sx={{ ml: 1 }}>Filtrar por:</Typography>
          <Select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
          >
            <MenuItem value="status">Status</MenuItem>
            <MenuItem value="priority">Prioridade</MenuItem>
          </Select>
        </FormControl>

        <Box>
          <Pie data={chartData} />
          <Bar data={chartData} />
        </Box>
      </Box>
    </Modal>
  );
};

export default GraphModal;
