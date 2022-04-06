const express = require('express');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());
app.use(morgan('dev'));

mongoose.connect('mongodb://localhost:27017/db-methods', console.log('Connected to Database'));

app.use('/books', require('./routes/bookRouter.js'));
app.use('/author', require('./routes/authorRouter.js'));

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Something went wrong');
})

app.listen(9000, () => {
  console.log('Express server listening on port 9000');
});
