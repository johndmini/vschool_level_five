const express = require('express');
const adminRouter = express.Router();
const uuid = require('uuid');

const admins = [
  {
    _id: uuid.v4(),
    name: 'Mark',
    age: 30,
  },
  {
    _id: uuid.v4(),
    name: 'Michelle',
    age: 20,
  },
  {
    _id: uuid.v4(),
    name: 'Michael',
    age: 40,
  },
  {
    _id: uuid.v4(),
    name: 'Marvin',
    age: 50,
  },
  {
    _id: uuid.v4(),
    name: 'Melody',
    age: 60,
  },
];

adminRouter.get('/:adminId', (req, res) => {
  const adminId = req.params.adminId;
  const targetAdmin = admins.find((admin) => admin._id === adminId);
  res.send(targetAdmin);
});

adminRouter
  .route('/')
  .get((req, res) => {
    res.send(admins);
  })
  .post((req, res) => {
    const newAdmin = req.body;
    newAdmin._id = uuid.v4();
    admins.push(newAdmin);
    res.send(newAdmin);
  });

module.exports = adminRouter;
