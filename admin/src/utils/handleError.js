export const handleVideoError = (url) =>{
    const videoError = [];
    if(!url || url ===''){
        videoError.push("url is required");
    }
    return videoError;
}

//coupon error
export const handleCreateCouponError = (code,discount) =>{
    const couponError = []; 
    if(!code || code === ''){
        couponError.push('code is required');
    }
    if(!discount || discount.toString().length < 0){
        couponError.push('discount is required');
    }
    return couponError;
}

export const handleEditCouponError = (discount) =>{
    const couponError = []; 
    if(!discount || discount.toString().length < 0){
        couponError.push('discount is required');
    }
    return couponError;
}

//location error
export const handleLocationError = (state,address,pin,subLocation,timings,longitude,latitude) =>{
    const locationError = [];
    if(!state || state ===''){
        locationError.push('state is required');
    }
    if(!address || address ===''){
        locationError.push('address is required');
    }
    if(!pin || pin.toString().length === 0 ){
        locationError.push('pin is required');
    }
    if(!subLocation || subLocation===''){
        locationError.push('sub location is required');
    }
    if(!timings || timings === ''){
        locationError.push('timing is required');
    }
    if(!longitude || longitude.toString().length===0){
        locationError.push('longitude is required');
    }
    if(!latitude || latitude.toString().length===0){
        locationError.push('latitude is required');
    }
    return locationError;
}

//product error
export const handleProductError = (name,price,stock,productId,weight,description) =>{
    const productError = [];
    if(!name || name===''){
        productError.push('name is required');
    }
    if(!price || price.toString().length === 0){
        productError.push('price is required');
    }
    if(!stock || stock.toString().length === 0){
        productError.push('stock is required');
    }
    if(!weight || weight===''){
        productError.push('weight is required');
    }
    if(!productId || productId===''){
        productError.push('product id is required');
    }
    if(!description || description===''){
        productError.push('description is required');
    }
    return productError;
}

//admin error
export const handleAdminError = (name,email,role,password) =>{
    const adminError = [];
    if(!name || name === ''){
        adminError.push('name is required');
    }
    if(!email || email === ''){
        adminError.push('email is required');   
    }
    if(!password || password === ''){
        adminError.push('password is required');
    }
    if(!role || role === ''){
        adminError.push('role is required');
    }
    if(password.length < 6){
        adminError.push('password must be atleast 6 characters');
    }
    if(!(role === 'admin' || role === 'read admin' || role === 'edit admin')){
        adminError.push('invalid admin type');  
    }
    return adminError;
}