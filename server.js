//only created procfile and added start script in package.json
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGODB_URI,{useUnifiedTopology: true,useNewUrlParser:true,useFindAndModify: false})
    .then(()=>{
        console.log(process.env.PORT || 4000);
        app.listen(process.env.PORT || 4000);
    })
    .catch(err => console.log(err));


// mongoose.connect('mongodb://localhost/poc',{useUnifiedTopology: true,useNewUrlParser:true,useFindAndModify: false})
//     .then(()=>{
//         app.listen(process.env.PORT || 5000);
//     })
//     .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({extended: true}));  

app.use('/images',express.static('images'));

if(process.env.NODE_ENV === 'production'){
    
}

app.use(express.static('client/build'));
    app.get('*',function(req,res){
        res.sendFile(path.join(__dirname,'client/build','index.html'));
    })

app.use('/product',require('./routes/product-route'));
app.use('/blog',require('./routes/blog-route'));

app.use((req,res)=>{
    res.json({error: 'page not found'});
})

