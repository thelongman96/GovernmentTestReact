import CustomTextInput from "@/components/common/CustomTextInput";
import useLoginForm from "./hooks/useLoginForm";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";

import { Person, Lock, Visibility, VisibilityOff } from "@mui/icons-material";

const LoginForm = () => {
  const {
    handleLoginClick,
    handleInputChange,
    formData,
    errors,
    loading,
    showPassword,
    setShowPassword,
    navToRegister,
  } = useLoginForm();

  return (
    <Box component="form" onSubmit={handleLoginClick}>
      <CustomTextInput
        fullWidth
        fieldId="username"
        fieldLabel="Username"
        fieldType="text"
        value={formData.username}
        onChange={handleInputChange("username")}
        errors={errors.username ? [errors.username] : []}
        helperText={errors.username}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: <Person sx={{ mr: 1, color: "text.secondary" }} />,
        }}
      />
      <CustomTextInput
        fieldId="password"
        fieldLabel="Password"
        fieldAutoComplete="current-password"
        value={formData.password}
        onChange={handleInputChange("password")}
        fieldType={showPassword ? "text" : "password"}
        errors={errors.password ? [errors.password] : []}
        helperText={errors.password}
        sx={{ mb: 3 }}
        customProps={{
          startAdornment: <Lock sx={{ mr: 1, color: "text.secondary" }} />,
          endAdornment: (
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          ),
        }}
        fullWidth
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={loading}
        sx={{
          mb: 3,
          py: 1.5,
          borderRadius: 2,
          textTransform: "none",
          fontSize: "1.1rem",
        }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
      </Button>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Don't have an account?{" "}
          <Button
            variant="text"
            onClick={navToRegister}
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            Sign Up
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;
