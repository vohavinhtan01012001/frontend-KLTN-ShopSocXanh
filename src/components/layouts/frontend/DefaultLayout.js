import React from 'react'
import Header from './Header'
import Footer from './Footer'

function DefaultLayout({ children }) {
    return (
        <>
            <div><Header /></div>
            <div className='container'>
                {children}
            </div>
            <div><Footer /></div>
        </>
    )
}

export default DefaultLayout