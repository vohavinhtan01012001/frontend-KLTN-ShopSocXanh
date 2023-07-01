import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Swal from "sweetalert2";
import API from "../../API";
import DeleteIcon from '@mui/icons-material/Delete';
import { RefreshContext } from "../../helpers/RefreshContext";
import PaymentButton from "./component/PaymentButton";
function Cart() {
    ///
    const { refersh, setRefersh } = useContext(RefreshContext);
    const history = useNavigate();
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    //Cập nhật số lượng
    const handleDecrement = (cart_id) => {
        setCart(cart =>
            cart.map((item) => {
                if (cart_id === item.id) {
                    if (item.soLuongSP > 1) {
                        return ({ ...item, soLuongSP: item.soLuongSP - 1 });
                    }
                    else {
                        Swal.fire({
                            icon: 'warning',
                            text: "Số lượng ít nhất là 1",
                            confirmButtonText: 'Đóng'
                        })
                        return (item);
                    }
                }
                else {
                    return (item)
                }
            }
            )
        );
        updateCartQuantity(cart_id, "dec");
    }
    const handleIncrement = (cart_id) => {
        setCart(cart =>
            cart.map((item) => {
                if (cart_id === item.id) {
                    if ((item.soLuongSP < item.SanPham.soLuongM && item.kichThuoc == "M")
                        || (item.soLuongSP < item.SanPham.soLuongL && item.kichThuoc == "L")
                        || (item.soLuongSP < item.SanPham.soLuongXL && item.kichThuoc == "XL")) {
                        return ({ ...item, soLuongSP: item.soLuongSP + 1 });
                    }
                    else {
                        Swal.fire({
                            icon: 'warning',
                            text: `size ${item.kichThuoc} chỉ còn lại ${item.soLuongSP} sản phẩm`,
                            confirmButtonText: 'Đóng'
                        })
                        return (item);
                    }

                }
                else {
                    return (item)
                }
            }
            )
        );
        updateCartQuantity(cart_id, "inc");
    }
    //upload số lượng
    function updateCartQuantity(cart_id, scope) {
        API({
            method: 'put',
            url: `/cart/cart-updatequantity/${cart_id}/${scope}`,
        }).then((res) => {
            if (res.data.status === 200) {
                console.log("thanh cong")
            }
        }).catch((err) => {
        });
    }

    //xóa product
    const deleteCartItem = (e, cart_id) => {
        e.preventDefault();

        API({
            method: 'delete',
            url: `cart/delete-cartitem/${cart_id}`,
        }).then((res) => {
            if (res.data.status === 200) {
                setRefersh(!refersh)
                Swal.fire({
                    icon: 'success',
                    text: res.data.message,
                    confirmButtonText: 'Đóng'
                })
            }
            else if (res.data.status === 404) {
                Swal.fire({
                    icon: 'warning',
                    text: res.data.message,
                    confirmButtonText: 'Đóng'
                })
            }
            else if (res.data.status === 401) {
                Swal.fire({
                    icon: 'warning',
                    text: res.data.message,
                    confirmButtonText: 'Đóng'
                })
            }
        }).catch((err) => {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Lỗi server',
                confirmButtonText: 'Đóng'
            })
        });
    }

    //Đổ dữ liệu cart
    useEffect(() => {
        API({
            method: 'get',
            url: 'cart/show-all',
        }).then((res) => {
            if (res.data.status === 200) {
                setCart(res.data.cart);
                console.log(res.data.cart)
                setLoading(false);
            }
            else if (res.data.status === 401) {
                history('/login');
                Swal.fire({
                    icon: 'warning',
                    text: res.data.message,
                    confirmButtonText: 'Đóng'
                })
            }
        })
    }, [refersh]);

    var productList = ""
    /* var note = "" */
    var productConti = ""
    var pay = ""
    var sumPrice = 0;
    var sumQ = 0;
    /* if (loading) {
        return (<div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>)
    }
    else { */
    if (cart.length > 0) {
        productList = cart.map((item, index) => {
            sumQ++;
            if (item.SanPham.KhuyenMai) {
                sumPrice += (item.SanPham.giaGiam * item.soLuongSP);
            }
            else {
                sumPrice += (item.SanPham.giaTien * item.soLuongSP);
            }
            return (
                sumPrice,
                <nav key={index} className="cart__product--item">
                    <div>
                        <Link to={`/${item.SanPham.TheLoai.ten}/${item.SanPhamId}`} className="cart__product--link">
                            <img src={`http://localhost:4000/${item.SanPham.hinh}`}
                                alt="" className="cart__product--img" />
                        </Link>
                    </div>
                    <div className="cart__product--content">
                        <div className="cart__product--contentRight">
                            <Link to={`/${item.SanPham.TheLoai.ten}/${item.SanPhamId}`} className="cart__product--name">{item.SanPham.ten}</Link>
                            <p className="cart__product--size">{item.kichThuoc}</p>
                            <div className="cart__product--price">
                                {
                                    item.SanPham.KhuyenMai ?
                                        <>
                                            <p className="cart__product--priceNow">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.SanPham.giaGiam)}</p>
                                            <del>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.SanPham.giaTien)}</del>
                                        </> :
                                        <p className="cart__product--priceNow">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.SanPham.giaTien)}</p>
                                }
                            </div>
                            <div className="input-group fs-4 text">
                                <input type="button" value="-" onClick={() => handleDecrement(item.id)} className="qty-btn" />
                                <div className="qty-btn fs-4 text text-center lh-lg p-2">{item.soLuongSP}</div>
                                <input type="button" value="+" onClick={() => handleIncrement(item.id)} className="qty-btn" />
                            </div>
                        </div>
                        <div className="cart__product--contentLeft">
                            <div onClick={(e) => {
                                Swal.fire({
                                    text: "Bạn có chắc muốn xóa không?",
                                    icon: 'question',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Đồng ý!',
                                    cancelButtonText: 'Đóng',
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        deleteCartItem(e, item.id);
                                    }
                                })
                            }} className="cart__product--delete" style={{ cursor: 'pointer', color: "red" }}><DeleteIcon style={{ fontSize: "30px" }} /></div>
                            {
                                item.SanPham.KhuyenMai ?
                                    <div className="cart__product--money">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.SanPham.giaGiam * item.soLuongSP)}</div> :
                                    <div className="cart__product--money">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.SanPham.giaTien * item.soLuongSP)}</div>
                            }
                        </div>
                    </div>
                </nav>
            )
        })
        /*  note = (<div className="cart__note">
             <h2 className="cart__note--text">Ghi chú đơn hàng</h2>
             <textarea name="txtComment" id="txtComment" className="fs-3 text" rows="8" cols="80"></textarea>
         </div>) */
        productConti = (
            <Button className="cart__other" style={{ background: "black", border: "none" }}>
                <Link to={`/category/${cart[0] ? cart[0].SanPham.TheLoai.ten : ""}`} className="cart__other--text" style={{ color: "white" }}>TIẾP TỤC MUA SẢN PHẨM KHÁC</Link>
            </Button>
        )
        pay = (<div className="cart__order">
            <h1 className="cart__order--text">
                Đơn hàng
            </h1>
            <div className="cart__order--item">
                <div className="cart__order--content">
                    <h2 className="cart__order--textMoney">
                        Tổng tiền
                    </h2>
                    <h2 className="cart__order--price">
                        {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumPrice)}
                    </h2>
                </div>
                <Button className="cart__order--paying" style={{ background: "red", border: "none" }}>
                    <button className="cart__order--link" style={{ color: "white", width: "100%", background: "red", border: "none" }} onClick={() => Swal.fire({
                        title: "Chọn phương thức thanh toán",
                        showCancelButton: true,
                        cancelButtonText: "Hủy",
                        showCloseButton: true,
                        confirmButtonText: "Thanh toán bằng tiền mặt",
                        showDenyButton: true,
                        denyButtonText: "Thanh toán bằng VNPAY",
                        showThirdButton: true,
                        thirdButtonText: "Thanh toán bằng MoMo",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            history('/pay')
                        } else if (result.isDenied) {
                            Swal.fire({
                                title: "Hệ thống sẽ tự động +30.000VNĐ phí vận chuyển vào đơn hàng của bạn!",
                                showCancelButton: true,
                                cancelButtonText: "Hủy",
                                showCloseButton: true,
                                confirmButtonText: "Đồng ý!",
                                customClass: {
                                    confirmButton: 'my-swal-confirm-button',
                                    denyButton: 'my-swal-deny-button',
                                    cancelButton: 'my-swal-cancel-button',
                                },
                            }).then((result) => {
                                if (result.isConfirmed) {
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
                                }
                            })
                        }
                        else if (result.isThird) {
                            Swal.fire("Bạn đã chọn thanh toán bằng MoMo!");
                        } else {
                        }
                    })}
                    >
                        THANH TOÁN
                    </button>
                </Button>
            </div>
        </div >)
    }
    else {
        productList = (<h2 className="error">Giỏ hàng của bạn đang trống!</h2>)
        /* note = "" */
        productConti = (
            <div className="cart__other">
                <Link to='/' className="cart__other--text">TIẾP TỤC MUA SẢN PHẨM KHÁC</Link>
            </div>
        )
        pay = ""
    }
    /* } */
    return (
        <>
            <div className="app__container">
                <div className="grid wide">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pd5">
                            <div className="app__container--category">
                                <Link to="/" className="app__container--link">Trang chủ</Link>
                                <FontAwesomeIcon icon={faChevronRight} />
                                <p className="app__container--text">Giỏ hàng</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="app__container--cart">
                    <div className="grid wide">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <h1 className="cart__product--text">
                                    Giỏ hàng
                                </h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-8 col-sm-12 col-xs-12">
                                <div className="cart__product">
                                    {productList}
                                </div>
                                {/* <div className="col-lg-8 col-sm-12 col-xs-12">
                                    {note}
                                </div> */}
                                <div className="col-lg-8 col-sm-12 col-xs-12">
                                    {productConti}
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-12 col-xs-12">
                                {pay}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;