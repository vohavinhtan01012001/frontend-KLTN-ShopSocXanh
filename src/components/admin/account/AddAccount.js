import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Button from "react-bootstrap/esm/Button";
import ReplyIcon from '@mui/icons-material/Reply';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import API from '../../../API';
function AddAccount() {
    const history = useNavigate()
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
        console.log(data)
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
        <>
            <div className="container" >
                <div className="card-header" style={{ padding: "30px 0" }}>
                    <h1 style={{ fontWeight: "700" }}>Thêm tài khoản
                        <button
                            className="float-end"
                            style={{ padding: "8px 10px", borderRadius: "5px", border: "0px", backgroundColor: "#fff" }}
                            onClick={() => history("/admin/view-account")}
                        >
                            <ReplyIcon style={{ fontSize: "50px", color: "#5ec9ff" }} />
                        </button>
                    </h1>
                </div>
            </div>
            <div className="container px-4 fs-4 text " style={{ fontWeight: "600" }}>
                <div className="card mt-4 box-addProduct" style={{ background: "#f8f9fa" }}>
                    <div className="card-body">
                        <Formik
                            initialValues={initialValues}
                            onSubmit={onSubmit}
                            validationSchema={validationSchema}
                        >
                            <Form>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="form-group mb-3">
                                            <label>Họ và tên</label>
                                            <Field name="hoTen" className="form-control fs-4 text" />
                                            <small className="text-danger">
                                                <ErrorMessage name='hoTen' component="div" style={{ color: "red" }} />
                                            </small>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Email</label>
                                            <Field type="gmail" name="email" className="form-control fs-4 text" />
                                            <small className="text-danger">
                                                <ErrorMessage name='email' component="div" style={{ color: "red" }} />
                                            </small>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Địa chỉ</label>
                                            <Field 
                                            as="textarea" name="diaChi"className="form-control fs-4 text" />
                                            <small className="text-danger">
                                                <ErrorMessage name='diaChi' component="div" style={{ color: "red" }} />
                                            </small>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Số điện thoại</label>
                                            <Field name="sdt" className="form-control fs-4 text" />
                                            <small className="text-danger">
                                                <ErrorMessage name='sdt' component="div" style={{ color: "red" }} />
                                            </small>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Mật khẩu</label>
                                            <Field type="password" name="matKhau"
                                                className="form-control fs-4 text" />
                                            <small className="text-danger">
                                                <ErrorMessage name='matKhau' component="div" style={{ color: "red" }} />
                                            </small>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Nhập lại mật khẩu</label>
                                            <input type="password" name="confirmPassword"
                                                onChange={(e) => setConfirmPassword(e.target.value)} className="form-control fs-4 text" />
                                        </div>
                                    </div>
                                </div>
                                <div style={{ width: "100%", paddingTop: "20px", textAlign: "center" }}
                                >
                                    <button type="submit" className="btn btn-primary btn-lg px-4 mt-2 fs-4 text" style={{ padding: "10px", width: "200px" }}>
                                        Thêm tài khoản
                                    </button>
                                </div>
                            </Form>

                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddAccount;