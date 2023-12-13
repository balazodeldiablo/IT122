'use strict';
import express from 'express';
import { Car } from './models/Car.js';

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.listen(app.get('port'), () => {
  console.log('Express started'); 
});

app.get('/', (req, res, next) => {
  Car.find({}).lean()
    .then((cars) => {
      res.render('home', { cars });
    })
    .catch(err => next(err))
});


app.get('/cars', (req,res,next) => {
  Car.findOne({ id:req.query.id }).lean()
      .then((car) => {
        res.render('detail', { car });
      })
      .catch(err => next(err));
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
