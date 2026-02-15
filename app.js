const express = require('express')
const router = express.Router();
require('dotenv').config()
const app = express();
const port = process.env.PORT;

app.use('/', require('./routes/index'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})