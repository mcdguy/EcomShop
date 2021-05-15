//only created procfile and added start script in package.json
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const Order = require('./models/order');
const cors = require('cors');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGODB_URI,{useUnifiedTopology: true,useNewUrlParser:true,useFindAndModify: false})
    .then(()=>{
        app.listen(process.env.PORT || 5000);
    })
    .catch(err => console.log(err));


// mongoose.connect('mongodb://localhost/poc',{useUnifiedTopology: true,useNewUrlParser:true,useFindAndModify: false})
//     .then(()=>{
//         app.listen(process.env.PORT || 5000);
//     })
//     .catch(err => console.log(err));


app.use(express.json());
app.use(express.urlencoded({extended: true}));  
app.use(cookieParser());
app.use('/images',express.static('images'));

// app.use((req,res,next)=>{
//   const origin = req.headers.origin;
//   console.log(origin);
//   const allowedOrigins = ['http://127.0.0.1:8022', 'http://localhost:8020'];
//   if (allowedOrigins.includes(origin)) {
//        res.setHeader('Access-Control-Allow-Origin', origin);
//        res.header('Access-Control-Allow-Credentials', true);
//   }
//   res.header('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// })

//using * for cors will not let accept cookies thus auth will not work 
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    var whitelist = ['https://tender-swartz-02e579.netlify.app/']
    var corsOptions = {
      origin: (origin, callback) => {
          var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
          console.log('ORIGIN: ', origin);  // => undefined
          callback(originIsWhitelisted ? null : 'Bad Request', originIsWhitelisted)
      },
      credentials:true
    }
    app.use(cors(corsOptions));

}


app.use('/user',require('./routes/auth-route'));

app.use('/product',require('./routes/product-route'));
app.use('/blog',require('./routes/blog-route'));
app.use(require('./routes/payment-route'));
app.use('/coupon',require('./routes/coupon-route'));
app.use('/location',require('./routes/location-route'));
app.use('/order',require('./routes/order-route'))
app.use('/gallery',require('./routes/gallery-route'));
app.use('/admin',(require('./routes/admin-route')));
//for 404 error on refresh we will serve index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
 });


app.use((req,res)=>{
    res.json({error: 'page not found'});
})

