const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
// const router = require('express').Router();
const path = require('path');
const db = require('../db/index.js');
const { restart } = require('nodemon');

const port = 3000;
const app = express ();
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(cors());

// app.use('/api', router);

app.use('/', express.static(path.join(__dirname, '../client/dist')))


app.get('/pokemon', (req, res) => {
  db.query('SELECT * FROM poke', (err, result) => {
    if (err) {
      res.status(400).send('Error fetching data')
    } else {
      res.status(200).send(result)
    }
  })
})

app.get('/pokemon/:type', (req, res) => {
  db.query(`SELECT * FROM poke WHERE pokeType='${req.params.type}';`, (err, result) => {
    if (err) {
      res.status(400).send('Error fetching type data')
    } else {
      res.status(200).send(result)
    }
  })
})

app.put('/pokemon/:id', (req, res) => {
  let pokeName = req.body.pokeName
  let id = req.params.id
  db.query(`UPDATE poke SET pokeName='${pokeName}' WHERE id=${req.params.id};`, (err, result) => {
    if (err) {
      res.status(400).send('Error in Update')
    } else {
      res.status(200).send('Update Complete')
    }
  })
})

app.delete('/pokemon/:id', (req, res) => {
  db.query(`DELETE FROM poke WHERE id=${req.params.id}`, (err, result) => {
    if(err) {
      res.status(400).send('Error Deleting')
    } else {
      res.status(200).send('Delete Successful')
    }
  })
})