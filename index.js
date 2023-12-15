'use strict';
import express from 'express';
import { Car } from './models/Car.js';
import cors from 'cors';


const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(express.json());
app.use('/api', cors());


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
  Car.findOne({ _id:req.query._id }).lean()
      .then((car) => {
        res.render('detail', { car });
      })
      .catch(err => next(err));
});


app.get('/api/cars', (req,res) => {
    Car.find({}).lean()
      .then((cars) => {
        res.json(cars);
      })
      .catch(err =>  {
        res.status(500).send('Database Error occurred');
      })
});


app.get('/api/cars/:_id', (req,res) => {
    Car.findOne({ _id:req.params._id }).lean()
        .then((cars) => {
           res.json(cars);
        })
        .catch(err => {
            res.status(500).send('Database Error occurred');
        });
});


app.get('/about', (req,res) => {
  res.type('text/html');
  res.sendFile('about.html', {root: './public/html'});
});


app.post('/api/add/', (req,res, next) => {

    if (!req.body._id) {
    // This method was chosen since a Mongoose model doesn't support "insertOne()" or "insert()" methods. I downgraded my Mongoose version to 6.10.0. so the syntax you provided in the video could work.  
      Car.create(
        {
          make: req.body.make, 
          model: req.body.model, 
          year: req.body.year, 
          engine: req.body.engine, 
          miles: req.body.miles
        }, (err, result) => {
          
          if (err) return next(err);
          res.json({added: 1, _id: result._id});
          
        });
      
    } else {
    
      Car.updateOne(
        {
          _id: req.body._id
        }, 
        
        {
          make: req.body.make, 
          model: req.body.model, 
          year: req.body.year, 
          engine: req.body.engine, 
          miles: req.body.miles, 
          id: req.body.id
        }, (err, result) => {
          
          if (err) return next(err);
          res.json({updated:result.modifiedCount, _id: req.body._id});
          
        });
      
    }
});

app.delete('/api/delete/:_id', (req,res, next) => {
  Car.deleteOne({_id: req.params._id}, (err, result) => {
    if (err) return next(err);
    console.log(result);
    res.json({deleted: result.deletedCount, _id: req.params._id});
  });
});

app.use((req,res) => {
 res.type('text/plain'); 
 res.status(404);
 res.send('404 - Not found');
});
