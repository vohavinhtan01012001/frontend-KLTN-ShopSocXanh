import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import API from '../../../API';
import { RefreshContext } from '../../../helpers/RefreshContext';

function DefaultLayout({ children }) {
    const [cart, setCart] = useState(0);
    const [refersh, setRefersh] = useState(false);
    useEffect(() => {
        API({
            method: 'get',
            url: 'cart/show-all',
        }).then((res) => {
            setCart(res.data.cart.length);
        })
    }, [refersh]);

    return (
        <RefreshContext.Provider value={{ refersh, setRefersh }}>
            <div><Header cart={cart} /></div>
            <div className='container'>
                {children}
            </div>
            <div><Footer /></div>
        </RefreshContext.Provider>
    )
}

export default DefaultLayout