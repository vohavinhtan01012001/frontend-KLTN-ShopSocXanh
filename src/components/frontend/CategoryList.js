import { faChevronRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MenuCategory from "../layouts/frontend/MenuCategory"
import Im from "../../assets/frontend/img/detail/lss.png";
import API from "../../API";
import Swal from "sweetalert2";
import StarIcon from '@mui/icons-material/Star';
import Loading from "../Loading";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import ProductItem from "./component/ProductItem";
/* let PageSize = 6; */
function CategoryList() {
    const history = useNavigate();
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [material, setMaterial] = useState([]);
    const [color, setColor] = useState([]);
    const productCount = product.length;
    const [stars, setStars] = useState([]);

    const [shouldRefresh, setRefresh] = useState(false);
    const [message, setMessage] = useState('')

    const callbackFunction = (childData) => {
        setMessage(childData)
        setRefresh(!shouldRefresh);
    }
    const [productitem, setProductItem] = useState([]);

    //sắp xếp
    function handleOption(e) {
        if (e.target.value == 'Tên: A--Z') {
            const result = product.sort(function (a, b) {
                let left = a.ten;
                let right = b.ten;
                return left === right ? 0 : left > right ? 1 : -1;
            });
            setRefresh(!shouldRefresh);
            setProduct(result);
        }
        else if (e.target.value == 'Tên: Z--A') {
            const result = product.sort(function (a, b) {
                let left = a.ten;
                let right = b.ten;
                return left === right ? 0 : left < right ? 1 : -1;
            });
            setRefresh(!shouldRefresh);
            setProduct(result);
        }
        else if (e.target.value == 'Giá:Tăng dần') {
            const result = product.sort(function (a, b) {
                let left = a.giaTien;
                let right = b.giaTien;
                return left === right ? 0 : left > right ? 1 : -1;
            });
            setRefresh(!shouldRefresh);
            setProduct(result);
        }
        else if (e.target.value == 'Giá:Giảm dần') {
            const result = product.sort(function (a, b) {
                let left = a.giaTien;
                let right = b.giaTien;
                return left === right ? 0 : left < right ? 1 : -1;
            });
            setRefresh(!shouldRefresh);
            setProduct(result);
        }
    }

    const handleOptionMaterial = (e) => {
        const result = productitem.filter(function (a) {
            return a.ChatLieuId == e.target.value;
        });
        setRefresh(!shouldRefresh);
        setProduct(result);
    }

    const handleOptionColor = (e) => {
        const result = productitem.filter(function (a) {
            return a.MauSacId == e.target.value;
        });
        setRefresh(!shouldRefresh);
        setProduct(result);
    }


    //xử lý hiện sản phẩm
    const { slug } = useParams();
    useEffect(() => {
        API({
            method: 'get',
            url: `/product/categoryList/${slug}`,
        }).then((res) => {
            setProduct(res.data.products);
            setProductItem(res.data.products)
            setCategory(res.data.categories)
        }).catch((err) =>
            Swal.fire({
                title: 'Error!',
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'Close'
            })
        )
    }, [slug, history]);

    useEffect(() => {
        API({
            method: 'get',
            url: 'evaluate/show-star',
        }).then((res) => {
            setStars(res.data.stars);
            console.log(res.data)
        })
    }, [slug]);

    //Xử lý bộ lọc
    useEffect(() => {
        if (message == 1) {
            const result = productitem.filter(function (a) {
                return a.giaGiam < 200000;
            });
            setRefresh(!shouldRefresh);
            setProduct(result);
        }
        else if (message == 2) {
            setProduct(product);
            const result = productitem.filter(function (a) {
                return a.giaGiam >= 200000 && a.giaGiam <= 400000;
            });
            setRefresh(!shouldRefresh);
            setProduct(result);
        }
        else if (message == 3) {
            setProduct(product);
            const result = productitem.filter(function (a) {
                return a.giaGiam >= 400000 && a.giaGiam <= 800000;
            });
            setRefresh(!shouldRefresh);
            setProduct(result);
        }
        else if (message == 4) {
            setProduct(product);
            const result = productitem.filter(function (a) {
                return a.giaGiam > 800000;
            });
            setRefresh(!shouldRefresh);
            setProduct(result);
        }
    }, [message])

    useEffect(() => {
        API({
            method: 'get',
            url: 'marterial/show-all',
        }).then((res) => {
            setMaterial(res.data.materials);
        })
    }, [])

    useEffect(() => {
        API({
            method: 'get',
            url: 'color/show-all',
        }).then((res) => {
            setColor(res.data.colors);
        })
    }, [])

    //xuất dữ liệu 
    var showProductsList = "";

    if (productCount) {
        showProductsList = product.map((item, index) => {
            if (item.trangThai === 1) {
                return (
                    <ProductItem item={item} index={index} />
                )
            }
        })
    }
    else {
        showProductsList = <h2 className="error" style={{ textAlign: "center", paddingTop: "30px" }}>Hiện tại sản phẩm đang cập nhật. Bạn quay lại sau nhé !</h2>
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
                            <p className="app__container--text">{category.ten}</p>
                        </div>
                    </div>
                </div>
                <div className="grid wide">
                    <div className="row">
                        <MenuCategory parentCallback={callbackFunction} />
                        <div className="col l-9">
                            <div className="tshirts__title">
                                <h3 className="tshirts__title--heading">{category.ten}</h3>
                                {/* <div className="tshirts__title--sort">
                                    <div className="tshirts__title--option">
                                        <select onChange={e => { handleOptionMaterial(e) }} id="search" className="tshirts__title--select">
                                            <option >---Chất liệu---</option>
                                            {
                                                material.map((item, index) => {
                                                    return <option value={item.id}> {item.tenChatLieu}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="tshirts__title--sort">
                                    <div className="tshirts__title--option">
                                        <select onChange={e => { handleOptionColor(e) }} id="search" className="tshirts__title--select">
                                            <option >---Màu sắc---</option>
                                            {
                                                color.map((item, index) => {
                                                    return <option value={item.id}> {item.tenMau}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div> */}
                                <div className="tshirts__title--sort">
                                    <div className="tshirts__title--option">
                                        <select onChange={e => { handleOption(e) }} id="search" className="tshirts__title--select">
                                            <option >---Sắp xếp---</option>
                                            <option >Giá:Tăng dần</option>
                                            <option >Giá:Giảm dần</option>
                                            <option >Tên: A--Z</option>
                                            <option >Tên: Z--A</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
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

export default CategoryList;