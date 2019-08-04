const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const morgan = require('morgan');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const apiKey = '3a56475ce23d3e7c1fb878ba4c170b4a';

app.use(morgan('dev'));

app.get('/', (req, res, next) => {
  res.render('index', {weather: null, error: null});
});

app.post('/', (req, res, next) => {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  request(url, (err, response, body) => {
    if(err){
      res.render(index, {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body);
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      }else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });  
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
