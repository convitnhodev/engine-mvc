require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');
const templateEngine = require("./20488.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use('/', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
