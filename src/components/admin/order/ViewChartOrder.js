import React, { useEffect, useState } from 'react'
import BasicLineChart from './component/Chart'
import API from '../../../API';
import PositionedMenu from './component/Menu';

function ViewChartOrder() {
    const [orders, setOrders] = useState([]);
    const [years, setYear] = useState([]);
    const [option, setOption] = useState();
    const [revenue, setRevenue] = useState([]);

    useEffect(() => {
        API({
            method: 'get',
            url: 'admin-dashboard/years'
        }).then((response) => {
            setYear(response.data.years)
            console.log(response.data.years)
        });
    }, [])
    useEffect(() => {
        API({
            method: 'get',
            url: `admin-dashboard/show-all/${option ? option : years[0]}`
        }).then((response) => {
            setOrders(response.data.totalSalesByMonth)
        });
    }, [option, years])


    useEffect(() => {
        API({
            method: 'get',
            url: 'admin-dashboard/revenue'
        }).then((response) => {
            setRevenue(response.data.totalSalesByYear)
            console.log(response.data.totalSalesByYear)
        });
    }, [])



    const formatDoanhThu = (value) => {
        return `${value.toLocaleString()} VNĐ`;
    };


    console.log(option)
    return (
        <div style={{ width: "100%", marginTop: "20px" }}>
            <div className='row'>
                <div style={{ boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)", background: "white", width: "80%", borderRadius: "20px", padding: "20px 0", margin: "0 auto", backgroundColor: "#f8f9fa" }}>
                    <div style={{ width: "100%", textAlign: "center", marginBottom: "20px" }}>
                        <div>
                            <h1 style={{color:'red',marginBottom:"10px"}}>
                               Sơ đồ thống kê đơn hàng
                            </h1>
                        </div>
                        <div>
                            <h2>
                                Năm {option ? option : years[0]}
                            </h2>
                        </div>
                        <PositionedMenu years={years} setOption={setOption} />
                    </div>
                    <BasicLineChart orders={orders} />
                 
                </div>
                
            </div>
        </div>
    )
}

export default ViewChartOrder