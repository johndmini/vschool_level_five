import React, { useState } from 'react';
import NewUser from './newUserForm';
import { Box, Typography, Button } from '@mui/material';

export default function Users(props) {
  const { name, age, bounty, type, living, _id } = props;
  const [editToggle, setEditToggle] = useState(false);

  return (
    <Box sx={{ m: '20px' }}>
      {!editToggle ? (
        <Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {name}
            </Typography>
            <Typography variant="subtitle1">Age: {age}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1">Bounty: $ {bounty}</Typography>
            <Typography>
              Allegiance: {type === 'sith' ? 'Sith' : 'Jedi'}
            </Typography>
          </Box>
          <Box>
            <Typography>
              Status(Dead/Alive): {living ? 'Alive' : 'Dead'}
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={() => setEditToggle((prevState) => !prevState)}
          >
            Edit
          </Button>
          <Button
            sx={{
              backgroundColor: 'red',
            }}
            variant="contained"
            onClick={() => props.deleteUser(_id)}
          >
            Delete
          </Button>
        </Box>
      ) : (
        <Box sx={{ m: '20px' }}>
          <NewUser
            name={name}
            age={age}
            bounty={bounty}
            type={type}
            living={living}
            _id={_id}
            buttonText="Save Bounty"
            submit={props.editUser}
          />
          <Box>
            <Button
              variant="contained"
              onClick={() => setEditToggle((prevState) => !prevState)}
            >
              Close
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
