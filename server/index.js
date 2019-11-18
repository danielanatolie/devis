const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const Coupling = require('./coupling/coupling');

const app = express();
const fileDebt = require('./debt.js')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/api/test', async (req, res) => {
  const projectName = req.query.name || "project1";
  const couplingData = new Coupling(projectName).countAllDependencies();
  const fileToDebtMap = await fileDebt.buildFileToDebtMap();
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ fileToDebtMap, couplingData }));
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);