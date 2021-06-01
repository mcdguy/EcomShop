const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

const requireAuth = (req,res,next) =>{
    const token = req.cookies.jwt;
    logger.log('error',`token:, ${token}`);
    if(token){
        jwt.verify(token,process.env.AUTH_SECRET,(err,decodedToken)=>{
            if(err){
                console.log('token is not valid');
                res.json({error: 'user not logged in'});
            }
            else{
                // console.log(decodedToken);
                next();
            }
        })
    }
    else{
        res.json({error: 'user not logged in'});
    }
}

module.exports = requireAuth;