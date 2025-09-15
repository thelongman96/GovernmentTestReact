import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
  IconButton,
  Paper,
  Grid,
  Snackbar,
  Alert,
  CircularProgress,
  Backdrop,
  Tooltip,
  Badge,
  Button,
} from "@mui/material";
import {
  Add as AddIcon,
  DragIndicator as DragIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";

const KanbanBoard = () => {
  const [columns, setColumns] = useState({
    todo: {
      id: "todo",
      title: "To Do",
      color: "#f5f5f5",
      headerColor: "#9e9e9e",
      tasks: [
        {
          id: "1",
          title: "Design new landing page",
          description: "Create wireframes and mockups for the new homepage",
          assignee: "John Doe",
          priority: "high",
          dueDate: "2025-09-20",
        },
        {
          id: "2",
          title: "Set up authentication",
          description: "Implement user login and registration system",
          assignee: "Jane Smith",
          priority: "medium",
          dueDate: "2025-09-25",
        },
      ],
    },
    "in-progress": {
      id: "in-progress",
      title: "In Progress",
      color: "#e3f2fd",
      headerColor: "#2196f3",
      tasks: [
        {
          id: "3",
          title: "API integration",
          description: "Connect frontend with backend services",
          assignee: "Mike Johnson",
          priority: "high",
          dueDate: "2025-09-18",
        },
      ],
    },
    review: {
      id: "review",
      title: "Review",
      color: "#fff3e0",
      headerColor: "#ff9800",
      tasks: [
        {
          id: "4",
          title: "Code review for payment module",
          description: "Review and test payment processing functionality",
          assignee: "Sarah Wilson",
          priority: "medium",
          dueDate: "2025-09-22",
        },
      ],
    },
    done: {
      id: "done",
      title: "Done",
      color: "#e8f5e8",
      headerColor: "#4caf50",
      tasks: [
        {
          id: "5",
          title: "Database setup",
          description: "Configure PostgreSQL database and migrations",
          assignee: "Tom Brown",
          priority: "low",
          dueDate: "2025-09-15",
        },
      ],
    },
  });

  const [draggedTask, setDraggedTask] = useState(null);
  const [draggedFrom, setDraggedFrom] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  // Simulate API call
  const updateTaskStatus = async (taskId, newStatus, oldStatus) => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // This is where you'd make your actual API call
      console.log("API Call:", {
        taskId,
        newStatus,
        oldStatus,
        timestamp: new Date().toISOString(),
      });

      // You would replace this with your actual API call:
      // const response = await fetch('/api/tasks/update', {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ taskId, status: newStatus })
      // });

      setNotification({
        open: true,
        message: "Task status updated successfully!",
        severity: "success",
      });

      return { success: true };
    } catch (error) {
      console.error("Failed to update task:", error);
      setNotification({
        open: true,
        message: "Failed to update task status. Please try again.",
        severity: "error",
      });
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragStart = (e, task, columnId) => {
    setDraggedTask(task);
    setDraggedFrom(columnId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e, targetColumnId) => {
    e.preventDefault();

    if (!draggedTask || !draggedFrom || draggedFrom === targetColumnId) {
      setDraggedTask(null);
      setDraggedFrom(null);
      return;
    }

    const newColumns = { ...columns };

    // Remove task from source column
    newColumns[draggedFrom].tasks = newColumns[draggedFrom].tasks.filter(
      (task) => task.id !== draggedTask.id
    );

    // Add task to target column
    newColumns[targetColumnId].tasks.push(draggedTask);

    // Update state optimistically
    setColumns(newColumns);

    // Make API call
    const result = await updateTaskStatus(
      draggedTask.id,
      targetColumnId,
      draggedFrom
    );

    if (!result.success) {
      // Rollback on failure
      const rollbackColumns = { ...columns };
      setColumns(rollbackColumns);
    }

    setDraggedTask(null);
    setDraggedFrom(null);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "default";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const isOverdue = (dateString) => {
    return new Date(dateString) < new Date();
  };

  const addNewTask = (columnId) => {
    const newTask = {
      id: Date.now().toString(),
      title: "New Task",
      description: "Click to edit description",
      assignee: "Unassigned",
      priority: "medium",
      dueDate: new Date().toISOString().split("T")[0],
    };

    const newColumns = { ...columns };
    newColumns[columnId].tasks.push(newTask);
    setColumns(newColumns);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fafafa", p: 3 }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <CircularProgress color="inherit" />
          <Typography>Updating task...</Typography>
        </Box>
      </Backdrop>

      <Box sx={{ maxWidth: 1400, mx: "auto" }}>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            fontWeight="bold"
          >
            Project Kanban Board
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Drag and drop tasks between columns to update their status
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {Object.values(columns).map((column) => (
            <Grid item xs={12} sm={6} lg={3} key={column.id}>
              <Paper
                elevation={2}
                sx={{
                  bgcolor: column.color,
                  minHeight: 400,
                  borderRadius: 2,
                  overflow: "hidden",
                }}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                <Box
                  sx={{
                    bgcolor: column.headerColor,
                    color: "white",
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {column.title}
                    </Typography>
                    <Badge
                      badgeContent={column.tasks.length}
                      color="secondary"
                      sx={{
                        "& .MuiBadge-badge": {
                          bgcolor: "rgba(255,255,255,0.8)",
                          color: column.headerColor,
                          fontWeight: "bold",
                        },
                      }}
                    />
                  </Box>
                  <Tooltip title="Add new task">
                    <IconButton
                      onClick={() => addNewTask(column.id)}
                      sx={{ color: "white" }}
                      size="small"
                    >
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Box sx={{ p: 2 }}>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    {column.tasks.map((task) => (
                      <Card
                        key={task.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task, column.id)}
                        sx={{
                          cursor: "grab",
                          "&:active": { cursor: "grabbing" },
                          "&:hover": {
                            boxShadow: 3,
                            transform: "translateY(-2px)",
                          },
                          transition: "all 0.2s ease-in-out",
                          borderLeft: `4px solid ${column.headerColor}`,
                        }}
                        elevation={1}
                      >
                        <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              justifyContent: "space-between",
                              mb: 1,
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              fontWeight="bold"
                              sx={{ flexGrow: 1 }}
                            >
                              {task.title}
                            </Typography>
                            <DragIcon sx={{ color: "text.secondary", ml: 1 }} />
                          </Box>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 2 }}
                          >
                            {task.description}
                          </Typography>

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              mb: 1,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <Avatar
                                sx={{ width: 20, height: 20, fontSize: 10 }}
                              >
                                {getInitials(task.assignee)}
                              </Avatar>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {task.assignee}
                              </Typography>
                            </Box>
                            <Chip
                              label={task.priority}
                              color={getPriorityColor(task.priority)}
                              size="small"
                              variant="outlined"
                            />
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                              }}
                            >
                              <CalendarIcon
                                sx={{ fontSize: 14, color: "text.secondary" }}
                              />
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {formatDate(task.dueDate)}
                              </Typography>
                            </Box>
                            {isOverdue(task.dueDate) && (
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 0.5,
                                }}
                              >
                                <WarningIcon
                                  sx={{ fontSize: 14, color: "error.main" }}
                                />
                                <Typography
                                  variant="caption"
                                  color="error.main"
                                >
                                  Overdue
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        </CardContent>
                      </Card>
                    ))}

                    {column.tasks.length === 0 && (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          py: 4,
                          textAlign: "center",
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          gutterBottom
                        >
                          No tasks yet
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Drag tasks here or click + to add
                        </Typography>
                        <Button
                          variant="outlined"
                          startIcon={<AddIcon />}
                          onClick={() => addNewTask(column.id)}
                          sx={{ mt: 2 }}
                          size="small"
                        >
                          Add Task
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default KanbanBoard;
