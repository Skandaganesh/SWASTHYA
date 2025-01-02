import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";

const Contact = () => {
  return (
    <Container
      sx={{
        padding: "40px",
        backgroundColor: "#2c3e50",
        borderRadius: "8px",
        boxShadow: 3,
        maxWidth: "600px",
        margin: "auto",
        mt: 5, // Adds spacing from the top
      }}
    >
      <Typography variant="h4" gutterBottom color="white">
        Contact Us
      </Typography>
      <Typography variant="body1" color="white" paragraph>
        If you have any questions, feel free to reach out to us at{" "}
        <a href="mailto:contact@swasthya.com" style={{ color: "#ff6347" }}>
          contact@swasthya.com
        </a>
        .
      </Typography>
      <Box>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#ff6347",
            color: "white",
            "&:hover": {
              backgroundColor: "#d9534f",
            },
          }}
        >
          Send Email
        </Button>
      </Box>
    </Container>
  );
};

export default Contact;
