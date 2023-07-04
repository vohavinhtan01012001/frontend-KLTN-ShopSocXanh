import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';
import API from '../../../API';

export default function BasicLineChart({orders}) {
    

    const formatMonth = (month) => {
        return `Tháng ${month}`;
    };

    const formatDoanhThu = (value) => {
        return `Doanh thu: ${value.toLocaleString()} VNĐ`;
      };
      console.log(orders)

    return (
        <div style={{ margin: '0 auto', padding: '0', width: '100%',display:"flex",justifyContent:"center" }}>
            {
                orders.length > 0 ? (
                    <LineChart width={1000} height={300} data={orders}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="month"
                            formatter={formatMonth}
                        />
                        <YAxis />
                        <Tooltip
                            formatter={formatDoanhThu}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="Doanh thu" stroke="#8884d8" />
                    </LineChart>
                ) : (
                    <h2>Năm này chưa có dữ liệu</h2>
                )
            }
        </div>
    );
}