import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const pages = [
  { name: "Home", route: "/" },
  { name: "About Us", route: "/about" },
  { name: "Contact", route: "/contact" },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [newEmail, setNewEmail] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileLogout, setShowProfileLogout] = useState(false);
  useEffect(() => {
    // Function to check login status
    const checkLoginStatus = () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        setIsLoggedIn(true);
        setShowProfileLogout(true);
      } else {
        setIsLoggedIn(false);
        setShowProfileLogout(false);
      }
    };

    // Initial check
    checkLoginStatus();

    // Set interval to check login status every 3 seconds
    const interval = setInterval(checkLoginStatus, 3000); // 3000ms = 3 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId"); // Clear user ID from local storage
    setIsLoggedIn(false); // Update logged-in state
    window.location.reload();
    setShowProfileLogout(false);
  };

  const fetchUserProfile = async () => {
    const userId = localStorage.getItem("userId");
    

    try {
      const response = await fetch(`http://localhost:5001/api/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.ok) {
        setUserProfile(data);
      } else {
        console.error("Error fetching user profile:", data.message);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleOpenProfile = () => {
    setIsProfileOpen(true);
    fetchUserProfile();
  };

  const handleCloseProfile = () => {
    setIsProfileOpen(false);
  };

  const handleUpdateEmail = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID not found in localStorage.");
      return;
    }
  
    if (!newEmail) {
      setSnackbarMessage("Please provide a valid email.");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }
  
    try {
      const response = await fetch(
        `http://localhost:5001/api/users/${userId}/email`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: newEmail }),
        }
      );
      const data = await response.json();
  
      if (response.ok) {
        setSnackbarMessage(data.message || "Email updated successfully.");
        setSnackbarSeverity("success");
        setUserProfile(data.user);  // Update user profile after success
      } else {
        setSnackbarMessage(data.message || "Failed to update email.");
        setSnackbarSeverity("error");
      }
    } catch (error) {
      setSnackbarMessage("Error updating email.");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
    }
  };
  

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <MuiAppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "red",
                textDecoration: "none",
              }}
            >
              SWASTHYA
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link
                        to={page.route}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {page.name}
                      </Link>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-end",
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page.name}
                  component={Link}
                  to={page.route}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            {isLoggedIn && (
              <>
                <Button
                  onClick={handleOpenProfile}
                  sx={{
                    color: "white",
                    backgroundColor: "blue",
                    "&:hover": {
                      backgroundColor: "#1e88e5",
                    },
                    marginRight: 2,
                  }}
                >
                  My Profile
                </Button>

                <Button
                  onClick={handleLogout}
                  sx={{
                    color: "white",
                    backgroundColor: "red",
                    "&:hover": {
                      backgroundColor: "#b71c1c",
                    },
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </Toolbar>
        </Container>
      </MuiAppBar>

      <Dialog
        open={isProfileOpen}
        onClose={handleCloseProfile}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>My Profile</DialogTitle>
        <DialogContent>
          {userProfile ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography>
                <strong>User ID:</strong>{" "}
                <span style={{ color: "red" }}>{userProfile.user_id}</span>
              </Typography>
              <Typography>
                <strong>Name:</strong>{" "}
                <span style={{ color: "red" }}>{userProfile.name}</span>
              </Typography>
              <Typography>
                <strong>Age:</strong>{" "}
                <span style={{ color: "red" }}>{userProfile.age}</span>
              </Typography>
              <Typography>
                <strong>Dietary Preferences:</strong>{" "}
                <span style={{ color: "red" }}>
                  {userProfile.dietary_preferences}
                </span>
              </Typography>
              <Typography>
                <strong>Health Goals:</strong>{" "}
                <span style={{ color: "red" }}>{userProfile.health_goals}</span>
              </Typography>
              <Typography>
                <strong>Allergy Info:</strong>{" "}
                <span style={{ color: "red" }}>{userProfile.allergy_info}</span>
              </Typography>
              <Typography>
                <strong>Email:</strong>{" "}
                <span style={{ color: "red" }}>{userProfile.email}</span>{" "}
                <TextField
                  size="small"
                  variant="outlined"
                  placeholder="Update Email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  sx={{ marginLeft: 2 }}
                />
                <Button
                  onClick={handleUpdateEmail}
                  sx={{
                    color: "white",
                    backgroundColor: "green",
                    "&:hover": { backgroundColor: "#388e3c" },
                    marginLeft: 1,
                  }}
                >
                  Update
                </Button>
              </Typography>
            </Box>
          ) : (
            <Typography>Loading user profile...</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProfile}>Close</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ResponsiveAppBar;
