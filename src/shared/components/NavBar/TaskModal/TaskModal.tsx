import React, { useState } from "react";
import { CreateTaskModalData } from "../../../../models/task";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (taskData: CreateTaskModalData) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ open, onClose, onSave }) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [taskData, setTaskData] = useState<CreateTaskModalData>({
    title: "",
    description: "",
    priority: "",
    deadline: 0,
    responsible: "",
    createdAt: Date.now(),
    status: "Pendente",
  });

  const validateForm = (data: CreateTaskModalData) => {
    return (
      data.title.trim() !== "" &&
      data.description.trim() !== "" &&
      data.priority.trim() !== "" &&
      data.deadline !== 0 &&
      data.responsible.trim() !== ""
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTaskData((prev) => {
      const updatedData = { ...prev, [name]: value };
      setIsFormValid(validateForm(updatedData));
      return updatedData;
    });
  };

  const handleSave = () => {
    onSave(taskData);
    onClose();
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
            md: 500,
          },
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
          onClick={handleSave}
          fullWidth
          disabled={!isFormValid}
        >
          Criar Tarefa
        </Button>
      </Box>
    </Modal>
  );
};

export default TaskModal;
