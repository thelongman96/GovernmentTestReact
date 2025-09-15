import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import {
  Person,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import useRegisterForm from "./hooks/useRegisterForm";
import CustomTextInput from "@/components/common/CustomTextInput";

const RegisterForm = () => {
  const {
    handleRegisterClick,
    handleInputChange,
    formData,
    errors,
    loading,
    showPassword,
    setShowPassword,
    navToLogin,
  } = useRegisterForm();

  return (
    <Box component="form" onSubmit={handleRegisterClick}>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <CustomTextInput
          fullWidth
          fieldId="firstName"
          fieldLabel="First Name"
          fieldType="text"
          value={formData.firstName}
          onChange={handleInputChange("firstName")}
          errors={errors.firstName ? [errors.firstName] : []}
          helperText={errors.firstName}
        />
        <CustomTextInput
          fullWidth
          fieldId="lastName"
          fieldLabel="Last Name"
          fieldType="text"
          value={formData.lastName}
          onChange={handleInputChange("lastName")}
          errors={errors.lastName ? [errors.lastName] : []}
          helperText={errors.lastName}
        />
      </Box>
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
        fullWidth
        fieldId="Email Address"
        fieldLabel="Email Address"
        fieldType="email"
        value={formData.email}
        onChange={handleInputChange("email")}
        errors={errors.email ? [errors.email] : []}
        helperText={errors.email}
        sx={{ mb: 3 }}
        customProps={{
          startAdornment: <Email sx={{ mr: 1, color: "text.secondary" }} />,
        }}
      />
      <CustomTextInput
        fullWidth
        fieldId="Password"
        fieldLabel="Password"
        fieldType={showPassword ? "text" : "password"}
        value={formData.password}
        onChange={handleInputChange("password")}
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
      />
      <CustomTextInput
        fullWidth
        fieldId="Confirm Password"
        fieldLabel="Confirm Password"
        fieldType="password"
        value={formData.confirmPassword}
        onChange={handleInputChange("confirmPassword")}
        errors={errors.confirmPassword ? [errors.confirmPassword] : []}
        helperText={errors.confirmPassword}
        sx={{ mb: 3 }}
        customProps={{
          startAdornment: <Lock sx={{ mr: 1, color: "text.secondary" }} />,
        }}
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
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Create Account"
        )}
      </Button>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Already have an account?{" "}
          <Button
            variant="text"
            onClick={navToLogin}
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            Sign In
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterForm;
