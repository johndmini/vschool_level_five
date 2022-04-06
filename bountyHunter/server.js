const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(morgan('dev'));

mongoose.connect('mongodb://localhost:27017/users', console.log('Connected to Database'));

app.use('/users', require('./routes/userRoutes'));
app.use('/admins', require('./routes/adminRoutes'));

app.use('/pickedoff', (req, res, next) => {
  console.log('Picked Off Middleware is live');
  next();
});

app.use('/pickedoff', (req, res, next) => {
  req.body = {
    name: 'Joshua',
  };
  next();
});

app.get('/pickedoff', (req, res, next) => {
  console.log('Picked Up Middleware');
  res.send(req.body);
});

app.use((err, req, res, next) => {
  console.log(err);
  return res.send({ error: err.message });
});

app.listen(9000, () => {
  console.log('Express server listening on port 9000');
});
