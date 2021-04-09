const handleAddressError = (addressLine,state,city,pin,contact) =>{
    let errors = {addressLine: '',state: '',city: '',pin: '',contact: ''};
    if(addressLine === ''){
        errors.addressLine = 'this field is required';
        return errors;
    }
    if(state === ''){
        errors.state = 'this field is required';
        return errors;
    }
    if(city === ''){
        errors.city = 'this field is required';
        return errors;
    }
    if(pin === ''){
        errors.pin = 'this field is required';
        return errors; 
    }
    if(contact === ''){
        errors.contact = 'this field is required';
        return errors;
    }
    if(contact.length !== 10){
        errors.contact = 'number not valid';
        return errors;
    }
    if(pin.length !== 6){
        errors.pin = 'pin must have 6 digits';
        return errors;
    }
    return errors;
}
module.exports.handleAddressError = handleAddressError;