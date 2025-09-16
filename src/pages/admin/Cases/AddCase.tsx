import {
  Box,
  Paper,
  TextField,
  Menu,
  Container,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Avatar,
  Autocomplete,
  Switch,
  FormControlLabel,
  Divider,
  Card,
  CardContent,
  Toolbar,
  AppBar,
  IconButton,
  Fade,
} from "@mui/material";
import { Dashboard, ExitToApp, AccountCircle } from "@mui/icons-material";
import CaseForm from "./components/CaseForm";
import useAddCase from "./hooks/useAddCase";
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
    navToDashboard,
    disabled,
  } = useAddCase();

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
              Add New Case
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
          <Grid item xs={12} lg={8}>
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Box sx={{ mb: 3 }}>
                <LinkWrapper
                  clickHandler={navToDashboard}
                  text="&larr; Back"
                  styles={{ marginBottom: 2, display: "inline-block" }}
                />
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  color="text.primary"
                  gutterBottom
                >
                  New Case
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}
              >
                <CaseForm
                  handleSaveClick={handleSaveClick}
                  handleInputChange={handleInputChange}
                  formData={formData}
                  loading={loading}
                  errors={errors}
                  handleResetClick={handleResetClick}
                  disabled={disabled}
                />
              </Box>
            </Paper>
          </Grid>
        </Container>
      </Box>
    </Fade>
  );
};

export default AddCase;
