const express = require('express');
const app = express();

app.use(express.json());

app.use('/todo', require('./routes/todoRoutes'));

app.listen(9000, () => {
  console.log('listening on port 9000');
});
