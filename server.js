const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const logger = require('./utils/logger');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGODB_URI,{useUnifiedTopology: true,useNewUrlParser:true,useFindAndModify: false})
    .then(()=>{
        app.listen(process.env.PORT || 5000);
        logger.log('info',`connected to mongodb`);
    })
    .catch(err =>{
        logger.log('error',`connection failed:${err}`);
    });


app.use(express.json());
app.use(express.urlencoded({extended: true}));  
app.use('/images',express.static('images'));

// //using * for cors will not let accept cookies thus auth will not work 
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build')); 
    //only using this middleware is not enough i need to set withCredentials: true with every axios request for cookie to work
    //we need to pass origin and not * for cookies to work
    var whitelist = ['https://tender-swartz-02e579.netlify.app','https://goofy-liskov-da3de5.netlify.app']//pass domains you wanna whitelist
    var corsOptions = {
      origin: (origin, callback) => {
          var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
          console.log('ORIGIN: ', origin); 
          callback(originIsWhitelisted ? null : 'Bad Request', originIsWhitelisted)
      },
      credentials:true//for cookie parsing
    }
    app.use(cors(corsOptions));
}


    


app.use(cookieParser());

//logger for every incoming req
app.use((req,res,next)=>{
    logger.log('info',`path:${req.path}`);
    next();
})

app.use('/user',require('./routes/auth-route'));
app.use('/product',require('./routes/product-route'));
app.use(require('./routes/payment-route'));
app.use('/coupon',require('./routes/coupon-route'));
app.use('/location',require('./routes/location-route'));
app.use('/order',require('./routes/order-route'))
app.use('/gallery',require('./routes/gallery-route'));
app.use('/admin',(require('./routes/admin-route')));
app.use('/subscribe',require('./routes/subscriber-route'));

//for 404 error on refresh we will serve index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.use((req,res)=>{
    res.json({error: 'page not found'});
})

