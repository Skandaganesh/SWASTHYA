import React,{ useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import './darktheme.css';
import AdminDashboard from './pages/AdminDashboard';
import BMI from "./pages/BMI";
import PreferencesAllergies from "./pages/PreferencesAllergies";
import MealPlan from "./pages/MealPlan";
import Loading from "./pages/Loading";

import AppBar from "./pages/AppBar";
import { Routes, Route } from "react-router-dom"; // Added for routing
import { generateMeal } from "./api/models";
import About from "./pages/About";  // New import for About
import Contact from "./pages/Contact";  // New import for Contact
import UserDashboard from "./pages/UserDashboard";
function App() {
  const steps = ["Get BMI", "Food Preferences & Allergies"];
  const [activeStep, setActiveStep] = React.useState(0);
  const [formState, setFormState] = React.useState({
    age: 0,
    height: 0,
    weight: 0,
    gender: "",
    mode: "",
    loseOrGain: "",
    allergies: [],
    preferences: [],
  });

  const [mealPlan, setMealPlan] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  // State for user authentication
  const [email, setEmail] = React.useState(""); // Using email instead of userId
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState(""); // Added name for signup
  const [age, setAge] = React.useState(0); // Added age for signup
  const [dietaryPreferences, setDietaryPreferences] = React.useState(""); // Added dietary preferences for signup
  const [healthGoals, setHealthGoals] = React.useState(""); // Added health goals for signup
  const [allergyInfo, setAllergyInfo] = React.useState(""); // Added allergy info for signup
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isSignup, setIsSignup] = React.useState(false); // State to toggle between signup and login
  const [mealPlans, setMealPlans] = React.useState([]); // Use React for useState

  const handleNext = () => setActiveStep(activeStep + 1);
  const handleBack = () => setActiveStep(activeStep - 1);

  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: { main: "#cc2c2c" },
      secondary: { main: "#a32f2d" },
      error: { main: "#cc2c2c" },
      background: { default: "#121212" },
      text: { primary: "#ffffff" },
    },
  });

  function getStepContent(step) {
    switch (step) {
      case 0: return <BMI state={formState} setState={setFormState} />;
      case 1: return <PreferencesAllergies state={formState} setState={setFormState} />;
      default: throw new Error("Unknown step");
    }
  }

  const [dashboardData, setDashboardData] = useState(null);  // State to hold the data
  // State to manage loading state
  const [error, setError] = useState(null);  // State to manage error handling
 

    // const fetchDashboardData = async () => {
    //     const userId = localStorage.getItem('userId');
        
    //     try {
    //      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/${userId}/dashboard`, {
    //        method: 'GET',
    //        headers: {
    //          'Content-Type': 'application/json',
    //        },
    //      });
 
    //      const data = await response.json();
 
    //      if (response.ok) {
    //        setDashboardData(data);
    //        console.log(dashboardData);
    //      } else {
    //        alert('Error fetching dashboard data');
    //      }
    //    } catch (error) {
    //      console.error('Error fetching dashboard data:', error);
    //    }
    //  };

    
    const handleChangeMealPlan = async () => {
      setLoading(true);
      const userId = localStorage.getItem('userId');
      
      try {
        // Fetch dashboard data first
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/${userId}/dashboard`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        const data = await response.json();
    
        if (response.ok) {
          // Set the dashboard data after successful fetch
          setDashboardData(data);
          console.log(data);  // Debugging log to confirm the data structure
        } else {
          alert('Error fetching dashboard data');
        }
        
        // Proceed only if the dashboard data is valid
        if (data || data.healthGoals|| data.dietaryMode) {
          const healthGoals = data.healthGoals;
          const dietaryMode = data.dietaryMode;
          console.log(userId, healthGoals, dietaryMode);
    
          // Make the second API call to fetch meal plans
          const mealPlanResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/meal-plans/fetch`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: userId,
              healthGoals: healthGoals,
              dietaryMode: dietaryMode,
            }),
          });
    console.log('jj');
          const mealPlanData = await mealPlanResponse.json();
    
          if (mealPlanResponse.ok) {
            setMealPlans(mealPlanData.mealPlans);
          } else {
            console.error('Error fetching meal plans:', mealPlanData.message);
          }
        } else {
          console.error("Missing required data (health goals or dietary mode).");
        }
    
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
  // Signup handler
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,                // User's name
          age,                 // User's age
          dietary_preferences: dietaryPreferences, // User's dietary preferences
          health_goals: healthGoals,        // User's health goals
          allergy_info: allergyInfo,        // User's allergy information
          password,            // User's password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);  // Success message
        setIsSignup(false); // Switch to login form after signup
      } else {
        alert(data.message || 'Signup failed');  // Error message
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Error during signup');
    }
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }) // Make sure to include credentials (cookies)
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);  // Success message
        setIsLoggedIn(true);
        localStorage.setItem('userId', data.userId);
        // Set user as logged in
        
      } else {
        alert(data.message || 'Login failed');  // Error message
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Error during login');
    }
  };

  return (
    <ThemeProvider theme={theme}>
       <AppBar /><Routes>
     
        {/* About and Contact pages won't have AppBar */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        {/* Default route renders AppBar */}
        <Route
          path="*"
          element={
            <>
              
              <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
                <Loading loading={loading} />

                {/* Welcome note and tagline */}
{!isLoggedIn && (
  <Box sx={{ textAlign: 'center', mt: 4 }}>
    <Typography variant="h4" color='red' gutterBottom>
      WELCOME TO SWASTHYA
    </Typography>
    <Typography variant="subtitle1" color="textSecondary">
      Your Trusted Partner in Health and Wellness
    </Typography>
  </Box>
)}

                {/* Display login/signup form when not logged in */}
                {!isLoggedIn && (
                  <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, textAlign: 'center', borderColor: 'white', borderWidth: '2px', borderStyle: 'solid' }}>
                    <Typography variant="h5" gutterBottom>{isSignup ? "Signup" : "Login"}</Typography>
                    <form onSubmit={isSignup ? handleSignup : handleLogin}>
                      <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {isSignup && (
                        <>
                          <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          <TextField
                            label="Age"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                          />
                          <TextField
                            label="Dietary Preferences"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={dietaryPreferences}
                            onChange={(e) => setDietaryPreferences(e.target.value)}
                          />
                          <TextField
                            label="Health Goals"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={healthGoals}
                            onChange={(e) => setHealthGoals(e.target.value)}
                          />
                          <TextField
                            label="Allergy Information"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={allergyInfo}
                            onChange={(e) => setAllergyInfo(e.target.value)}
                          />
                        </>
                      )}
                      <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Button type="submit" variant="contained" color={isSignup ? "primary" : "secondary"}>
                        {isSignup ? "Signup" : "Login"}
                      </Button>
                    </form>

                    <Typography variant="body1" sx={{ mt: 2 }}>
                      {isSignup ? "Already have an account?" : "Don't have an account?"}
                      <Button onClick={() => setIsSignup(!isSignup)} sx={{ ml: 1 }}>
                        {isSignup ? "Login" : "Signup"}
                      </Button>
                    </Typography>
                  </Paper>
                )}

{isLoggedIn && (localStorage.getItem('userId')==1) && (<AdminDashboard />)}
{isLoggedIn && !loading && (localStorage.getItem('userId')!=1) && (<UserDashboard />)}

{isLoggedIn && (localStorage.getItem('userId')!=1)&& (<Box sx={{ padding: 4 }}>
        <Paper sx={{ padding: 3, marginBottom: 4 }}>
          <Typography variant="h5" sx={{ color: 'text.primary' }}>
            Generate Your Meal Plan
          </Typography>
          
      
          <Button
            onClick={handleChangeMealPlan} // Button triggers handleChangeMealPlan
            sx={{
              backgroundColor: 'red',
              color: 'white',
              padding: '6px 12px',
              marginLeft: 2,
              textTransform: 'none',
            }}
            disabled={loading}
            
            
          >
            Generate
          </Button>
        </Paper>
        </Box>
      )}

{isLoggedIn && mealPlans.length > 0 && (
  <Box sx={{ marginTop: 4 }}>
    {mealPlans.map((plan, index) => (
      <Paper
        key={plan.plan_id}
        sx={{
          padding: 3,
          marginBottom: 4,
          border: '2px solid white',
          borderRadius: 2,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'background.paper',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: 'text.primary',
            fontWeight: 'bold',
            marginBottom: 2,
          }}
        >
          Plan {index + 1}: <span style={{ color: 'red' }}>{plan.goal_type}</span>
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.primary', marginBottom: 1 }}>
          <strong>Start Date:</strong>{' '}
          <span style={{ color: 'red' }}>{new Date(plan.start_date).toLocaleDateString()}</span>
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.primary', marginBottom: 1 }}>
          <strong>End Date:</strong>{' '}
          <span style={{ color: 'red' }}>{new Date(plan.end_date).toLocaleDateString()}</span>
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.primary', marginBottom: 1 }}>
          <strong>Total Calories:</strong>{' '}
          <span style={{ color: 'red' }}>{plan.total_calories}</span>
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.primary', marginBottom: 1 }}>
          <strong>Recipes:</strong>
          <ul style={{ marginLeft: 20, marginTop: 5 }}>
            {plan.recipes.map((recipe) => (
              <li key={recipe.recipe_id} style={{ lineHeight: 1.6, color: 'red' }}>
                {recipe.recipe_name}
              </li>
            ))}
          </ul>
        </Typography>
      </Paper>
    ))}
  </Box>
)}


    
                {/* Display meal plan steps if logged in */}
                {isLoggedIn && 0&& activeStep < steps.length && (
                  <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, borderColor: 'white', borderWidth: '1px', borderStyle: 'solid' }}>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                      {steps.map((label) => (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                    {getStepContent(activeStep)}
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Button variant="contained" onClick={handleBack} disabled={activeStep === 0} sx={{ mt: 3, ml: 1 }}>
                        Back
                      </Button>
                      <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                        Next
                      </Button>
                      <Button variant="contained" onClick={async () => {
                setLoading(true);
                const height = formState.height / 100;
                const BMI = formState.weight / (height * height);

                try {
                  const preferences = formState.preferences.map((obj) => obj.inputValue).join(", ");
                  const allergies = formState.allergies.map((obj) => obj.inputValue).join(", ");

                  const result = await generateMeal({
                    BMI,
                    gender: formState.gender,
                    preferences,
                    allergies,
                    goal: formState.loseOrGain,
                  });

                  setMealPlan(result.data.choices[0].message.content);
                  handleNext();
                } catch (e) {
                  console.log(e);
                } finally {
                  setLoading(false);
                }
              }} sx={{ mt: 3, ml: 1 }} disabled={activeStep < steps.length - 1}>SUBMIT</Button>
            </Box>
          </Paper>
                )}

                {/* Display meal plan if already available */}
                {isLoggedIn && activeStep === steps.length && (
                  <MealPlan mealPlan={mealPlan} />
                )}

                
              </Container>
            </>
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
