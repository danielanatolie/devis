const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const app = express();
const fileDebt = require('./debt.js')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/api/test', async (req, res) => {
  const name = req.query.name || 'World';
  const test = await fileDebt.buildFileToDebtMap();
  console.log("YOOO: ", test);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!`, fileToDebtMap: test }));
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);