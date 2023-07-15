import { faArrowRightFromBracket, faChevronRight, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../../helpers/AuthContext";
import Swal from 'sweetalert2';
import API from '../../API';
import Button from 'react-bootstrap/esm/Button';



function Account() {
    const history = useNavigate();
    const { authState } = useContext(AuthContext);
    const [order, setOrder] = useState([]);



    const logoutSubmit = (e) => {
        localStorage.removeItem('accessToken');
        Swal.fire({
            text: 'Đăng xuất thành công',
            icon: 'success',
            confirmButtonText: 'Đóng'

        })
        history("/");
        window.location.reload();
    }

    // Xử lý thông tin khách hàng
    var name = authState.hoTen;
    var email = authState.email;
    var address = authState.diaChi;
    var phone = authState.sdt;


    useEffect(() => {
        API({
            method: 'get',
            url: `order/view-order`,
        }).then((res) => {
            if (res.data.status === 200) {
                setOrder(res.data.orders);
            }
            else {
                Swal.fire({
                    text: res.data.message,
                    icon: 'warning',
                    confirmButtonText: 'Đóng'
                })
            }
        })
    }, [])
    var display_products = "";
    var indexShow = 0;
    var display_heading = ""
    if (order.length > 0) {
        display_heading = (<h2 style={{ fontWeight: "bold", paddingTop: "20px" }}>Danh sách đơn hàng</h2>)
        display_products = order.map((item, index) => {
            indexShow = indexShow + 1;
            return (
                <div key={index} className='app__container-product' style={{ marginBottom: "20px" }}>
                    <div style={{ fontWeight: "bold", paddingLeft: "20px", paddingBottom: "20px", color: "#333", display: "block" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h2 style={{ fontWeight: "bold", marginRight: "10px" }}>Đơn hàng {indexShow} </h2>
                            {item.trangThai === 1 ? <p className='fs-4 text' style={{ color: '#0ccf0f', fontWeight: "bold", fontSize: "1.6rem" }}>Đã được xác nhận</p> :
                                <p className='fs-4 text' style={{ color: 'red', fontWeight: "bold", fontSize: "1.6rem" }}>Chưa xác nhận</p>}

                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h2 style={{ fontWeight: "bold", marginRight: "10px" }}></h2>
                            {item.thanhToanVnpay === 1 || item.thanhToanTienMat === 1 ? <p className='fs-4 text' style={{ color: '#0ccf0f', fontWeight: "bold", fontSize: "1.6rem" }}>Đã thanh toán</p> :
                                <p className='fs-4 text' style={{ color: 'red', fontWeight: "bold", fontSize: "1.6rem" }}>Chưa thanh toán</p>}
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h2 style={{ fontWeight: "bold", marginRight: "10px" }}></h2>
                            {item.giaoHang === 1 ? <p className='fs-4 text' style={{ color: '#0ccf0f', fontWeight: "bold", fontSize: "1.6rem" }}>Đã giao</p> :
                                <p className='fs-4 text' style={{ color: 'red', fontWeight: "bold", fontSize: "1.6rem" }}>Chưa giao</p>}
                        </div>


                        <div className='container__account-name' style={{ fontWeight: "bold", color: "#333" }}>
                            <span>Tên người nhận </span>
                            <span>:</span>
                            <span>{item.hoTen}</span>
                        </div>
                        <div className='container__account-name' style={{ fontWeight: "bold", color: "#333" }}>
                            <span>Địa chỉ người nhận </span>
                            <span>:</span>
                            <span>{item.diaChi}</span>
                        </div>
                        <div className='container__account-name' style={{ fontWeight: "bold", color: "#333" }}>
                            <span>Số điện thoại </span>
                            <span>:</span>
                            <span>{item.sdt}</span>
                        </div>
                    </div>
                    <Link to={`/order/${item.id}`} className='container__account-name' style={{ fontWeight: "bold", color: "#333", textAlign: "end", textDecoration: "none" }}>
                        <span className='app_container-edit--text'>Xem chi tiết</span>
                    </Link>
                </div>
            )


        })
    }
    else{
        display_heading = (<h2 style={{ color:'red', fontWeight: "bold", paddingTop: "20px" }}>Chưa có đơn hàng nào!</h2>)
    }
    return (
        <React.Fragment>
            <div className="app__container">
                <div className="grid wide">
                    <div className="row">
                        <div className="app__container--category">
                            <Link to="/" className="app__container--link">Trang chủ</Link>
                            <FontAwesomeIcon icon={faChevronRight} />
                            <p className="app__container--text">Tài khoản</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='app__container--heading'>
                            <h2 className='heading__text'>Tài khoản của bạn</h2>
                            <button type='button' onClick={logoutSubmit} className='heading__exit'>
                                <div className='heading__exit--icon'>
                                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                                </div>
                                <p className='heading__exit--text' style={{ marginBottom: '0' }}>Đăng xuất</p>
                            </button>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-8 col-md-12 col-xs-12 pd5'>
                            {display_heading}
                            {display_products}
                        </div>
                        <div className='col-lg-4 col-md-12 col-xs-12 pd5'>
                            <h2 style={{ fontWeight: "bold", paddingTop: "20px" }}>Thông tin của bạn</h2>
                            <div className='app_container-account'>
                                <div className='container__account-name' style={{ fontWeight: "bold", paddingTop: "20px", color: "#333" }}>
                                    <span>Họ tên </span>
                                    <span>:</span>
                                    <span>{name}</span>
                                </div>
                                <div className='container__account-name' style={{ fontWeight: "bold", paddingTop: "20px", color: "#333" }}>
                                    <span>Email </span>
                                    <span>:</span>
                                    <span>{email}</span>
                                </div>
                                <div className='container__account-name' style={{ fontWeight: "bold", paddingTop: "20px", color: "#333" }}>
                                    <span>Địa chỉ </span>
                                    <span>:</span>
                                    <span>{address}</span>
                                </div>
                                <div className='container__account-name' style={{ fontWeight: "bold", paddingTop: "20px", color: "#333" }}>
                                    <span>Điện thoại </span>
                                    <span>:</span>
                                    <span>{phone}</span>
                                </div>
                                <Link to={`/address/`} className='app_container-edit'>
                                    <div className='app_container-edit--text' >Chỉnh sửa</div>
                                    <div className='app_container-edit--icon'>
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </div>
                                </Link>
                            </div>
                            <Button className="cart__order--paying " style={{border: "none", fontSize: "20px",marginTop:"20px" }} onClick={()=>{history('/favourite')}} >Danh sách yêu thích </Button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Account;