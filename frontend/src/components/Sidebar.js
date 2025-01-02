// Sidebar.js
import React from "react";
import { Drawer, Button, Box } from "@mui/material";

function Sidebar({ isLoggedIn, onLogout }) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#333",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        {isLoggedIn ? (
          <Button variant="contained" onClick={onLogout} color="secondary">
            Logout
          </Button>
        ) : (
          <Box>
            <Button variant="contained" fullWidth color="primary">
              Login
            </Button>
            <Button variant="contained" fullWidth color="secondary" sx={{ mt: 2 }}>
              Signup
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}

export default Sidebar;
