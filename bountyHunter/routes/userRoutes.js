const express = require('express');
const userRouter = express.Router();
const User = require('../models/users');
// const uuid = require('uuid');

// Get All
userRouter.get('/', (req, res, next) => {
  User.find((err, users) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(users);
  });
});

// Get One
userRouter.get('/:userId', (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId, (err, user) => {
    if (!userId) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(user);
  });
})

// Post One
userRouter.post('/', (req, res, next) => {
  const newUser = new User(req.body);
  newUser.save((err, user) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(201).send(user);
  });
});

// Delete One
userRouter.delete('/:userId', (req, res) => {
  User.findByIdAndDelete({ _id: req.params.userId }, (err, user) => {
    if (!req.params.userId) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(`Successfully deleted ${user.name}`);
  });
});

// Update One
userRouter.put('/:userId', (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    req.body,
    { new: true },
    (err, user) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(200).send(user);
    }
  );
});

// Get by query
userRouter.get('/search/type', (req, res, next) => {
  User.find({ type: req.query.type }, (err, users) => {
    if (!req.query.type) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(users);
  });

})

// const users = [
//   {
//     _id: uuid.v4(),
//     name: 'John',
//     age: 30,
//     living: true,
//     bounty: 1000000,
//     type: 'sith',
//   },
//   {
//     _id: uuid.v4(),
//     name: 'Jane',
//     age: 20,
//     living: true,
//     bounty: 10,
//     type: 'jedi',
//   },
//   {
//     _id: uuid.v4(),
//     name: 'Jack',
//     age: 40,
//     living: true,
//     bounty: 100,
//     type: 'sith',
//   },
//   {
//     _id: uuid.v4(),
//     name: 'Jill',
//     age: 50,
//     living: true,
//     bounty: 1,
//     type: 'jedi',
//   },
//   {
//     _id: uuid.v4(),
//     name: 'Jenny',
//     age: 60,
//     living: true,
//     bounty: 5,
//     type: 'jedi',
//   },
// ];

// userRouter.delete('/:userId', (req, res) => {
//   const userId = req.params.userId;
//   const targetUserIndex = users.findIndex((user) => user._id === userId);
//   const targetType = users[targetUserIndex].type;
//   users.splice(targetUserIndex, 1);
//   res.status(200).send(`Successfully Hunted ${targetType.toUpperCase()}`);
// });

// userRouter.put('/:userId', (req, res) => {
//   const userId = req.params.userId;
//   const targetUserIndex = users.findIndex((user) => user._id === userId);
//   const updatedUser = Object.assign(users[targetUserIndex], req.body);
//   res.status(201).send(updatedUser);
// });

// userRouter.get('/search/type', (req, res, next) => {
//   const type = req.query.type;
//   if (!type) {
//     const error = new Error(`Please provide a type`);
//     res.status(500);
//     return next(error);
//   }
//   const filteredType = users.filter((user) => user.type === type);
//   res.status(200).send(filteredType);
// });

// userRouter.get('/:userId', (req, res, next) => {
//   const userId = req.params.userId;
//   const targetUser = users.find((user) => user._id === userId);
//   if (!targetUser) {
//     const error = new Error(`User ${userId} not found`);
//     res.status(500);
//     return next(error);
//   }
//   res.status(200).send(targetUser);
// });

// userRouter
// .route('/')
// .get((req, res) => {
//   res.status(200).send(users);
// })
// .post((req, res) => {
//   const newUser = req.body;
//   newUser._id = uuid.v4();
//   users.push(newUser);
//   res.status(201).send(newUser);
// });

module.exports = userRouter;
