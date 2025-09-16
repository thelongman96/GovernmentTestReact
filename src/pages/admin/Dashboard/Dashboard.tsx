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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";
import { Dashboard, ExitToApp, AccountCircle } from "@mui/icons-material";
import useDashboard from "./hooks/useDashboard";
import LinkWrapper from "@/components/common/LinkWrapper";
import CustomButton from "@/components/common/CustomButton";

const DashboardPage = () => {
  const {
    user,
    anchorEl,
    handleMenuOpen,
    handleMenuClose,
    handleLogout,
    cases,
    navToViewCase,
    navToEditCase,
    addNewCase,
    deleteCaseFunc,
  } = useDashboard();

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
              Dashboard
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
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  color="text.primary"
                  gutterBottom
                >
                  Case Management
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Manage your cases
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              color="text.primary"
              gutterBottom
            >
              Your Cases
            </Typography>
            <div style={{ width: "200px" }}>
              <CustomButton
                variant="contained"
                onClickFunc={addNewCase}
                buttonText="Add New Case"
                isLoading={false}
                disabled={false}
              />
            </div>
          </Box>
          <TableContainer
            component={Paper}
            sx={{ borderRadius: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: "#f8f9fa" }}>
                  <TableCell sx={{ fontWeight: "bold", color: "text.primary" }}>
                    Case Reference
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "text.primary" }}>
                    Title
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "text.primary" }}>
                    Description
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "text.primary" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cases.length > 0 &&
                  cases.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&:hover": { bgcolor: "#f8f9fa" },
                        transition: "background-color 0.2s",
                      }}
                    >
                      <TableCell>{row.referenceNumber}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          {row.title}
                        </Box>
                      </TableCell>
                      <TableCell color="text.secondary">
                        {row.description}
                      </TableCell>
                      <TableCell>
                        <LinkWrapper
                          clickHandler={() => navToViewCase(row.id)}
                          text="View"
                        />
                        &nbsp;|&nbsp;
                        <LinkWrapper
                          clickHandler={() => navToEditCase(row.id)}
                          text="Edit"
                        />
                        &nbsp;|&nbsp;
                        <LinkWrapper
                          clickHandler={() => deleteCaseFunc(row.id)}
                          text="Delete"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </Fade>
  );
};

export default DashboardPage;
