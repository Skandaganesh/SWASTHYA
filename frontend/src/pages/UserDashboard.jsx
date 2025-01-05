import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper,Button } from '@mui/material';

const UserDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
const [loading]=useState(false);
  const userId = localStorage.getItem('userId'); // Get the userId from local storage

  // Fetch data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/user/${userId}/dashboard`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {
          setDashboardData(data);
          console.log(dashboardData);
        } else {
          alert('Error fetching dashboard data');
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, [userId]);

  // Function to handle the change in meal plan
const handleChangeMealPlan = async () => {

}

  // Show loading if data is not fetched
  if (!dashboardData) {
    return <Typography>Loading...</Typography>;
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
    </Box>
  );
};

export default UserDashboard;
