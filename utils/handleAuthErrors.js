const {isEmail} = require('validator');


//all authentication is handled here except unique email which
//will be handled in the catch block
const handleAuthErrors = (email,password,username) =>{
    const errors = {email: '',password: '',username:''};
    if(username===''){
        errors.username = 'please enter a username';
        return errors;
    }
    if(email===''){
        errors.email = 'please enter an email';
        return errors;
    }
    if(password === ''){
        errors.password = 'please enter a password';
        return errors;
    }
    if(!isEmail(email)){
        errors.email = 'please enter a valid email';
        return errors;
    }
    if(password.length < 6){
        errors.password = 'password too short';
        return errors;
    }
    return errors;
}
module.exports.handleAuthErrors = handleAuthErrors;
