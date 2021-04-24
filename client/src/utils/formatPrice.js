export const formatPrice = (number) =>{
    const newNumber = Intl.NumberFormat('en-IN',{
        style: 'currency',
        currency: 'INR'
    }).format(number/100).replace(/\.00$/,'');
    console.log(typeof(newNumber));
    return newNumber;
}