import LoginForm from "./components/login/LoginForm";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Avatar,
  Fade,
} from "@mui/material";

import { Lock } from "@mui/icons-material";

const Login = () => {
  return (
    <Fade in timeout={600}>
      <Container
        maxWidth="md"
        sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
      >
        <Card
          sx={{
            width: "100%",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            borderRadius: 3,
            backdropFilter: "blur(10px)",
            maxWidth: 400,
            mx: "auto",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Avatar
                sx={{
                  mx: "auto",
                  mb: 2,
                  bgcolor: "primary.main",
                  width: 60,
                  height: 60,
                }}
              >
                <Lock sx={{ fontSize: 30 }} />
              </Avatar>
              <Typography
                variant="h4"
                component="h1"
                fontWeight="bold"
                color="primary"
              >
                Welcome Back
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                Sign in to your account
              </Typography>
            </Box>
            <LoginForm />
          </CardContent>
        </Card>
      </Container>
    </Fade>
  );
};

export default Login;
