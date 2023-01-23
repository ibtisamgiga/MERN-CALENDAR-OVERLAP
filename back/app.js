const express = require('express');
const mongoose = require('mongoose');
const authRoutes=require('./routes/authRoutes')
const allEvent=require('./routes/alldayRoutes')
const eventRoutes=require('./routes/eventRoutes')
const cors=require('cors')
const app = express();



// middleware
app.use(express.static('public'));

// view engine


app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())



// database connection
//const dbURI = 'mongodb+srv://calendar:Abcd@mycluster.gunmmxp.mongodb.net/calendar';
mongoose.connect(process.env.DBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {app.listen(5000)
    console.log('port',process.env.PORT)
    console.log('db connected')
  
  })
  .catch((err) => console.log(err));

  app.use(authRoutes)
  app.use('/allevents',allEvent)
  app.use('/events',eventRoutes)
  
