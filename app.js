const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');


//connect to database
mongoose.connect(config.database);

//on connection
mongoose.connection.on('connected', ()=>{
  console.log('connected to database'+config.database);
});

mongoose.connection.on('error', (err)=>{
  console.log('database error'+err);
});


const app = express();
const users = require('./routes/users');

//port number
const port = 3000;

//ocors middlware
app.use(cors());


//set static folder
app.use(express.static(path.join(__dirname, 'public')));



//body parser middleware
app.use(bodyParser.json());

app.use('/users', users);

//index route
app.get('/', (req, res)=> {
  res.send('invalid endpoint');
});


//start server
app.listen(port, () => {
  console.log('server started on port '+ port);

});
