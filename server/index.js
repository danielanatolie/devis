const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const Coupling = require('./coupling/coupling');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/api/test', (req, res) => {
  // const name = req.query.name || 'World';
  const projectName = req.query.name || "project1";
  const couplingData = new Coupling(projectName).countAllDependencies();
  res.setHeader('Content-Type', 'application/json');
  // res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
  res.send(JSON.stringify(couplingData));
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);