// create BMI component
import { Alert, Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React from "react";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { Box } from "@mui/system";

const filter = createFilterOptions();

const PreferencesAllergies = ({ state, setState }) => {
  // console.log(state)
  const allergies = state.allergies// ["dairy", "gluten", "peanut", "soy", "tree nut", "wheat"];
  const preferences = state.preferences;
  const handleAllergiesChange = (event, newValue) => {
    setState({ ...state, allergies: newValue });
  };

  const handlePreferencesChange = (event, newValue) => {
    setState({ ...state, preferences: newValue });
  };


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: "0.6rem",

      }
      }

    >
      <h1>Preferences - Allergies</h1>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Mode</InputLabel>

        <Select value={state.mode} onChange={(e) => setState({ ...state, mode: e.target.value })}
          label="Mode"
          sx={{ width: "100%" }}

          
        >
          <MenuItem value="Vegetarian">Vegetarian</MenuItem>
          <MenuItem value="Keto">Keto</MenuItem>
          <MenuItem value="Vegan">Vegan</MenuItem>
          <MenuItem value="Paleo">Paleo</MenuItem>
          <MenuItem value="Mediterranean">Mediterranean</MenuItem>
        </Select>
      </FormControl>


      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Health Goals</InputLabel>
        <Select value={state.loseOrGain} onChange={(e) => setState({ ...state, loseOrGain: e.target.value })}
          label="Lose or Gain"
        >
          <MenuItem value="Weight Loss">Weight Loss</MenuItem>
          <MenuItem value="Muscle Gain">Muscle Gain</MenuItem>
          <MenuItem value="Overall Fitness">Overall Fitness</MenuItem>
          <MenuItem value="Weight loss, muscle gain (combined goal)">Weight loss, muscle gain (combined goal)</MenuItem>
          <MenuItem value="Skin Health">Skin Health</MenuItem>
          <MenuItem value="maintain">Maintain</MenuItem>
          <MenuItem value="Fat Loss">Fat Loss</MenuItem>
          <MenuItem value="Mental Clarity">Mental Clarity</MenuItem>
          <MenuItem value="Cholesterol Reduction">Cholesterol Reduction</MenuItem>
          <MenuItem value="Weight Management">Weight Management</MenuItem>
          <MenuItem value="Heart Health">Heart Health</MenuItem>
          

          





        </Select>
      </FormControl>
      <br />
      <br />







      <Autocomplete
        multiple
        id="preferences-standard"
        value={preferences}
        options={preferences}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys


        filterSelectedOptions
        onChange={handlePreferencesChange}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some(
            (option) => inputValue === option.title
          );
          if (inputValue !== "" && !isExisting) {
            filtered.push({
              inputValue,
              title: `Add "${inputValue}"`,
            });
            // filtered.push(inputValue);
          }

          return filtered;
        }}
        getOptionLabel={(option) => {
          // console.log("OPTION11111: ", option);
          // return option;
          // Value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.title;
        }}
        renderInput={(params) => (
          <>
            <TextField
              {...params}
              variant="standard"
              label="Preferences"
              placeholder="Preferences"
              helperText="Tip: Click on the preferences to add or remove them"
            />
          </>
        )}
      />

      <Autocomplete
        multiple
        id="tags-standard"
        options={allergies}
        value={allergies}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        filterSelectedOptions
        onChange={handleAllergiesChange}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some(
            (option) => inputValue === option.title
          );
          if (inputValue !== "" && !isExisting) {
            filtered.push({
              inputValue,
              title: `Add "${inputValue}"`,
            });
            // filtered.push(inputValue);
          }

          return filtered;
        }}
        getOptionLabel={(option) => {
          // console.log("OPTION11111: ", option);
          // return option;
          // Value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.title;
        }}
        renderInput={(params) => (
          <>
            <TextField
              {...params}
              variant="standard"
              label="Allergies"
              placeholder="Allergies"
              helperText="Tip: Click on the allergies to add or remove them"
            />
          </>
        )}
      />
      <Alert severity="info">
        <strong>Tip:</strong> Click on the preferences or allergies to add or
        remove them
      </Alert>
    </Box>
  );
};
export default PreferencesAllergies;
