import React, { useState } from "react";
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

const pages = [
  { name: "Home", route: "/" },
  { name: "About Us", route: "/about" },
  { name: "Contact", route: "/contact" },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    window.location.reload();
  };

  const fetchUserProfile = async () => {
    const userId = localStorage.getItem("userId"); // Dynamically fetch userId from localStorage
    if (!userId) {
      console.error("User ID not found in localStorage.");
      return;
    }

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
                <span style={{ color: "red" }}>{userProfile.email}</span>
              </Typography>
            </Box>
          ) : (
            <Typography>Loading profile...</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProfile} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ResponsiveAppBar;
