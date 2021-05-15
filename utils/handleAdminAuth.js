const {isEmail} = require('validator');
const handleAdminAuth = (email,password,role,name) =>{
    const errors = {email: '',password: '',role:'',name:''};
    if(!email){
        errors.email = 'field not provided';
        return errors;
    }
    if( !password){
        errors.password = 'field not provided';
        return errors;
    }
    if(!role){
        errors.role = 'field not provided';
        return errors;
    }
    if(!name){
        errors.name = 'field not provided';
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
    if(!(role === 'admin' || role === 'read admin' || role === 'edit admin')){
        errors.role = 'invalid admin type';
        return errors;   
    }
    return errors;
}
module.exports = {
    handleAdminAuth: handleAdminAuth
}