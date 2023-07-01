import { faChevronRight, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link, parsePath } from 'react-router-dom'
import API from '../../../API';

function ForgotPassword() {
    const [email, setEmail] = useState();
    const [notification, setNotification] = useState(false);
    const handleSubmit = () => {
        console.log(email);
        API({
            method: 'post',
            url: 'auth/reset-password',
            data: {
                email: email
            }
        }).then((res) => {
            console.log(res.data.status);
        })
        setNotification(true);
    }
    return (
        <>   <div className="app__container">
            <div className="grid wide">
                <div className="row">
                    <div className="app__container--category">
                        <Link to="/" className="app__container--link">Trang chủ</Link>
                        <FontAwesomeIcon icon={faChevronRight} />
                        <p className="app__container--text">Quên mật khẩu</p>
                    </div>
                </div>
                <div>
                    <div className="app__container--formLogin">
                        <h1 className="formLogin__heading">
                            QUÊN MẬT KHẨU
                        </h1>
                        <div className="formLogin__email">
                            <div className="formLogin__email--icon">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </div>
                            <input name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Nhập email của bạn"
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
                    <div style={{ textAlign: "center", color: "red" }}>
                        {
                            notification ? <h2>Hệ thống sẽ gửi email qua tài khoản của bạn. Vui lòng kiểm tra email để tiếp tục!</h2> : ""
                        }
                    </div>
                </div>
            </div >
        </div ></>
    )
}

export default ForgotPassword