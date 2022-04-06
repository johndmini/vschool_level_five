const express = require('express');
const app = express();

app.use(express.json());


app.use("/inventory", require("./routes/inventoryRoutes"));

app.listen(9000, () => {
  console.log('listening on port 9000');
});
