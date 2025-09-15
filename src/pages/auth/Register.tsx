import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Avatar,
  Fade,
} from "@mui/material";
import { Person } from "@mui/icons-material";
import RegisterForm from "@/pages/auth/components/register/registerForm";

const Register = () => {
  return (
    <Fade in={true} timeout={600}>
      <Container
        maxWidth="sm"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          py: 4,
        }}
      >
        <Card
          sx={{
            width: "100%",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            borderRadius: 3,
            backdropFilter: "blur(10px)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Avatar
                sx={{
                  mx: "auto",
                  mb: 2,
                  bgcolor: "secondary.main",
                  width: 60,
                  height: 60,
                }}
              >
                <Person sx={{ fontSize: 30 }} />
              </Avatar>
              <Typography
                variant="h4"
                component="h1"
                fontWeight="bold"
                color="primary"
              >
                Create Account
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                Join us and get started
              </Typography>
            </Box>
            <RegisterForm />
          </CardContent>
        </Card>
      </Container>
    </Fade>
  );
};

export default Register;
