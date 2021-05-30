const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');


const adminAuth = (roles) =>{//because i wanted this middleware to accept parameters
    return function(req,res,next){
        const token = req.cookies.jwt;
        if(token){
            jwt.verify(token,process.env.AD_SEC,(err,decodedToken)=>{
                if(err){
                    console.log('token is not valid');
                    res.json({error: 'access denied'});
                }
                else{
                    const {id} = decodedToken;
                    let found = false;
                    //we are here - person is admin but his role is unknown 
                    if(roles[0] === 'all'){
                        next();
                        return;
                    }
                    Admin.findById(id)
                        .then(result=>{
                            for(let i=0;i<roles.length;i++){
                                if(roles[i]===result.role){
                                    found = true;
                                    break;
                                }
                            }
                            if(found){
                                console.log('found');
                                next();
                            }else{
                                return res.json({error: 'access denied'});
                            }
                        })
                        .catch(err =>{
                            res.json({error: 'an error occurred'});
                        })
                }
            })
        }
        else{
            res.json({error: 'access denied'});
        }
    }
}
module.exports = adminAuth;