import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MapBox from "./MapBox";

function Contact() {

    return (
        <React.Fragment>
           <div className="app__container">
                <div className="grid wide">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pd5">
                            <div className="app__container--category">
                                <Link to="/" className="app__container--link">Trang chủ</Link>
                                <FontAwesomeIcon icon={faChevronRight} />
                                <p className="app__container--text">Liên hệ</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="Mapbox">
                            <h2 style={{ fontWeight: "blod" }}>LIÊN HỆ ---</h2>
                            <MapBox />
                        </div>
                    </div>
                    <div className="row" style={{ paddingTop: '50px' }}>
                        <div >
                            <div className="page-left-contact clearfix fs-4 text">
                                <div className="page-left-title">
                                    <i className="fa fa-envelope"></i><span>Để lại lời nhắn cho chúng tôi</span>
                                </div>
                                <form className="contact-form" method="post">
                                    <input name="form_type" type="hidden" value="contact" />
                                    <input name="utf8" type="hidden" value="✓" />
                                    <div className="contact-form page-form-contact">
                                        <div className="clearfix">
                                            <div className="row" style={{ display: "flex", justifyContent: "space-around" }}>
                                                <div className="col-lg-6 col-sm-6 col-xs-12">
                                                    <div className="input-group">
                                                        <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                                        <input type="text" name="contact[name]" className="form-control fs-4 text" placeholder="Họ và tên" aria-describedby="basic-addon1" />
                                                    </div>
                                                    <div className="input-group">
                                                        <span className="input-group-addon"><i className="fa fa-envelope-o"></i></span>
                                                        <input type="text" name="contact[email]" className="form-control fs-4 text" placeholder="Email đầy đủ" aria-describedby="basic-addon1" />
                                                    </div>
                                                    <div className="input-group">
                                                        <span className="input-group-addon"><i className="fa fa-phone"></i></span>
                                                        <input type="text" name="contact[phone]" className="form-control fs-4 text" placeholder="Số điện thoại" aria-describedby="basic-addon1" />
                                                    </div>
                                                    <div className="col-sm-6 col-xs-12">
                                                        <div className="input-group">
                                                            <textarea name="contact[body]" placeholder="Viết lời nhắn"></textarea>
                                                        </div>
                                                    </div>
                                                    <div className="col-xs-12 text-center">
                                                        <button>
                                                            Gửi lời nhắn
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-sm-6 col-xs-12">
                                                    <div className="page-right-contact clearfix" style={{ fontWeight: "bold" }}>
                                                        <div className="page-right-title">
                                                            <span>Chúng tôi sẽ kết nối ngay lập tức khi bạn cần trợ giúp.</span>
                                                        </div>
                                                        <div className="phone">
                                                            <i className="fa fa-building" aria-hidden="true"></i> <span>Vergency.</span>
                                                        </div>
                                                        <div className="phone">
                                                            <i className="fa fa-phone" aria-hidden="true"></i> <span>037 335 7405.</span>
                                                        </div>
                                                        <div className="address">
                                                            <i className="fa fa-map-marker" aria-hidden="true"></i> <span>180 Cao Lỗ,Phường 4,Quận 8, TP. Hồ Chí Minh (AM: 08H30 -&gt;  11H45, PM: 13H30 -&gt; 17H45) KH vui lòng đến đúng khung giờ mở cửa trên để mua hàng. Vergency chân thành cảm ơn!</span>
                                                        </div>
                                                        <div className="address">
                                                            <i className="fa fa-envelope" aria-hidden="true"></i> <span>vergency.contact@gmail.com</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
    
                                    {/* <input id="68356c7f67d94d808e80f144d2b9d0d1" name="g-recaptcha-response" type="hidden" value="03AEkXODD_1nkYMUs70V5bZNMpIHDSq4jUzFss4NAdtTCca_uywtUtnVByaLFI73re-_rFfYjmfQhVtEbqS6ZUjX5CAiTkHBFo77FQpZmvXRhN6aAWjLmhbCSibGGRFDzvTWAFgjark2LfWZVZZJ1DXE0tdJd5K0Gfd8eZUQtNJRpzQyiB4QWaj-QcZGqU4kYZXtEBxa7V-cn8Z0HQe8LGOoQC2QB0PlaNX4J2EiZmpClOs_n1EtkUCwkc7L6RzxNaUsu0bvg3fBjY78RbbegcC1YrezyGE9Yes22-XsFq4v0_Qx7NjtVG5vXaYGnu0m03yhbyBjYVgULKDCFljLQ0yYkZ5TW1BIVv7KAeZMN-2jzwTgKrDKpICTh6vO59GvqXz89E-_KN_o14RRhUJVVnBNpejb8g68ky5Z0CTI2HY0gUWvz2iBlq4hvWo0p-Q9k-ld-ysbgq6CGQ5jE344oQduR7xnLTrVgK94AHeVli9iAWUrwGxqDC0kA"><script src="https://www.google.com/recaptcha/api.js?render=6LdD18MUAAAAAHqKl3Avv8W-tREL6LangePxQLM-"></script><script>grecaptcha.ready(function() {grecaptcha.execute('6LdD18MUAAAAAHqKl3Avv8W-tREL6LangePxQLM-', { action: 'submit' }).then(function (token) { document.getElementById('68356c7f67d94d808e80f144d2b9d0d1').value = token; });});</script></form> */}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
        </React.Fragment>
    );
}

export default Contact;