import { faChevronRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MenuCategory from "../layouts/frontend/MenuCategory"
import Im from "../../assets/frontend/img/detail/lss.png";
import API from "../../API";
import Swal from "sweetalert2";
import Loading from "../Loading";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import ProductItem from "./component/ProductItem";
/* let PageSize = 6; */
function Favourite() {
    const history = useNavigate();
    const [product, setProduct] = useState([]);
    /* const productCount = product.length; */
    const [stars, setStars] = useState([]);

    const [shouldRefresh, setRefresh] = useState(false);
    const [message, setMessage] = useState('')


    const [productitem, setProductItem] = useState([]);





    useEffect(() => {
        API({
            method: 'get',
            url: 'evaluate/show-star',
        }).then((res) => {
            setStars(res.data.stars);
            console.log(res.data)
        })
    }, []);

    //xử lý hiện sản phẩm
    useEffect(() => {
        API({
            method: 'get',
            url: `/product/favourite`,
        }).then((res) => {
            if (res.data.status === 200) {
                setProduct(res.data.productList);
                setProductItem(res.data.productList)
            }
            else {
                Swal.fire({
                    text: `Vui lòng đăng nhập để tiếp tục`,
                    icon: 'warning',
                    confirmButtonText: 'Đóng'
                })
            }
        }).catch((err) =>
            Swal.fire({
                title: 'Error!',
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'Close'
            })
        )
    }, []);



    console.log(product)


    var showProductsList = "";

    if (product.length > 0) {
        showProductsList = product.map((item, index) => {
            if (item.trangThai === 1) {
                return (
                    <ProductItem item={item} index={index} />
                )
            }
        })
    }
    else {
        showProductsList = <h2 className="error" style={{ textAlign: "center", paddingTop: "30px" }}>Bạn chưa có sản phẩm yêu thích nào!</h2>
    }

    return (
        <>
            <div className="app__container" id="ssa">
                <div className="grid wide">
                    <div className="row">
                        <div className="app__container--category">
                            <Link to="/" className="app__container--link">Trang chủ</Link>
                            <FontAwesomeIcon icon={faChevronRight} />
                            <div className="app__container--link">Danh mục</div>
                            <FontAwesomeIcon icon={faChevronRight} />
                            <p className="app__container--text">Yêu thích</p>
                        </div>
                    </div>
                </div>
                <div className="grid wide">
                    <div className="row">
                        <div className="col l-9">
                            <div className="tshirts__content">
                                <div className="row">
                                    {showProductsList}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Favourite;