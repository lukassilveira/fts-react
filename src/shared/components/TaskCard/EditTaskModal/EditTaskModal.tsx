import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Task } from "../../../../models/task.ts";

interface EditTaskModalProps {
  open: boolean;
  taskData: Task;
  onClose: () => void;
  handleEdit: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  open,
  onClose,
  taskData,
  handleInputChange,
  handleEdit,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
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
          Editar Tarefa
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
          label="Responsável"
          name="responsible"
          value={taskData.responsible}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Prazo"
          name="deadline"
          type="date"
          value={new Date(taskData.deadline).toISOString().split("T")[0]}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleEdit}
          fullWidth
        >
          Cadastrar
        </Button>
      </Box>
    </Modal>
  );
};

export default EditTaskModal;
