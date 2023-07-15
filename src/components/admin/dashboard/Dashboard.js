import React, { useEffect, useState } from 'react'
import API from '../../../API';

function Dashboard() {
    const [bestSellerProducts, setBestSellerProducts] = useState([])
    useEffect(() => {
        API({
            method: 'get',
            url: '/admin-dashboard/products/bestseller',
        }).then((res) => {
            setBestSellerProducts(res.data.bestSellerProducts)
            console.log(res.data)
        })
    }, []);

    return (
        <div style={{ width: "100%", marginTop: "20px" }}>
            <div style={{ boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)", background: "white", width: "50%", borderRadius: "20px", padding: "20px 20px", margin: "0 auto", backgroundColor: "#f8f9fa" }}>
                <h2>Danh sách sản phẩm bán chạy nhất:</h2>
                {
                    bestSellerProducts.map((item) => {
                        return <h2>{item.SanPham.ten}</h2>
                    })
                }
            </div>
        </div>
    )
}

export default Dashboard