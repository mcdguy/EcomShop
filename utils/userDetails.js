const jwt = require('jsonwebtoken');

const checkUser = (token) =>{
    // const token = req.cookies.jwt;
    let id = null
    if(token){
        jwt.verify(token,process.env.AUTH_SECRET,(err,decodedToken)=>{
            if(err){
                console.log('token is not valid');
                return null;
            }
            else{
                 id = decodedToken.id;
                 //dunno why but returning id here was giving undefined so i created a variable
            }
        })
    }
    else{
        return null;
    }
    return id;
}

module.exports.checkUser = checkUser;