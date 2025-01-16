import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Menu from "@mui/material/Menu";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { CardContent } from "@mui/material";
import { Task } from "../../../models/task";
import { orange } from "@mui/material/colors";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditTaskModal from "./EditTaskModal/EditTaskModal.tsx";
import { updateTask, deleteTask } from "../../../features/task/taskSlice.ts";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [taskData, setTaskData] = useState({
    id: task.id,
    title: task.title,
    description: task.description,
    priority: task.priority,
    deadline: task.deadline,
    responsible: task.responsible,
    status: task.status,
    createdAt: task.createdAt,
  });

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleModalOpen = () => {
    setTaskData({
      id: task.id,
      title: task.title,
      description: task.description,
      priority: task.priority,
      deadline: task.deadline,
      responsible: task.responsible,
      status: task.status,
      createdAt: task.createdAt,
    });
    setModalOpen(true);
    handleMenuClose();
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleEdit = () => {
    const updatedTask = {
      ...taskData,
      id: task.id,
    };

    dispatch(updateTask(updatedTask));
    handleModalClose();
  };

  const handleDelete = () => {
    dispatch(deleteTask(taskData.id.toFixed()));
    handleMenuClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card
      sx={{
        minWidth: 300,
        maxWidth: 300,
        height: 300,
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
        backgroundColor:
          task.priority.toLowerCase() === "alta"
            ? "#ffa3a3"
            : task.priority.toLowerCase() === "média"
            ? "#fff7a3"
            : "#bdffa3",
      }}
      variant="outlined"
    >
      <Box>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: orange[500] }} aria-label="recipe">
              {task.responsible.charAt(0)}
            </Avatar>
          }
          action={
            <>
              <IconButton aria-label="settings" onClick={handleMenuOpen}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={handleModalOpen}>Editar</MenuItem>
                <MenuItem onClick={handleDelete}>Excluir</MenuItem>
              </Menu>
            </>
          }
          title={
            <Typography
              sx={{
                width: 180,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {task.title}
            </Typography>
          }
          subheader={
            <Typography sx={{ fontSize: "12px" }}>
              Prazo: {new Date(task.deadline).toLocaleDateString("pt-BR")}{" "}
              <br />
              Responsável: {task.responsible}
            </Typography>
          }
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        />
        <CardContent sx={{ paddingTop: 0 }}>
          <Typography
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              WebkitLineClamp: 5,
              textOverflow: "ellipsis",
            }}
          >
            {task.description}
          </Typography>
        </CardContent>
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: 12,
            textAlign: "right",
            paddingRight: "16px",
            paddingBottom: "10px",
            fontWeight: 500,
          }}
        >
          Prioridade: {task.priority} <br />
          Status: {task.status} <br />
          Data de criação:{" "}
          {new Date(task.createdAt).toLocaleDateString("pt-BR")}
        </Typography>
      </Box>

      <EditTaskModal
        open={modalOpen}
        onClose={handleModalClose}
        taskData={taskData}
        handleInputChange={handleInputChange}
        handleEdit={handleEdit}
      />
    </Card>
  );
};

export default TaskCard;
