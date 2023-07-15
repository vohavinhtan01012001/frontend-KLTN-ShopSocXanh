import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import API from '../../API';
import RatingStars from './component/Star';
import Button from 'react-bootstrap/esm/Button';

function OrderItems() {
    const history = useNavigate();
    const [ordersItems, setOrderItems] = useState([]);
    const [data, setData] = useState({});
    const [star, setStar] = useState([]);
    const { id } = useParams();
    const [refesh, setRefesh] = useState(false)
    const [buttonStatus, setButtonStatus] = useState(false)
    const [value, setValue] = useState('')

    useEffect(() => {
        const order_id = id;
        API({
            method: 'get',
            url: `order/view-order/${order_id}`,
        }).then((res) => {
            if (res.data.status === 200) {
                setOrderItems(res.data.orderItems)
                setData(res.data.orderItems.map((item) => {
                    return item.SanPhamId
                }))
            }
            else {
                Swal.fire({
                    text: res.data.message,
                    icon: 'warning',
                    confirmButtonText: 'Đóng'
                })
            }
        })


    }, [id, history]);

    useEffect(() => {
        console.log(data)
        API({
            method: 'put',
            url: `evaluate/show-all`,
            data: data,
        }).then(res => {
            if (res.data.status === 200) {
                setStar(res.data.product);
            }
        })
    }, [id, data, refesh])

    const handleCancel = () => {
        Swal.fire({
            title: 'Nhập lý do hủy đơn',
            input: 'text',
            inputPlaceholder: 'Nhập nội dung...',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy bỏ',
            showLoaderOnConfirm: true,
            preConfirm: (inputValue) => {
                if (inputValue) {
                    return inputValue;
                } else {
                    Swal.showValidationMessage('Vui lòng nhập lý do!');
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    text: "Vui lòng đợi phản hồi từ bên shop",
                    icon: 'success'
                });
                setButtonStatus(true);
                API({
                    method: "put",
                    url: `order/sendMail-cancel/${id}`,
                    data: { input: result.value },
                }).then(res => { console.log(res.data); })
            }
        });
    }

    console.log(star)
    var display_products = "";
    var display_ship = "";
    var sumPrice = 0;
    display_products = ordersItems.map((item, index) => {
        sumPrice += ((item.SanPham.giaGiam) * (item.soLuongM + item.soLuongL + item.soLuongXL))
        var startStar = 0;
        if (star.length > 0) {
            star.map((item1, index) => {
                if (item1.SanPhamId === item.SanPhamId) startStar = item1.danhGia;
            })
        }
        return (
            <div key={index} className='app__container-product' style={{ marginBottom: "20px" }}>
                <nav className="cart__product--item" style={{ paddingTop: "20px", borderBottom: "none" }}>
                    <div>
                        <div className="cart__product--link2">
                            <img src={`http://localhost:4000/${item.SanPham.hinh}`}
                                alt="" className="cart__product--img" style={{ width: "80px", borderRadius: "10px" }} />
                            <p className='cart_product--link--text'>{item.soLuongM + item.soLuongL + item.soLuongXL}</p>

                        </div>
                    </div>
                    <div className="cart__product--content">
                        <div className="cart__product--contentRight">
                            <Link to={`/${item.SanPham.TheLoai.ten}/${item.SanPhamId}`} className="cart__product--name" style={{ color: "#333" }}>{item.SanPham.ten}</Link>
                            <p className="cart__product--size" style={{ color: "#333" }}>{item.soLuongM > 0 ? "M" : item.soLuongL > 0 ? "L" : item.soLuongXL > 0 ? "XL" : ""}</p>
                        </div>
                        <div className="cart__product--contentLeft">
                            <RatingStars productId={item.SanPhamId} startStar={startStar} setRefesh={setRefesh} refesh={refesh} />
                            <p className="cart__product--money" style={{ color: "#333" }}>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.SanPham.giaGiam * (item.soLuongM + item.soLuongL + item.soLuongXL))}</p>
                        </div>
                    </div>
                </nav>
            </div>
        )
    })
    display_ship = (
        <>
            <div className='app__container-product' style={{ marginBottom: "20px" }}>
                <nav  /* className="cart__product--item" */ style={{ paddingTop: "20px" }}>
                    <h2 style={{ fontWeight: "bold", textAlign: "end", paddingTop: "20px", color: "#333" }}>Tổng tiền: {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumPrice + 30000)}</h2>
                    <h2 style={{ fontWeight: "bold", textAlign: "end", paddingTop: "20px", color: "#333" }}>(Đã cộng thêm tiền vận chuyển) </h2>
                </nav>
                {buttonStatus ?
                    <Button className=" cart__order--paying " style={{ border: "none", fontSize: "20px", marginTop: "20px", background: "#198754" }} disabled >Đang xử lý... </Button>
                    :
                    <Button className=" cart__order--paying " style={{ border: "none", fontSize: "20px", marginTop: "20px", background: "red" }} onClick={handleCancel} >Hủy đơn </Button>}
            </div>
        </>
    )

    return (
        <React.Fragment>
            <div className="app__container">
                <div className="grid wide">
                    <div className="row">
                        <div className="app__container--category">
                            <Link to="/" className="app__container--link">Trang chủ</Link>
                            <FontAwesomeIcon icon={faChevronRight} />
                            <Link to="/account" className="app__container--link">Tài khoản</Link>
                            <FontAwesomeIcon icon={faChevronRight} />
                            <p className="app__container--text">Đơn hàng </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className='col-lg-8 col-md-12 col-xs-12 pd5'>
                            {display_products}
                        </div>
                        <div className='col-lg-4 col-md-12 col-xs-12 pd5'>
                            {display_ship}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default OrderItems;