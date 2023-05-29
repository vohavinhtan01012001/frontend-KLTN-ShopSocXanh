import React from "react";
import { faChevronRight, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "../../../assets/frontend/css/grid.css";
import API from "../../../API";
import Swal from "sweetalert2";
function Login() {
    const history = useNavigate();
    const initialValues = {
        email: '',
        matKhau: '',
    }
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Nhập đúng định dạng email, ví dụ: vinhtan2001@gmail.com')
            .required('Email không được để trống'),
        matKhau: Yup.string()
            .required('Mật khẩu không được để trống')
            .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, 'Mật khẩu cần ít nhất 6 ký tự, bao gồm chữ và số'),
    })

    const onSubmit = (data) => {
        API({
            method: 'post',
            url: `auth/login`,
            data: data,
        }).then((res) => {
            if (res.data.status === 200) {
                Swal.fire({
                    text: res.data.message,
                    icon: 'success',
                    confirmButtonText: 'Đóng'
                })
                localStorage.setItem('accessToken', res.data.accessToken)
                history('/')
                window.location.reload();
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
                            <p className="app__container--text">Đăng nhập</p>
                        </div>
                    </div>
                    <div>
                        <div className="app__container--formLogin">
                            <h1 className="formLogin__heading">
                                ĐĂNG NHẬP
                            </h1>
                            <Formik initialValues={initialValues}
                                onSubmit={onSubmit}
                                validationSchema={validationSchema}
                            >
                                <Form >
                                    <div className="formLogin__email">
                                        <div className="formLogin__email--icon">
                                            <FontAwesomeIcon icon={faEnvelope} />
                                        </div>
                                        <Field name="email" placeholder="Nhập email" className="formLogin__email--input" />
                                    </div>

                                    <span className='error fs-4 text'>
                                        <ErrorMessage name='email' component="div" style={{ color: "red" }} />
                                    </span>
                                    <div className="formLogin__password">
                                        <div className="formLogin__password--icon">
                                            <FontAwesomeIcon icon={faLock} />
                                        </div>
                                        <Field type="password" name="matKhau" placeholder="Nhập mật khẩu" className="formLogin__password--input" />
                                    </div>
                                    <span className='error fs-4 text'>
                                        <ErrorMessage name='matKhau' component="div" style={{ color: "red" }} />
                                    </span>
                                    <div className="formLogin__btn">
                                        <button type="submit" className="formLogin__btn--login">
                                            Đăng nhập
                                        </button>
                                    </div>
                                </Form>
                            </Formik>
                            <div className="formLogin__register">
                                <Link to="/register" className="formLogin__register--link">
                                    Đăng ký
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment >
    );
}

export default Login;

