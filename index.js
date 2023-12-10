'use strict';
import express from 'express';
import * as data from './lib/data.js';

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static("public"));
app.set('view engine', 'ejs');


app.listen(app.get('port'), () => {
  console.log('Express started'); 
});

app.get('/', (req,res) => {
  res.render('home', { cars: data.getAll() });
});

app.get('/cars/:id', (req,res) => {
  res.render('detail', { cars: data.getItem(req.params.id) });
});

app.get('/about', (req,res) => {
  res.type('text/html');
  res.sendFile('about.html', {root: './public/html'});
});

app.use((req,res) => {
 res.type('text/plain'); 
 res.status(404);
 res.send('404 - Not found');
});
