import React,{useState,useContext} from 'react';

const FilterContext = React.createContext();

export const FilterProvider = ({children}) =>{
    const [userFilter,setUserFilter] = useState('username');
    const [userQuery,setUserQuery] = useState('');
    const [orderFilter,setOrderFilter] = useState('orderId');
    const [orderQuery,setOrderQuery] = useState('');
    const [productFilter,setProductFilter] = useState('name');
    const [productQuery,setProductQuery] = useState('');
    const [locationFilter,setLocationFilter] = useState('pin');
    const [locationQuery,setLocationQuery] = useState('');
    const [couponFilter,setCouponFilter] = useState('code');
    const [couponQuery,setCouponQuery] = useState('');
    const [adminFilter,setAdminFilter] = useState('name');
    const [adminQuery,setAdminQuery] = useState('');
    return (
        <FilterContext.Provider value={{
                userFilter,setUserFilter,userQuery,setUserQuery,
                orderFilter,setOrderFilter,orderQuery,setOrderQuery,
                productFilter,setProductFilter,productQuery,setProductQuery,
                locationFilter,setLocationFilter,locationQuery,setLocationQuery,
                couponFilter,setCouponFilter,couponQuery,setCouponQuery,
                adminFilter,setAdminFilter,adminQuery,setAdminQuery
            }}>
            {children}
        </FilterContext.Provider>
    );
}

export const useFilterContext = () =>{
    return useContext(FilterContext);
}