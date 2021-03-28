//only created procfile and added start script in package.json
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
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

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
}


app.use('/user',require('./routes/auth-route'));


app.use('/product',require('./routes/product-route'));
app.use('/blog',require('./routes/blog-route'));



// app.get('*', function (req, res) { // This wildcard method handles all requests

//     Router.run(routes, req.path, function (Handler, state) {
//         var element = React.createElement(Handler);
//         var html = React.renderToString(element);
//         res.render('main', { content: html });
//     });
// });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
 });


app.use((req,res)=>{
    res.json({error: 'page not found'});
})

