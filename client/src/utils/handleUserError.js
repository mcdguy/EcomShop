export const handleUserError = (user,setUserError) =>{
    if(user.name === ''){
        setUserError(userError=>{return{...userError,name:'this field is required'}});
        return false;
    }
    if(user.email === ''){
        setUserError(userError=>{return{...userError,email:'this field is required'}});
        return false;
    }
    return true;
}
//return true if there is no error