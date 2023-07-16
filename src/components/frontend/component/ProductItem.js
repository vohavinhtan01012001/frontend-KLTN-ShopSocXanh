import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../../../API';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import Im from "../../../assets/frontend/img/detail/lss.png";

function ProductItem({ item, index }) {
    const [stars, setStars] = useState([]);
    const history = useNavigate()
    useEffect(() => {
        API({
            method: 'get',
            url: 'evaluate/show-star',
        }).then((res) => {
            setStars(res.data.stars);
        })
    }, []);

    let evaluate = [];
    evaluate.push(
        stars
            .map((star) => {
                if (star.SanPhamId == item.id) return star.danhGia;
            })
            .filter((value) => value !== undefined)
    );
    const evaluates = evaluate[0];
    var sumStar = 0;
    for (let i = 0; i < evaluates.length; i++) {
        sumStar += evaluates[i];
    }
    sumStar = sumStar / evaluates.length;
    const starIcons = [];
    for (let i = 0; i < 5; i++) {
        if (sumStar <= i) {
            starIcons.push(<StarBorderIcon style={{ color: "#ffae00", fontSize: "20px" }} key={i} />)
        }
        else if (sumStar > i && sumStar <= i + 0.5) {
            starIcons.push(<StarHalfIcon style={{ color: "#ffae00", fontSize: "20px" }} key={i} />)
        }
        else {
            starIcons.push(<StarIcon style={{ color: "#ffae00", fontSize: "20px" }} key={i} />)
        }
    }
    const handleClick = () => {
        history(`/${item.TheLoai.ten}/${item.id}`)
    }


    const [bestSellerProducts, setBestSellerProducts] = useState([])
    useEffect(() => {
        API({
            method: 'get',
            url: '/admin-dashboard/products/bestseller',
        }).then((res) => {
            setBestSellerProducts(res.data.bestSellerProducts)
        })
    }, []);


    return (
        <div key={index} className="col-lg-3 col-md-4 col-sm-4 col-xs-6 ">
            <div className="content__product" style={{ height: "95%" }}>
                <div onClick={handleClick} className="content__product-item">
                    <img src={`http://localhost:4000/${item.hinh}`}
                        className="content__product-img">
                    </img>
                    {
                        item.soLuongM == 0 && item.soLuongL == 0 && item.soLuongXL == 0 ?
                            <img src={Im}
                                className="content__product-img2">
                            </img> : ""
                    }
                    <p className="content__product-text">
                        {item.ten}
                    </p>
                </div>
                <div className="content-product-item2">
                    <div className="content__product-text2">
                        {item.ThuongHieu?.ten}
                    </div>
                    <div className="content__product-evaluate">
                        {starIcons}
                    </div>
                    {
                        item.soLuongM == 0 && item.soLuongL == 0 && item.soLuongXL == 0 ?
                            <div className="content__product-price--item1 error">
                                <p style={{ fontSize: "13px", fontWeight: "bold" }}>Hết hàng</p>
                            </div> :
                            <div className="content__product-price">
                                {item.KhuyenMaiId ?
                                    <div className="content__product-price--item1">
                                        {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.giaGiam)}
                                    </div> :
                                    <div className="content__product-price--item1">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.giaTien)}</div>}
                                {item.KhuyenMaiId ? <del className="content__product-price--item2">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.giaTien)}</del> : ""}
                            </div>
                    }

                    {
                        bestSellerProducts.map((product) => {
                            return product.SanPhamId === item.id ? <div className="content__product-new">Chạy</div> : ""
                        })
                    }
                    {item.KhuyenMai ? <div className="content__product-sale">{"-" + item.KhuyenMai.giamGia + "%"}</div> : ""}
                </div>
            </div>
        </div>
    )
}

export default ProductItem