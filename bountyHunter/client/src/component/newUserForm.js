import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Checkbox,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';

export default function NewUser(props) {
  const initialInput = {
    name: props.name || '',
    age: props.age || '',
    bounty: props.bounty || '',
    type: props.type || '',
    living: props.living || false,
  };
  const [newUserInput, setNewUserInput] = useState(initialInput);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUserInput((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleStatus = (e) => {
    setNewUserInput((prevState) => ({
      ...prevState,
      living: e.target.checked,
    }));
  };

  const handleType = (e) => {
    setNewUserInput((prevState) => ({
      ...prevState,
      type: e.target.value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.submit(newUserInput, props._id);
    setNewUserInput(initialInput);
  };

  return (
    <Box
      sx={{
        border: '2px solid gray',
        display: 'inline-block',
        padding: '20px',
      }}
    >
      <Box>
        <TextField
          id="name"
          label="Name"
          name="name"
          value={newUserInput.name}
          onChange={handleChange}
        />
        <TextField
          id="age"
          label="Age"
          name="age"
          value={newUserInput.age}
          onChange={handleChange}
        />
      </Box>
      <Box>
        <TextField
          id="bounty"
          label="Bounty Request"
          name="bounty"
          value={newUserInput.bounty}
          onChange={handleChange}
        />
        <FormControl sx={{ width: '194px' }}>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={newUserInput.type}
            label="Age"
            onChange={handleType}
          >
            <MenuItem value="jedi">Jedi</MenuItem>
            <MenuItem value="sith">Sith</MenuItem>
          </Select>
        </FormControl>
        <Box>
          <Box>
            <Typography>Status: Alive?</Typography>
            <Checkbox
              label="Status"
              checked={newUserInput.living}
              onChange={handleStatus}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Box>
          <Button variant="contained" onClick={handleSubmit}>
            {props.buttonText}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
