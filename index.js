const express = require('express');
const app = express();

let data = 'Initial data';
let waitingClients = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/get-data', (req, res) => {
  if(req.query.lastData !== data) {
    res.send({data});
  } 
  else waitingClients.push(res);
})

app.get('/update-data', (req, res) => {
  data = req.query.lastData;
  res.send({data});
  waitingClients.forEach(client => client.send({data}));
  waitingClients = [];
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});