import React, { useEffect, useState } from "react";
import axios from 'axios';
import swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import { faChevronRight, faEnvelope, faLocationDot, faLock, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import "../../../assets/frontend/css/grid.css";
import Swal from "sweetalert2";
import API from "../../../API";
function Register() {

    const history = useNavigate();
    const [confirmPassword, setConfirmPassword] = useState('');

    const initialValues = {
        hoTen: '',
        email: '',
        matKhau: '',
        diaChi: '',
        sdt: '',
    }
    const validationSchema = Yup.object().shape({
        hoTen: Yup.string()
            .required('Tên không được để trống')
            .max(80, 'Tên không được vượt quá 80 ký tự'),
        email: Yup.string()
            .email('Nhập đúng định dạng email, ví dụ: vinhtan2001@gmail.com')
            .required('Email không được để trống'),
        matKhau: Yup.string()
            .required('Mật khẩu không được để trống')
            .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, 'Mật khẩu cần ít nhất 6 ký tự, bao gồm chữ và số'),
        diaChi: Yup.string()
            .required('Địa chỉ không được để trống')
            .max(200, 'Địa chỉ không được vượt quá 200 ký tự'),
        sdt: Yup.string()
            .required('Số điện thoại không được để trống')
            .matches(/^\+?\d{10,12}$/, 'Nhập đúng định dạng số điện thoại, 10 số'),
    })

    const onSubmit = (data) => {
        if (data.matKhau !== confirmPassword) {
            Swal.fire({
                text: 'Mật khẩu không khớp!',
                icon: 'warning',
                confirmButtonText: 'Đóng'
            })
            return;
        }
        API({
            method: 'post',
            url: `auth/register`,
            data: data,
        }).then((res) => {
            
            if (res.data.status === 200) {
                Swal.fire({
                    text: res.data.message,
                    icon: 'success',
                    confirmButtonText: 'Đóng'
                })
                history('/login')
            }
            else if (res.data.status === 400) {
                Swal.fire({
                    text: res.data.message,
                    icon: 'warning',
                    confirmButtonText: 'Đóng'
                })
            }
            else {

                Swal.fire({
                    text: res.data.message,
                    icon: 'error',
                    confirmButtonText: 'Đóng'
                })
            }
        })

    }

    return (
        <React.Fragment>
            <div className="app__container">
                <div className="grid wide">
                    <div className="row">
                        <div className="app__container--category">
                            <Link to="/" className="app__container--link">Trang chủ</Link>
                            <FontAwesomeIcon icon={faChevronRight} />
                            <p className="app__container--text">Đăng ký</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="app__container--formLogin">
                            <h1 className="formLogin__heading">
                                ĐĂNG KÝ
                            </h1>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={onSubmit}
                                validationSchema={validationSchema}
                            >
                                <Form>
                                    <div className="formLogin__email">
                                        <div className="formLogin__email--icon">
                                            <FontAwesomeIcon icon={faUser} />
                                        </div>
                                        {/* <input type="text" name="name" placeholder="Họ và Tên" onChange={handleInput} value={registerInput.name} className="formLogin__email--input" /> */}
                                        <Field name="hoTen" placeholder="Họ và tên" className="formLogin__email--input" />

                                    </div>
                                    <span
                                        className='error fs-4 text'
                                    >
                                        <ErrorMessage name='hoTen' component="div" style={{ color: "red" }} />
                                    </span>
                                    <div className="formLogin__email">
                                        <div className="formLogin__email--icon">
                                            <FontAwesomeIcon icon={faEnvelope} />
                                        </div>
                                        {/*  <input type="gmail" name="email" placeholder="Email" onChange={handleInput} value={registerInput.email}  className="formLogin__email--input" /> */}
                                        <Field name="email" placeholder="Nhập email" className="formLogin__email--input" />

                                    </div>
                                    <span className='error fs-4 text'> <ErrorMessage name='email' component="div" style={{ color: "red" }} /></span>
                                    <div className="formLogin__password">
                                        <div className="formLogin__password--icon">
                                            <FontAwesomeIcon icon={faLock} />
                                        </div>
                                        {/* <input type="password" name="password" placeholder="Mật khẩu" onChange={handleInput} value={registerInput.password}  className="formLogin__password--input" /> */}
                                        <Field type="password" name="matKhau" placeholder="Nhập  Mật khẩu" className="formLogin__email--input" />

                                    </div>
                                    <span className='error fs-4 text'> <ErrorMessage name='matKhau' component="div" style={{ color: "red" }} />
                                        <div className="formLogin__password">
                                            <div className="formLogin__password--icon">
                                                <FontAwesomeIcon icon={faLock} />
                                            </div>
                                            <input type="password" name="password" placeholder="Nhập lại mật khẩu" onChange={(e) => setConfirmPassword(e.target.value)} className="formLogin__password--input" />

                                        </div>
                                    </span>
                                    <div className="formLogin__email">
                                        <div className="formLogin__email--icon">
                                            <FontAwesomeIcon icon={faLocationDot} />
                                        </div>
                                        {/* <input type="text" name="address" placeholder="Địa chỉ" onChange={handleInput} value={registerInput.address} className="formLogin__email--input" /> */}
                                        <Field name="diaChi" placeholder="Nhập địa chỉ" className="formLogin__email--input" />

                                    </div>
                                    <span className='error fs-4 text'> <ErrorMessage name='diaChi' component="div" style={{ color: "red" }} /></span>
                                    <div className="formLogin__email">
                                        <div className="formLogin__email--icon">
                                            <FontAwesomeIcon icon={faPhone} />
                                        </div>
                                        {/* <input type="text" name="phone" placeholder="Số điện thoại" onChange={handleInput} value={registerInput.phone} className="formLogin__email--input" /> */}
                                        <Field name="sdt" placeholder="Nhập số điện thoại" className="formLogin__email--input" />

                                    </div>
                                    <span className='error fs-4 text'> <ErrorMessage name='sdt' component="div" style={{ color: "red" }} /></span>
                                    <div className="formLogin__btn">
                                        <button type="submit" className="formLogin__btn--login">
                                            Đăng ký
                                        </button>
                                    </div>
                                </Form>
                            </Formik>
                            <div className="formLogin__register">
                                <Link to="/login" className="formLogin__register--link">
                                    Quay về
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Register;

