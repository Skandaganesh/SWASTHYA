import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';

const UserDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false); // Set loading state
  const userId = localStorage.getItem('userId'); // Get the userId from local storage

  // Fetch data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true); // Start loading before fetching data
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/${userId}/dashboard`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {
          setDashboardData(data); // Update the dashboard data
          console.log(data); // Log the data to check the structure
        } else {
          alert('Error fetching dashboard data');
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    if (userId) {
      fetchDashboardData();
    } else {
      console.error('User ID not found in local storage');
    }
  }, [userId]);

  // Show loading if data is not fetched yet
  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  // Show dashboard content when data is available
  if (!dashboardData) {
    return <Typography>No dashboard data available.</Typography>;
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Paper sx={{ padding: 3, marginBottom: 4 }}>
        <Typography variant="h4">Welcome, <span style={{ color: 'red' }}>{dashboardData.name}</span>!</Typography>
        <Typography variant="h6" sx={{ color: 'text.primary' }}>Age: <span style={{ color: 'red' }}>{dashboardData.age}</span></Typography>
        <Typography variant="h6" sx={{ color: 'text.primary' }}>Health Goals: <span style={{ color: 'red' }}>{dashboardData.healthGoals}</span></Typography>
      </Paper>

      <Paper sx={{ padding: 3, marginBottom: 4 }}>
        <Typography variant="h5" sx={{ color: 'text.primary' }}>Progress</Typography>
        <Typography variant="body1" sx={{ color: 'text.primary' }}>Calories: <span style={{ color: 'red' }}>{dashboardData.totalCalories}</span></Typography>
      </Paper>

      {/* Add functionality for meal plan change */}
      
    </Box>
  );
};

export default UserDashboard;
