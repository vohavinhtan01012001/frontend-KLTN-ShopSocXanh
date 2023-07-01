import { faChevronRight, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link, parsePath, useNavigate, useParams } from 'react-router-dom'
import API from '../../../API';
import Swal from 'sweetalert2';

function ResetPassword() {
    const [password, setPassword] = useState();
    const [resetPassword, setResetPassword] = useState();
    const history = useNavigate();
    const { slug } = useParams()
    console.log(slug)
    const handleSubmit = () => {
        if (password !== resetPassword) {
            Swal.fire({
                text: 'Mật khẩu không trùng nhau',
                icon: 'warning',
                confirmButtonText: 'Đóng'
            })
            return;
        }
        API({
            method: 'post',
            url: 'auth/new-password',
            data: {
                password: password,
                slug:slug,
            }
        }).then((res) => {
            if(res.data.status === 200){
                Swal.fire({
                    text: res.data.message,
                    icon: 'success',
                    confirmButtonText: 'Đóng'
                })
                history("/login")
            }
            else if(res.data.status === 404){
                Swal.fire({
                    text: res.data.message,
                    icon: 'warning',
                    confirmButtonText: 'Đóng'
                })
            }
        })
    }
    return (
        <>   <div className="app__container">
            <div className="grid wide">
                <div className="row">
                    <div className="app__container--category">
                        <Link to="/" className="app__container--link">Trang chủ</Link>
                        <FontAwesomeIcon icon={faChevronRight} />
                        <p className="app__container--text">Đổi mật khẩu</p>
                    </div>
                </div>
                <div>
                    <div className="app__container--formLogin">
                        <h1 className="formLogin__heading">
                            ĐỔI MẬT KHẨU
                        </h1>
                        <div className="formLogin__email">
                            <div className="formLogin__email--icon">
                                <FontAwesomeIcon icon={faLock} />
                            </div>
                            <input type="password" name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Nhập mật khẩu"
                                className="formLogin__email--input"
                            />
                        </div>
                        <div className="formLogin__email">
                            <div className="formLogin__email--icon">
                                <FontAwesomeIcon icon={faLock} />
                            </div>
                            <input type="password" name="resetPassword"
                                onChange={(e) => setResetPassword(e.target.value)}
                                placeholder="Nhập lại mật khẩu"
                                className="formLogin__email--input"
                            />
                        </div>
                        <div className="formLogin__btn">
                            <button
                                type="button"
                                className="formLogin__btn--login"
                                onClick={handleSubmit}
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>

                </div>
            </div >
        </div ></>
    )
}

export default ResetPassword