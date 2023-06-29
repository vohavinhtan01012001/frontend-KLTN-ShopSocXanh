import React from 'react';
import API from '../../../API';
import Button from 'react-bootstrap/esm/Button';

function PaymentButton() {
    const handlePayment = () => {
        // Gửi yêu cầu tạo URL thanh toán VNPay đến máy chủ
        API({
            method: 'get',
            url: 'vnpay/vn_payment',
        }).then(response => {
            console.log(response.data);
            /* const paymentUrl = response.data.data; */
            // Chuyển hướng người dùng đến trang thanh toán VNPay
            window.location.href = response.data;
        })
            .catch(error => {
                console.error('Error:', error);
                // Xử lý lỗi khi không thể tạo URL thanh toán
            });
    };

    return (
        <Button className='fs-4 text' style={{ marginTop: "30px", marginBottom: "30px", marginLeft: "20px", background: "primary", border: "none", padding: "10px" }} variant="primary" type="button" onClick={handlePayment}>Thanh toán bằng VNPay</Button>
    );
}

export default PaymentButton;