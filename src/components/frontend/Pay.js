import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import API from '../../API';
import { AuthContext } from '../../helpers/AuthContext';
import { Formik, Field, Form as Forms, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Loading from '../Loading';
import PaymentButton from './component/PaymentButton';

function Pay() {
    const history = useNavigate();
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [onAddress, setAddress] = useState(false);
    const { authState } = useContext(AuthContext);
    const [check, setCheck] = useState(false);

    if (!localStorage.getItem('accessToken')) {
        history('/login');
        Swal.fire({
            icon: 'warning',
            text: 'Vui lòng đăng nhập để tiếp tục!',
            confirmButtonText: 'Đóng'
        })
    }

    const [checkoutInput, setCheckoutInput] = useState({
        name: '',
        phone: '',
        address: '',
        note: '',
    });


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
    }, [history]);
    if (cart.length == 0) {
        history('/cart')
    }

    const handleInput = (e) => {
        e.persist();
        setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
    }


    const handlAccount = (e) => {
        e.preventDefault();
        if (!onAddress) {
            setAddress(true);
        }
        setCheck(true);
    }

    const handlAccountFalse = (e) => {
        e.preventDefault();
        if (onAddress) {
            setAddress(false);
        }
        setCheck(false);
    }


    const initialValues = {
        hoTen: "",
        diaChi: "",
        sdt: "",
        ghiChu: "",
    }

    const validationSchema = check ? "" : Yup.object().shape({
        hoTen: Yup.string()
            .required('Họ và tên là bắt buộc'),
        diaChi: Yup.string()
            .required('Địa chỉ là bắt buộc'),
        sdt: Yup.string()
            .required('Số điện thoại là bắt buộc'),
    })

    var formAddress = "";

    if (onAddress) {
        formAddress = (
            <>
                <Form.Group
                    className="mb-3 fs-4 text form-group"
                    controlId="formBasicEmail"
                >
                    <Form.Label>Họ và tên người nhận</Form.Label>
                    <Field
                        disabled
                        name="hoTen"
                        value={authState.hoTen}
                        className='form-control fs-4 text'
                        style={{ padding: "10px" }}
                        placeholder="Họ và tên..."
                    />
                    <Form.Text
                        className="fs-5 text "
                        style={{ color: "red" }}
                    >
                        <ErrorMessage name='hoTen' component="div" style={{ color: "red", fontWeight: "500" }}
                        />
                    </Form.Text>
                </Form.Group>
                <Form.Group
                    className="mb-3 fs-4 text form-group"
                    controlId="formBasicEmail"
                >
                    <Form.Label>Địa chỉ người nhận</Form.Label>
                    <Field
                        disabled

                        name="diaChi"
                        value={authState.diaChi}
                        className='form-control fs-4 text'
                        style={{ padding: "10px" }}
                        placeholder="Địa chỉ..."
                    />
                    <Form.Text
                        className="fs-5 text "
                        style={{ color: "red" }}
                    >
                        <ErrorMessage name='diaChi' component="div" style={{ color: "red", fontWeight: "500" }}
                        />
                    </Form.Text>
                </Form.Group>
                <Form.Group
                    className="mb-3 fs-4 text form-group"
                    controlId="formBasicEmail"
                >
                    <Form.Label>Số điện thoại</Form.Label>
                    <Field
                        disabled

                        name="sdt"
                        value={authState.sdt}
                        className='form-control fs-4 text'
                        style={{ padding: "10px" }}
                        placeholder="Số điện thoại..."
                    />
                    <Form.Text
                        className="fs-5 text "
                        style={{ color: "red" }}
                    >
                        <ErrorMessage name='sdt' component="div" style={{ color: "red", fontWeight: "500" }}
                        />
                    </Form.Text>
                </Form.Group>
            </>
        )
    }
    else {
        formAddress = (
            <>
                <Form.Group className="mb-3 fs-4 text form-group" controlId="formBasicEmail">
                    <Form.Label>Họ và tên người nhận</Form.Label>
                    <Field

                        name="hoTen"

                        className='form-control fs-4 text'
                        style={{ padding: "10px" }}
                        placeholder="Họ và tên..."
                    />
                    <Form.Text
                        className="fs-5 text "
                        style={{ color: "red" }}
                    >
                        <ErrorMessage name='hoTen' component="div" style={{ color: "red", fontWeight: "500" }}
                        />
                    </Form.Text>
                </Form.Group>
                <Form.Group
                    className="mb-3 fs-4 text form-group"
                    controlId="formBasicEmail"
                >
                    <Form.Label>Địa chỉ người nhận</Form.Label>
                    <Field

                        name="diaChi"

                        className='form-control fs-4 text'
                        style={{ padding: "10px" }}
                        placeholder="Địa chỉ..."
                    />
                    <Form.Text
                        className="fs-5 text "
                        style={{ color: "red" }}
                    >
                        <ErrorMessage name='diaChi' component="div" style={{ color: "red", fontWeight: "500" }}
                        />
                    </Form.Text>
                </Form.Group>
                <Form.Group
                    className="mb-3 fs-4 text form-group "
                    controlId="formBasicEmail"
                >
                    <Form.Label>Số điện thoại</Form.Label>
                    <Field

                        name="sdt"

                        className='form-control fs-4 text'
                        style={{ padding: "10px" }}
                        placeholder="Số điện thoại..." />
                    <Form.Text className="fs-5 text " style={{ color: "red" }}>
                        <ErrorMessage name='sdt' component="div" style={{ color: "red", fontWeight: "500" }}
                        />
                    </Form.Text>
                </Form.Group>
            </>
        )
    }
    /* var orderinfo_data = {
        name: checkoutInput.name,
        phone: checkoutInput.phone,
        address: checkoutInput.address,
        payment_mode: 'Paid by PayPal',
        payment_id: '',
    } */

    var sumPrice = 0;
    var products = "";
    if (loading) {
        return (<Loading />)
    }
    else {
        if (cart.length > 0) {
            products = cart.map((item, index) => {
                sumPrice += (item.SanPham.giaGiam * item.soLuongSP);
                return (
                    <nav key={index} className="cart__product--item" style={{ paddingTop: "20px" }}>
                        <div>
                            <div className="cart__product--link2">
                                <img src={`http://localhost:4000/${item.SanPham.hinh}`}
                                    alt="" className="cart__product--img" style={{ width: "80px", borderRadius: "10px" }} />
                                <p className='cart_product--link--text'>{item.soLuongSP}</p>
                            </div>
                        </div>
                        <div className="cart__product--content">
                            <div className="cart__product--contentRight">
                                <div className="cart__product--name" style={{ color: "#737373" }}>{item.SanPham.ten}</div>
                                <p className="cart__product--size" style={{ color: "#737373" }}>{item.kichThuoc}</p>
                            </div>
                            <div className="cart__product--contentLeft">
                                {
                                    item.SanPham.KhuyenMai ?
                                        <p className="cart__product--money" style={{ color: "#737373" }}>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.SanPham.giaGiam * item.soLuongSP)}</p> :
                                        <p className="cart__product--money" style={{ color: "#737373" }}>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.SanPham.giaTien * item.soLuongSP)}</p>
                                }
                            </div>
                        </div>
                    </nav>
                )
            })
        }
    }

    const handleSubmit = (values) => {
        if (check) {
            values.hoTen = authState.hoTen
            values.diaChi = authState.diaChi
            values.sdt = authState.sdt
        }
        API({
            method: 'post',
            url: 'admin-order/place-order',
            data: values
        }).then((res) => {
            if (res.data.status === 200) {
                Swal.fire({
                    icon: 'success',
                    text: res.data.message,
                    confirmButtonText: 'Đóng'
                })
                history("/thanks");
            }
        })/* .catch(err => {
            console.error(err);
            Swal.fire({
                icon: 'error',
                text: "Lỗi server",
                confirmButtonText: 'Đóng'
            }) */
    }

    const handleSubmitMomo = (values) => {
        if (check) {
            values.hoTen = authState.hoTen
            values.diaChi = authState.diaChi
            values.sdt = authState.sdt
        }
        console.log(values)
        API({
            method: 'post',
            url: 'admin-order/momo',
            data:values
        }).then((res) => {
            Swal.fire({
                icon: 'success',
                text: res.data.message,
                confirmButtonText: 'Đóng'
            })
            history("/");
        })
    }
    return (
        <React.Fragment>
            <div className='grid wide' style={{ paddingTop: "40px", paddingRight: "8px", paddingLeft: "8px" }}>
                <div className='row'>
                    <div className='col-lg-7 col-md-7 col-sm-12 col-xs-12'>
                        <div className="main-header">
                            <Link to="/" className="logo" style={{ textDecoration: "none", color: "black" }}>
                                <h1 className="logo-text">THANH TOÁN</h1>
                            </Link>
                            <ul className="breadcrumb fs-4 text">
                                <li className="breadcrumb-item fs ">
                                    <a href="/cart" style={{ textDecoration: "none" }}>Giỏ hàng</a>
                                </li>

                                <li className="breadcrumb-item breadcrumb-item-current">
                                    Thông tin giao hàng
                                </li>

                            </ul>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <Button onClick={handlAccount} className='fs-4 text' variant="primary" type="button">
                                    Lấy thông tin của bạn
                                </Button>
                                <Button onClick={handlAccountFalse} className='fs-4 text' variant="primary" type="button" style={{ background: "#aaa", border: "none", padding: "5px", marginLeft: "20px" }}>
                                    Sửa thông tin
                                </Button>

                            </div>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                                validationSchema={validationSchema}
                            >
                                <Forms style={{ marginTop: "20px" }}>

                                    {formAddress}
                                    <div className="cart__note">
                                        <h2 className="cart__note--text" >Ghi chú đơn hàng</h2>
                                        <Field as="textarea" name="ghiChu" id="txtComment" className="fs-4 text" rows="8" cols="80"></Field>
                                    </div>
                                    <div className="ship" style={{ paddingTop: "30px" }}>
                                        <h2>Phương thức thanh toán</h2>
                                        <div className='ship_content fs-4 text' style={{ display: "flex" }}>
                                            <p className='ship_content--text'>
                                                Giao hàng tận nơi (thời gian giao hàng dự kiến từ 3 ~ 4 ngày, có thể lâu hơn vì các vấn đề bất khả kháng, mong Quý KH đợi đơn hàng giúp shop. Chân thành cảm ơn)
                                            </p>
                                        </div>
                                    </div>
                                    <div className="ship" style={{ paddingTop: "30px" }}>
                                        <h2>Phương thức vận chuyển</h2>
                                        <div className='ship_content fs-4 text' >
                                            <p className='ship_content--text'>
                                                1. Khi click vào nút hoàn tất đơn hàng thì đơn hàng sẽ được nhân viên xác nhận qua gọi điện thoại, nếu thông tin địa chỉ và số điện thoại chính xác thì đơn hàng sẽ được vận chuyển từ 3-4-5 ngày tùy vùng miền.
                                            </p>
                                            <p> 2. Trường hợp đặt hàng xong nhưng muốn HỦY ĐƠN, vui lòng soạn tin nhắn theo cú pháp: SĐT ĐÃ ĐẶT ĐƠN (hoặc MÃ ĐƠN hoặc GMAIL ĐƠN HÀNG) + TÊN NGƯỜI NHẬN sau đó gửi qua các kênh online: Page Facebook, Intagram. Nhân viên check tin nhắn sẽ xử lý hủy giúp Quý KH.
                                            </p>
                                        </div>
                                    </div>
                                    <Button className='fs-4 text' style={{ marginTop: "30px", marginBottom: "30px", background: "primary", border: "none", padding: "10px" }} variant="primary" type="submit">
                                        Thanh toán 
                                    </Button>
                                    
                                </Forms>
                            </Formik>
                        </div>
                    </div>
                    <div className='col-lg-5 col-md-5 col-sm-12 col-xs-12' style={{ boxShadow: "1px 0 0 #e1e1e1 inset" }}>
                        {products}
                        <div className='pay__product' style={{ paddingTop: "10px" }}>
                            <div className='pay__product--item fs-4 text'>
                                <p>Tạm tính</p>
                                <p>Phí vận chuyển</p>
                            </div>
                            <div className='pay__product--item fs-4 text'>
                                <p>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumPrice)}</p>
                                <p>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(30000)}</p>
                            </div>
                        </div>
                        <div className='pay__product' style={{ borderBottom: "none", paddingTop: "10px" }}>
                            <div className='pay__product--item fs-4 text'>
                                <h2 style={{ fontWeight: "bold" }}>Tổng tiền</h2>
                            </div>
                            <div className='pay__product--item fs-4 text'>
                                <h2 style={{ fontWeight: "bold" }}>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumPrice + 30000)}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Pay;