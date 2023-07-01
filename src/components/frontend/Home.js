import { faHandHoldingUsd, faPhoneVolume, faStar, faStarHalfStroke, faSync, faTruckMoving } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Carousel from 'react-bootstrap/Carousel';
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider1 from "../../assets/frontend/img/slide/1.jpg";
import Slider2 from "../../assets/frontend/img/slide/2.jpg";
import Tshirt from "../../assets/frontend/img/category/t-shirt.png";
import Shirt from "../../assets/frontend/img/category/shirt.png";
import Hoodie from "../../assets/frontend/img/category/hoodie.png";
import Sweater from "../../assets/frontend/img/category/sweater.png";
import Im from "../../assets/frontend/img/detail/lss.png";
import API from "../../API";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { AuthContext } from "../../helpers/AuthContext";
import Loading from "../Loading";
import ProductItem from "./component/ProductItem";

function Home() {
    const [viewProduct, setViewProduct] = useState([]);
    const [stars, setStars] = useState([]);
    useEffect(() => {
        API({
            method: 'get',
            url: 'product/show-all',
        }).then((res) => {
            console.log(res.data)
            setViewProduct(res.data.products);
        })
    }, []);

    useEffect(() => {
        API({
            method: 'get',
            url: 'evaluate/show-star',
        }).then((res) => {
            setStars(res.data.stars);
            console.log(res.data)
        })
    }, []);

    var display_products = "";
    viewProduct.sort(function (a, b) {
        let left = a.id;
        let right = b.id;
        return left === right ? 0 : left < right ? 1 : -1;
    });
    display_products = viewProduct.map((item, index) => {
        if (item.trangThai === 1) {
            return (
                index < 10 ?
                    <ProductItem item={item} index={index} />
                    : ""
            )
        }

    });
    return (
        <React.Fragment>
            <div className="container">
                <div className="slide">
                    <Carousel>
                        <Carousel.Item interval={2000}>
                            <img
                                className="d-block w-100"
                                src={Slider1}
                                alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item interval={2000}>
                            <img
                                className="d-block w-100"
                                src={Slider2}
                                alt="Second slide"
                            />
                        </Carousel.Item>
                    </Carousel>
                </div>
                <div className="documents">
                    <div className="grid wide">
                        <div className="row">
                            <div className="col-md-3 col-sm-3 col-xs-12 pd-r-5 text-center pd5">
                                <div className="documents__content">
                                    <div className="documents__content-icon">
                                        <FontAwesomeIcon icon={faTruckMoving} />
                                    </div>
                                    <div className="documents__content-document">
                                        <h2 className="documents__content-title">
                                            GIAO HÀNG TOÀN QUỐC
                                        </h2>
                                        <p className="documents__content-text">
                                            Vì tình hình dịch covid còn nhạy cảm nên thời gian giao hàng có thể lâu hơn dự
                                            kiến, mong quý khách hàng cảm thông và cố gắng đợi hàng giúp shop.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-3 col-xs-12 pd-r-5 text-center pd5">
                                <div className="documents__content">
                                    <div className="documents__content-icon">
                                        <FontAwesomeIcon icon={faSync} />
                                    </div>
                                    <div className="documents__content-document">
                                        <h2 className="documents__content-title">
                                            CHÍNH SÁCH ĐỔI TRẢ HÀNG
                                        </h2>
                                        <p className="documents__content-text">
                                            Sản phẩm được phép đổi hàng trong vòng 36h nếu phát sinh lỗi từ nhà sản xuất
                                            (Yêu
                                            cầu: hình ảnh phần bị lỗi rõ nét, chi tiết và đầy đủ).
                                        </p>
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-3 col-sm-3 col-xs-12 pd-r-5 text-center pd5">
                                <div className="documents__content">
                                    <div className="documents__content-icon">
                                        <FontAwesomeIcon icon={faHandHoldingUsd} />
                                    </div>
                                    <div className="documents__content-document">
                                        <h2 className="documents__content-title">
                                            GIAO HÀNG NHẬN TIỀN VÀ KIỂM KÊ ĐƠN HÀNG
                                        </h2>
                                        <p className="documents__content-text">
                                            Được phép kiểm hàng trước khi thanh toán. Lưu ý: Trường hợp Quý khách đã nhận
                                            hàng
                                            về nhà, vui lòng quay video unbox sản phẩm trong tình trạng nguyên vẹn để có thể
                                            chứng minh shop giao nhầm hoặc thiếu sản phẩm, trường hợp không có video shop
                                            không
                                            thể hỗ trợ.
                                        </p>
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-3 col-sm-3 col-xs-12 pd-r-5 text-center pd5">
                                <div className="documents__content">
                                    <div className="documents__content-icon">
                                        <FontAwesomeIcon icon={faPhoneVolume} />
                                    </div>
                                    <div className="documents__content-document">
                                        <h2 className="documents__content-title">
                                            ĐẶT HÀNG ONLINE VÀ KIỂM TRA ĐƠN HÀNG VUI LÒNG LIÊN HỆ
                                        </h2>
                                        <p className="documents__content-text">
                                            Hotline: 0378189209.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col l-12">
                                <div className="documents__content-document2">
                                    <h2 className="documents__content-title2">
                                        CÔNG TY TNHH VERGENCY
                                    </h2>
                                    <p className="documents__content-text2">
                                        Tạo ra nhiều sản phẩm cao cấp nhưng giá thành hấp dẫn, đem đến điều bất ngờ và những
                                        trải nghiệm thú vị kèm theo sự hài lòng, niềm tin tuyệt đối cho khách hàng. Đó là sứ
                                        mệnh của chúng tôi.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid wide">
                        <div className="document__timess">
                            <div className="documents__time">
                                <div className="documents__time-hh ">
                                    23
                                </div>
                                <p className="documents__time-text">ngày</p>
                            </div>
                            <div className="documents__time">
                                <div className="documents__time-hh ">
                                    23
                                </div>
                                <p className="documents__time-text">giờ</p>
                            </div>
                            <div className="documents__time">
                                <div className="documents__time-hh ">
                                    59
                                </div>
                                <p className="documents__time-text">phút</p>
                            </div>
                            <div className="documents__time">
                                <div className="documents__time-hh ">
                                    59
                                </div>
                                <p className="documents__time-text">giây</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="main-content" >
                    <div className="grid wide content">
                        <div className="row">
                            {display_products}
                        </div>
                        <div className="row">
                            <div className="col l-12 m-12 c-12">
                                <div className="content__btn">
                                    <Link to="/category/áo thun">XEM TẤT CẢ</Link>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col l-12 m-12 c-12">
                                <div className="content__foorter-slogan">
                                    <div className="content__foorter-left"></div>
                                    <div className="content__foorter-headding">
                                        <h1 className="content__foorter-title">
                                            THƯƠNG HIỆU
                                        </h1>
                                        <p className="content__foorter-text">
                                            Thương hiệu nổi bật của chúng tôi
                                        </p>
                                    </div>
                                    <div className="content__footer-right"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid wide content">

                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-6">
                                <div className="content__category">
                                    <div className="content__category-item">
                                        <Link to="/category/Áo thun" className="content__category-link">
                                            <img src={Tshirt}
                                                alt="Banner 1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-6">
                                <div className="content__category">
                                    <div className="content__category-item">
                                        <Link to="/category/Áo sơ mi" className="content__category-link">
                                            <img src={Shirt}
                                                alt="Banner 1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-6">
                                <div className="content__category">
                                    <div className="content__category-item">
                                        <Link to="/category/Áo khoác" className="content__category-link">
                                            <img src={Sweater}
                                                alt="Banner 1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-6">
                                <div className="content__category">
                                    <div className="content__category-item">
                                        <Link to="/category/Quần đùi" className="content__category-link">
                                            <img src={Hoodie}
                                                alt="Banner 1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="row">
                            <div className="col l-12 m-12 c-12">
                                <div className="content__foorter-slogan">
                                    <div className="content__foorter-left"></div>
                                    <div className="content__foorter-headding">
                                        <h1 className="content__foorter-title">
                                            BEST SELLER
                                        </h1>
                                        <p className="content__foorter-text">
                                            PRODUCTS ARE SOLD OUT VERY QUICKLY
                                        </p>
                                    </div>
                                    <div className="content__footer-right"></div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="content__foorter">
                    <div className="grid wide">
                        <div className="row">
                            <div className="col m-4 c-12">
                                <div className="content__logo-imgs">
                                    <Link to="" className="content__logo-link">
                                        <img src="//theme.hstatic.net/200000305259/1000869166/14/partner_1.png?v=27"
                                            className="content__logo-img" />
                                    </Link>
                                </div>
                            </div>
                            <div className="col m-4 c-12">
                                <div className="content__logo-imgs">
                                    <Link to="" className="content__logo-link">
                                        <img src="//theme.hstatic.net/200000305259/1000869166/14/partner_3.png?v=27"
                                            className="content__logo-img" />
                                    </Link>
                                </div>
                            </div>
                            <div className="col m-4 c-12">
                                <div className="content__logo-imgs">
                                    <Link to="" className="content__logo-link">
                                        <img src="//theme.hstatic.net/200000305259/1000869166/14/partner_2.png?v=27"
                                            className="content__logo-img" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Home;

