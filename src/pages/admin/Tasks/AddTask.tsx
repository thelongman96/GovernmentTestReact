import {
  Box,
  Typography,
  Container,
  Fade,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Dashboard, ExitToApp, AccountCircle } from "@mui/icons-material";
import TaskForm from "./components/TaskForm";
import useAddTask from "./hooks/useAddTask";
import LinkWrapper from "../../../components/common/LinkWrapper";

const AddCase = () => {
  const {
    user,
    anchorEl,
    handleMenuOpen,
    handleMenuClose,
    handleLogout,
    handleSaveClick,
    handleInputChange,
    formData,
    errors,
    loading,
    handleResetClick,
    goBack,
    disabled,
    statusOptions,
  } = useAddTask();

  return (
    <Fade in timeout={600}>
      <Box sx={{ flexGrow: 1, minHeight: "100vh", bgcolor: "#f5f5f5" }}>
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: "white",
            color: "text.primary",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <Toolbar>
            <Dashboard sx={{ mr: 2, color: "primary.main" }} />
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, color: "primary.main", fontWeight: "bold" }}
            >
              Add New Task
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Welcome, {user?.firstName} {user?.lastName}
              </Typography>
              <IconButton onClick={handleMenuOpen}>
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleLogout}>
                  <ExitToApp sx={{ mr: 1 }} />
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4, pb: 4 }}>
          <Box sx={{ mb: 3 }}>
            <LinkWrapper
              clickHandler={goBack}
              text="&larr; Back"
              styles={{ marginBottom: 2, display: "inline-block" }}
            />
            <Typography
              variant="h4"
              fontWeight="bold"
              color="text.primary"
              gutterBottom
            >
              New Task
            </Typography>
          </Box>
          <TaskForm
            handleSaveClick={handleSaveClick}
            handleInputChange={handleInputChange}
            formData={formData}
            loading={loading}
            errors={errors}
            handleResetClick={handleResetClick}
            disabled={disabled}
            statusOptions={statusOptions}
          />
        </Container>
      </Box>
    </Fade>
  );
};

export default AddCase;
