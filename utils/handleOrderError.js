const handleOrderError = (order) =>{
    let orderError = '';
    if(order.buyer.name === ''){
        orderError = 'please enter name';
        return orderError
    }
    if(order.buyer.email === ''){
        orderError = 'please enter email';
        return orderError
    }
    if(order.buyer.contact === ''){
        orderError = 'please enter contact number';
        return orderError
    }
    if(order.billingAddress.addressLine === ''){
        orderError = 'please enter street'
        return orderError;
    }
    if(order.billingAddress.state === ''){
        orderError = 'please enter state'
        return orderError;
    }
    if(order.billingAddress.city === ''){
        orderError = 'please enter city'
        return orderError;
    }
    if(order.billingAddress.pin === ''){
        orderError = 'please enter pin'
        return orderError;
    }
    if(!order.isAddressSame){//if address ain't same validate shipping address as well
        if(order.shippingAddress.addressLine === ''){
            orderError = 'please enter street'
            return orderError;
        }
        if(order.shippingAddress.state === ''){
            orderError = 'please enter state'
            return orderError;
        }
        if(order.shippingAddress.city === ''){
            orderError = 'please enter city'
            return orderError;
        }
        if(order.shippingAddress.pin === ''){
            orderError = 'please enter pin'
            return orderError;
        }
    }
    return orderError;
}
module.exports.handleOrderError = handleOrderError;