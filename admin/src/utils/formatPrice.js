export const formatPrice = (number) =>{
    const newNumber = Intl.NumberFormat('en-IN',{
        style: 'currency',
        currency: 'INR'
    }).format(number/100).replace(/\.00$/,'');
    return newNumber;
}