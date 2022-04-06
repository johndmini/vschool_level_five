import React, { useState, useEffect } from 'react';
import Users from './component/usersTemplate';
import NewUser from './component/newUserForm';
import FunctionsBar from './component/functionsBar';
import { Box } from '@mui/material';
import axios from 'axios';

export default function App() {
  const [users, setUsers] = useState([]);
  const [filteredItems, setFilterItems] = useState('');

  const getUsers = () => {
    axios
      .get('/users')
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err.response.data.error));
  };

  const addNewUser = (newUser) => {
    axios
      .post('/users', newUser)
      .then((res) => {
        setUsers((prevState) => [...prevState, res.data]);
      })
      .catch((err) => console.log(err));
  };

  const deleteUser = (id) => {
    axios
      .delete(`/users/${id}`)
      .then((res) => {
        setUsers((prevState) => [
          ...prevState.filter((user) => user._id !== id),
        ]);
      })
      .catch((err) => console.log(err));
  };

  const editUser = (updatedUser, id) => {
    axios
      .put(`/users/${id}`, updatedUser)
      .then((res) => {
        setUsers((prevState) => [
          ...prevState.map((user) => (user._id === id ? res.data : user)),
        ]);
      })
      .catch((err) => console.log(err));
  };

  const filterItems = (e) => {
    setFilterItems(e.target.value);
    if (e.target.value === 'reset') {
      getUsers();
    } else {
      axios
        .get(`/users/search/type?type=${e.target.value}`)
        .then((res) => setUsers(res.data))
        .catch((err) => console.log(err.response.data.error));
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const userList = users.map((user) => (
    <Users
      key={user._id}
      {...user}
      deleteUser={deleteUser}
      editUser={editUser}
    />
  ));

  return (
    <Box>
      <NewUser submit={addNewUser} buttonText="Add Bounty" />
      <Box>
        <FunctionsBar handlefilter={filterItems} filterItems={filteredItems} />
      </Box>
      <Box>{userList}</Box>
    </Box>
  );
}
