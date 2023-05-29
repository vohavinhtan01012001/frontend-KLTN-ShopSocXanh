import React from "react";
import { Link } from 'react-router-dom';
import "../../../assets/frontend/css/grid.css";
import "../../../assets/frontend/css/style.css";

function Footer() {
    return (
        <footer className="foorter">
            <div className="grid">
                <div className="footer__color">
                    <div className="grid wide">
                        <div className="row ">
                            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 pd5">
                                <div className="foorter__content">
                                    <h2 className="foorter__content-title">
                                        THÔNG TIN LIÊN HỆ:
                                    </h2>
                                    <div className="foorter__content-documents">
                                        <p className="foorter__content-text">
                                            180 Cao Lỗ,phường 4,Quận 8, Hồ Chí Minh (Giờ mở cửa sáng: 08H30 --
                                            11H30, Giờ
                                            nghĩ
                                            trưa: 11H30 -- 13H30, Giờ mở cửa buổi chiều: 13H30 -- 17H45) KH vui lòng đến
                                            đúng khung
                                            giờ
                                            mở cửa trên để mua hàng.
                                        </p>
                                        <p className="foorter__content-text2">
                                            Phone:03781892909
                                        </p>
                                        <p className="footer__content-text3">
                                            Email:vohavinhtan6@gmail.com
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 pd5">
                                <div className="foorter__content">
                                    <h2 className="foorter__content-title">
                                        CHÍNH SÁCH HỖ TRỢ:
                                    </h2>
                                    <ul className="foorter__content-list">
                                        <li className="foorter__content-item">
                                            <Link to="" className="foorter__content-link">Tìm kiếm</Link>
                                        </li>
                                        <li className="foorter__content-item">
                                            <Link to="" className="foorter__content-link">Giới thiệu</Link>
                                        </li>
                                        <li className="foorter__content-item"><Link to="" className="foorter__content-link">Chính
                                            sách đổi
                                            trả</Link></li>
                                        <li className="foorter__content-item"><Link to="" className="foorter__content-link">Chính
                                            sách bảo
                                            mật</Link></li>
                                        <li className="foorter__content-item"><Link to="" className="foorter__content-link">Điều
                                            khoản dịch
                                            vụ</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 pd5">
                                <div className="foorter__content">
                                    <h2 className="foorter__content-title">
                                        THÔNG TIN LIÊN KẾT:
                                    </h2>
                                    <div className="foorter__content-documents">
                                        <p className="foorter__content-text">
                                            Hãy kết nối với chúng tôi.
                                        </p>
                                        <div className="foorter__content-icon">
                                            <div className="foorter__content-facebook">
                                                <i className="fab fa-facebook-square"></i>
                                            </div>
                                            <div className="foorter__content-instagram">
                                                <i className="fab fa-instagram"></i>
                                            </div>
                                        </div>
                                        <div className="foorter__content-img">
                                            <img src="//theme.hstatic.net/200000305259/1000869166/14/dkbocongthuong.png?v=27" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 pd5">
                                <div className="foorter__content">
                                    <h2 className="foorter__content-title">
                                        THEO DÕI FANPAGE CHÚNG TÔI ĐỂ CẬP NHẬT XU HƯỚNG THỜI TRANG HOT NHẤT:
                                    </h2>
                                    <div className="foorter__content-link--facebook">
                                        <Link to="" className="foorter__content-link--text">Facebook</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col l-12 m-12">
                        <div className="foorter__license">
                            <p className="">&#169;Bản quyền thuộc về tui</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;