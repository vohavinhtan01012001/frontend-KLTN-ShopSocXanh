import { faChevronRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Im from "../../assets/frontend/img/detail/lss.png";
import API from "../../API";
import ProductItem from "./component/ProductItem";

function Search({ message }) {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        if (message != '') {
            API({
                method: 'get',
                url: `product/search/${message}`,
            }).then((res) => {
                setProduct(res.data.products);
            })
        }
    }, [message])
    console.log(product)

    var showProductsList = "";

    if (product.length > 0) {
        showProductsList = product.map((item, index) => {
            if (item.trangThai === 1) {
                return <ProductItem item={item} index={index} />
            }

        })
    }
    else {
        showProductsList = <h2 style={{ color: "red",marginTop:"20px" }}>Không tìm thấy sản phẩm</h2>
    }
    return (
        <>
            <div className="app__container">
                <div className="grid wide">
                    <div className="row">
                        <div className="app__container--category">
                            <Link to="/" className="app__container--link">Trang chủ</Link>
                            <FontAwesomeIcon icon={faChevronRight} />
                            <div className="app__container--link">Tìm kiếm</div>
                        </div>
                    </div>
                </div>
                <div className="grid wide">
                    <div className="row">
                        <div className="col">
                            <div className="tshirts__title">
                                <h3 className="tshirts__title--heading">Tìm kiếm: {message != "" ? message : ""}</h3>
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

export default Search;