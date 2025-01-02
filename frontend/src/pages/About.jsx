import React from "react";
import { Container, Typography, Box } from "@mui/material";

const About = () => {
  return (
    <Container
      sx={{
        padding: "40px",
        backgroundColor: "#34495e",
        borderRadius: "8px",
        boxShadow: 3,
        maxWidth: "600px",
        margin: "auto",
        mt: 5, // Adds spacing from the top
      }}
    >
      <Typography variant="h4" gutterBottom color="white">
        About Swasthya
      </Typography>
      <Typography variant="body1" color="white" paragraph>
        Swasthya is a platform dedicated to improving your health and
        well-being through innovative solutions. Our goal is to provide you
        with personalized guidance, resources, and support for a healthier life.
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" color="white">
          Our Mission:
        </Typography>
        <Typography variant="body2" color="white" paragraph>
          We aim to provide users with comprehensive tools and information
          related to health, fitness, and nutrition, focusing on personalized
          plans and holistic wellness approaches.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
