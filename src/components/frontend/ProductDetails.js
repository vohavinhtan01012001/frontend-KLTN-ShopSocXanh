import { faCar, faCartShopping, faCheck, faChevronRight, faHandHoldingUsd, faPhoneVolume, faStar, faSync, faTruckMoving } from "@fortawesome/free-solid-svg-icons";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import img1 from '../../assets/frontend/img/detail/img1.png';
import img2 from '../../assets/frontend/img/detail/img2.png';
import img3 from '../../assets/frontend/img/detail/img3.png';
import img4 from '../../assets/frontend/img/detail/img4.png';
import API from "../../API";
import Swal from "sweetalert2";
import { RefreshContext } from "../../helpers/RefreshContext";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import CommentApp from "./component/Comment";
import { AuthContext } from "../../helpers/AuthContext";

function ProductDetails() {

    const history = useNavigate();
    const { authState } = useContext(AuthContext);
    const [name, setName] = useState('');
    useEffect(() => {
        if (authState.hoTen !== '') {
            setName(authState.hoTen)
        }
    }, [authState.hoTen])
    console.log(name)
    const { refersh, setRefersh } = useContext(RefreshContext);
    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [viewProduct, setViewProduct] = useState([]);
    const [viewImg, setViewImg] = useState([]);
    const [radioValue, setRadioValue] = useState('1');
    const [refershLike, setRefershLike] = useState(false);

    const radios = [
        { name: 'M', value: 'M' },
        { name: 'L', value: 'L' },
        { name: 'XL', value: 'XL' },
    ];
    //xử lý số lượng
    const hanldeMinusQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevCount => prevCount - 1);
        }
    }

    const hanldePlusQuantity = () => {
        if (radioValue == "M" && product.soLuongM <= quantity) {
            Swal.fire({
                text: `Size ${radioValue} chỉ còn ${product.soLuongM} sản phẩm`,
                icon: 'warning',
                confirmButtonText: 'Đóng'
            })
            return
        }
        if (radioValue == "L" && product.soLuongL <= quantity) {
            Swal.fire({
                text: `Size ${radioValue} chỉ còn ${product.soLuongL} sản phẩm`,
                icon: 'warning',
                confirmButtonText: 'Đóng'
            })
            return
        }
        if (radioValue == "XL" && product.soLuongXL <= quantity) {
            Swal.fire({
                text: `Size ${radioValue} chỉ còn ${product.soLuongXL} sản phẩm`,
                icon: 'warning',
                confirmButtonText: 'Đóng'
            })
            return
        }
        setQuantity(prevCount => prevCount + 1);
    };

    //xử lý đổ dữ liệu
    const { categoryName } = useParams();
    const { id } = useParams();
    useEffect(() => {
        const category_slug = categoryName;
        const product_slug = id;

        API({
            method: 'get',
            url: `/product/viewproductdetail/${category_slug}/${product_slug}`,
        }).then((res) => {
            setProduct(res.data.products);
            /*  setLoading(false); */
        })
    }, [categoryName, id, history]);



    //xử lý sản phẩm liên quan
    useEffect(() => {
        const slug = categoryName;
        API({
            method: 'get',
            url: `/product/category/${slug}`,
        }).then((res) => {
            setViewProduct(res.data.products);
            console.log(res.data.products);
        })
    }, []);

    useEffect(() => {
        const productId = id;
        API({
            method: 'get',
            url: `/favourite/favourite/${productId}`,
        }).then((res) => {
            if (res.data.status === 200) {
                setRefershLike(true)
            }
        })
    }, [id]);


    var count = 0;
    var productList = ""

    count = 0;



    //fixx
    productList = viewProduct.map((item) => {
        if (count < 6 && id != item.id && item.trangThai === 1 && item.soLuongM > 0 && item.soLuongL > 0 && item.soLuongXL > 0) {
            count = count + 1;
            return (
                <li key={item.id} >
                    <div className="flexbox-grid-default">
                        <div className="abc flexbox-auto-100px">
                            <Link to={`/${item.TheLoai.ten}/${item.id}`}>
                                <img className="dt-width-100" width="100" height="100" src={`http://localhost:4000/${item.hinh}`} />
                            </Link>
                        </div>
                        <div className="flexbox-content pd-l-10">
                            <Link to={`/${item.TheLoai.ten}/${item.id}`}>
                                <h2>{item.ten}</h2>
                                <p className="product-box-price-related clearfix flexbox-grid-default">
                                    {
                                        item.KhuyenMai ?
                                            <>
                                                <span className="price-new-related flexbox-content text-left"> {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.giaGiam)}</span>
                                                <del className="price-old-related flexbox-content">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.giaTien)}</del>
                                            </> :
                                            <span className="price-new-related flexbox-content text-left">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.giaGiam)}</span>
                                    }
                                </p>
                            </Link>
                        </div>
                    </div>
                </li>
            )
        }
    })

    const [stars, setStars] = useState([]);
    useEffect(() => {
        API({
            method: 'get',
            url: 'evaluate/show-star',
        }).then((res) => {
            setStars(res.data.stars);
            console.log(res.data)
        })
    }, []);

    let evaluate = [];
    evaluate.push(
        stars
            .map((star) => {
                if (star.SanPhamId == product.id) return star.danhGia;
            })
            .filter((value) => value !== undefined)
    );
    const evaluates = evaluate[0];
    var sumStar = 0;
    for (let i = 0; i < evaluates.length; i++) {
        sumStar += evaluates[i];
    }
    sumStar = sumStar / evaluates.length;
    console.log(sumStar);
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

    //xử lý sự kiện thay đổi hình ảnh
    const hanldeImg = () => {
        setViewImg(1);
    }
    const hanldeImg2 = () => {
        setViewImg(2);
    }
    const hanldeImg3 = () => {
        setViewImg(3);
    }
    const hanldeImg4 = () => {
        setViewImg(4);
    }
    var bigImg = (<div className="product__img--big">
        <img src={`http://localhost:4000/${product.hinh}`} className="product__img--index" alt={product.name} />
    </div>)
    if (viewImg === 1) {
        bigImg = (<div className="product__img--big">
            <img src={`http://localhost:4000/${product.hinh}`} className="product__img--index" alt={product.name} />
        </div>)
    }
    else if (viewImg === 2) {
        bigImg = (<div className="product__img--big">
            <img src={`http://localhost:4000/${product.hinh2}`} className="product__img--index" alt={product.name} />
        </div>)
    }
    else if (viewImg === 3) {
        bigImg = (<div className="product__img--big">
            <img src={`http://localhost:4000/${product.hinh3}`} className="product__img--index" alt={product.name} />
        </div>)
    }
    else if (viewImg === 4) {
        bigImg = (<div className="product__img--big">
            <img src={`http://localhost:4000/${product.hinh4}`} className="product__img--index" alt={product.name} />
        </div>)
    }



    //xử lý onclick giỏ hàng
    const submitAddtocart = (e) => {
        e.preventDefault();
        if (radioValue == "1") {
            Swal.fire({
                icon: 'warning',
                text: "Vui lòng chọn kích thước",
                confirmButtonText: 'Đóng'
            })
            return;
        }
        if (quantity <= 0) {
            Swal.fire({
                icon: 'warning',
                text: "Số lượng ít nhất là 1",
                confirmButtonText: 'Đóng'
            })
            return;
        }
        const data = {
            productId: product.id,
            size: radioValue,
            product_qty: quantity,
        }

        API({
            method: 'post',
            url: 'cart/add-to-cart',
            data: data
        }).then((res) => {
            if (res.data.status == 200) {
                setRefersh(!refersh)
                console.log(res.data)
                Swal.fire({
                    text: res.data.message,
                    icon: 'success',
                    confirmButtonText: 'Đóng'
                })
            }
            else if (res.data.status == 409) {
                Swal.fire({
                    icon: 'success',
                    text: res.data.message,
                    confirmButtonText: 'Đóng'
                })
            }
            else if (res.data.status == 401) {
                Swal.fire({
                    icon: 'error',
                    text: res.data.message,
                    confirmButtonText: 'Đóng'
                })
                history('/login')
            }
            else if (res.data.status == 404) {
                Swal.fire({
                    icon: 'warning',
                    text: res.data.message,
                    confirmButtonText: 'Đóng'
                })
            }
        })


    }

    //xử lý onclick mua ngay
    const submitAddtocartPay = (e) => {
        e.preventDefault();
        if (radioValue == "1") {
            Swal.fire({
                icon: 'warning',
                text: "Vui lòng chọn kích thước",
                confirmButtonText: 'Đóng'
            })
            return;
        }
        if (quantity <= 0) {
            Swal.fire({
                icon: 'warning',
                text: "Số lượng ít nhất là 1",
                confirmButtonText: 'Đóng'
            })
            return;
        }
        const data = {
            productId: product.id,
            size: radioValue,
            product_qty: quantity,
        }

        API({
            method: 'post',
            url: 'cart/add-to-cart',
            data: data
        }).then((res) => {
            if (res.data.status == 200) {
                setRefersh(!refersh)
                console.log(res.data)
                Swal.fire({
                    text: res.data.message,
                    icon: 'success',
                    confirmButtonText: 'Đóng'
                })
                history('/cart')
            }
            else if (res.data.status == 409) {
                Swal.fire({
                    icon: 'success',
                    text: res.data.message,
                    confirmButtonText: 'Đóng'
                })
                history('/cart')

            }
            else if (res.data.status == 401) {
                Swal.fire({
                    icon: 'error',
                    text: res.data.message,
                    confirmButtonText: 'Đóng'
                })
                history('/login')
            }
            else if (res.data.status == 404) {
                Swal.fire({
                    icon: 'warning',
                    text: res.data.message,
                    confirmButtonText: 'Đóng'
                })
            }
        })

    }

    //Xử lý còn sản phẩm không 
    var buttonQuantity = "";
    if (quantity > 0) {
        buttonQuantity = (<>
            <input type="button" value="-" onClick={hanldeMinusQuantity} className="qty-btn" />
            <div className="qty-btn fs-4 text text-center lh-lg p-2">{radioValue == 1 ? "" : quantity}</div>
            <input type="button" value="+" onClick={hanldePlusQuantity} className="qty-btn" />
        </>)
    }
    else {
        buttonQuantity = <h2>size này không còn sản phẩm</h2>
    }

    const handleLike = () => {
        const productId = id;
        setRefershLike(!refershLike)
        API({
            method: "put",
            url: `favourite/favourite/${productId}`
        }).then((res) => {
            if (res.data.status === 200) {

            }
            else if (res.data.status === 401) {
                Swal.fire({
                    icon: 'warning',
                    text: res.data.message,
                    confirmButtonText: 'Đóng'
                })
                history('/login')
            }
        });
    }
    console.log(product)
    return (
        <>
            <div className="container">
                <div className="grid wide">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pd5">
                            <div className="app__container--category">
                                <Link to="/" className="app__container--link">Trang chủ</Link>
                                <FontAwesomeIcon icon={faChevronRight} />
                                <Link to={`/category/${categoryName}`} className="app__container--link">{categoryName}</Link>
                                <FontAwesomeIcon icon={faChevronRight} />
                                <p className="app__container--text">{product.ten}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid wide">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 2 container__product">
                            <ul className="product__img--list">
                                <li className="product__img--item">
                                    <img src={`http://localhost:4000/${product.hinh}`} onClick={hanldeImg} className="product__img--image" alt={product.name} />
                                </li>
                                <li className="product__img--item">
                                    <img src={`http://localhost:4000/${product.hinh2}`} onClick={hanldeImg2} className="product__img--image" alt={product.name} />
                                </li>
                                <li className="product__img--item">
                                    <img src={`http://localhost:4000/${product.hinh3}`} onClick={hanldeImg3} className="product__img--image" alt={product.name} />
                                </li>
                                <li className="product__img--item">
                                    <img src={`http://localhost:4000/${product.hinh4}`} onClick={hanldeImg4} className="product__img--image" alt={product.name} />
                                </li>
                            </ul>
                            {bigImg}
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 pd5 information-product"style={{marginBottom:"10px"}} >
                            <div className="product-title">
                                <h1>{product.ten}</h1>
                            </div>
                            <div className="content__product-evaluate">
                                {starIcons}
                            </div>
                            <div className="product-price" id="price-preview">
                                {
                                    product.KhuyenMai ?
                                        <>
                                            <h2 className="error">
                                                {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.giaGiam)}
                                            </h2>
                                            <del>
                                                <h4>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.giaTien)}</h4>
                                            </del>
                                        </> :
                                        <h2 className="error">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.giaTien)}</h2>
                                }
                            </div>
                            <form id="add-item-form" action="/cart/add" method="post" className="variants clearfix variant-style">
                                <div>

                                    <ButtonGroup>
                                        {radios.map((radio, idx) => (
                                            <ToggleButton
                                                key={idx}
                                                id={`radio-${idx}`}
                                                type="radio"
                                                variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                                                name="radio"
                                                value={radio.value}
                                                checked={radioValue === radio.value}
                                                onChange={(e) => setRadioValue(e.currentTarget.value, setQuantity(0))}
                                                className="fs-4 text"
                                                style={{ marginLeft: "20px", width: "40px", height: "40px", lineHeight: "30px", borderRadius: "50%", fontWeight: "bold" }}
                                            >
                                                {radio.name}
                                            </ToggleButton>
                                        ))}
                                    </ButtonGroup>

                                </div>
                                <div>

                                    <div className="select-wrapper clearfix fs-4 text" style={{ padding: "15px 0" }}>
                                        <div style={{ padding: "10px 0" }}>Màu sắc:<span
                                            style={{ border: "1px solid #5ec9ff", background: "#5ec9ff", color: "white", borderRadius: "5px", padding: "5px", textAlign: "center", fontWeight: 600, margin: "0 10px" }}
                                            className="fs-4 text"
                                        >
                                            {product.MauSac?.ten}
                                        </span></div>
                                        <div style={{ paddingTop: "10px",paddingBottom:"20px" }}>Chất liệu:<span
                                            style={{ border: "1px solid #5ec9ff", background: "#5ec9ff", color: "white", borderRadius: "5px", padding: "5px", textAlign: "center", fontWeight: 600, margin: "0 10px" }}
                                            className="fs-4 text"
                                        >
                                            {product.ChatLieu?.ten}
                                        </span></div>
                                        <label>Số lượng: </label>
                                        {
                                            radios.map((radio, idx) => (
                                                idx === 0 ?
                                                    <span
                                                        style={{ border: "1px solid #5ec9ff", background: "#5ec9ff", color: "white", borderRadius: "5px", padding: "5px", textAlign: "center", fontWeight: 600, margin: "0 10px" }}
                                                        className="fs-4 text"
                                                    >
                                                        {" " + radio.name + ":" + " " + product.soLuongM}
                                                    </span> :
                                                    idx === 1 ?
                                                        <span style={{ border: "1px solid #5ec9ff", background: "#5ec9ff", color: "white", borderRadius: "5px", padding: "5px", textAlign: "center", fontWeight: 600, margin: "0 10px" }} className="fs-4 text">{" " + radio.name + ":" + " " + product.soLuongL}
                                                        </span> :
                                                        idx === 2 ?
                                                            <span style={{ border: "1px solid #5ec9ff", background: "#5ec9ff", color: "white", borderRadius: "5px", padding: "5px", textAlign: "center", fontWeight: 600, margin: "0 10px" }} className="fs-4 text">
                                                                {" " + radio.name + ":" + " " + product.soLuongXL}
                                                            </span> : ""
                                            ))}

                                        <div className="input-group fs-4 text">
                                            <input type="button" value="-" onClick={hanldeMinusQuantity} className="qty-btn" />
                                            <div className="qty-btn fs-4 text text-center lh-lg p-2">{radioValue == 1 ? "" : quantity}</div>
                                            <input type="button" value="+" onClick={hanldePlusQuantity} className="qty-btn" />
                                        </div>
                                        <div className="input-group fs-4 text " >
                                            {
                                                refershLike ?
                                                    <FavoriteIcon style={{ color: 'red', fontSize: "40px" }} onClick={(e) => handleLike(e)} /> :
                                                    <FavoriteIcon
                                                        FavoriteIcon style={{ color: 'gray', fontSize: "40px" }} onClick={(e) => handleLike(e)} />}
                                        </div>
                                    </div>
                                    <div className="clearfix button__buy" style={{marginTop:"0"}}>
                                        <button type="button" onClick={submitAddtocart} className="btn-style-add add-to-cart btn__cart">
                                            <FontAwesomeIcon className="button__buy--icon" icon={faCartShopping} />
                                            <span className="txt">Thêm vào giỏ</span>
                                        </button>
                                        <button type="button" onClick={submitAddtocartPay} className="btn-style-add add-to-cart btn__cart">
                                            <FontAwesomeIcon className="button__buy--icon" icon={faCheck} />
                                            <span className="txt">Mua ngay</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-xs-12 pd-none-box-service mb15 fs-4 text">
                            <div className="box-service-product">
                                <div className="header-box-service-product text-center">
                                    <div className="title">TIẾP ĐÓN</div>
                                    <div className="content">Được phục vụ Quý Khách hàng là niềm vinh dự đối với chúng tôi.</div>
                                </div>
                                <div className="content-box-service-product row">
                                    <div className="col-lg-12 col-sm-3 col-xs-12">
                                        <div className="border-service-product">
                                            <div className="flexbox-grid-default">
                                                <div className="documents__content-icon">
                                                    <FontAwesomeIcon icon={faTruckMoving} />
                                                </div>
                                                <div className="flexbox-content des-service-product">
                                                    <div className="title">GIAO HÀNG TOÀN QUỐC</div>
                                                    <div className="content">Thời gian giao hàng linh động từ 3 - 4 - 5 ngày tùy khu vực, đôi khi sẽ nhanh hơn hoặc chậm hơn. Mong Quý Khách hàng thông cảm và cố gắng đợi hàng giúp shop.</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-sm-3 col-xs-12">
                                        <div className="border-service-product">
                                            <div className="flexbox-grid-default">
                                                <div className="documents__content-icon">
                                                    <FontAwesomeIcon icon={faSync} />
                                                </div>
                                                <div className="flexbox-content des-service-product">
                                                    <div className="title">CHÍNH SÁCH ĐỔI TRẢ HÀNG</div>
                                                    <div className="content">Sản phẩm được phép đổi hàng trong vòng 36h nếu phát sinh lỗi từ nhà sản xuất (Yêu cầu: hình ảnh phần bị lỗi rõ nét, chi tiết và đầy đủ).</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-sm-3 col-xs-12">
                                        <div className="border-service-product">
                                            <div className="flexbox-grid-default">
                                                <div className="documents__content-icon">
                                                    <FontAwesomeIcon icon={faHandHoldingUsd} />
                                                </div>
                                                <div className="flexbox-content des-service-product">
                                                    <div className="title">GIAO HÀNG NHẬN TIỀN VÀ KIỂM KÊ ĐƠN HÀNG</div>
                                                    <div className="content">Được phép kiểm hàng trước khi thanh toán. Lưu ý: Trường hợp Quý Khách hàng đã nhận hàng về nhà, vui lòng quay video unbox đơn hàng trong tình trạng nguyên vẹn để có căn cứ xác thực đơn hàng gặp phải vấn đề, trường hợp không có video shop không thể hỗ trợ.</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-sm-3 col-xs-12">
                                        <div className="border-service-product">
                                            <div className="flexbox-grid-default">
                                                <div className="documents__content-icon">
                                                    <FontAwesomeIcon icon={faPhoneVolume} />
                                                </div>
                                                <div className="flexbox-content des-service-product">
                                                    <div className="title">ĐẶT HÀNG ONLINE VÀ KIỂM TRA ĐƠN HÀNG VUI LÒNG LIÊN HỆ</div>
                                                    <div className="content">037 335 7405</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8 col-xs-12 pd5 fs-4 text">
                            <div className="product__description">
                                <div className="product__comment">
                                    <h2>MÔ TẢ SẢN PHẨM</h2>
                                </div>
                                <div className="product__comment--description" style={{ padding: "5px" }}>
                                    <p className="">{product.moTa}
                                    </p>
                                    <img src={img1} width="600" height="600" className="dt-width-auto"></img>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-xs-12 pd5">
                            <div className="product__description">
                                <div className="product__comment">
                                    <h2>SẢN PHẨM LIÊN QUAN</h2>
                                </div>
                                <ul className="list-product-related">
                                    {productList}
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-8 col-xs-12 pd5">
                            <CommentApp productId={product.id} authName={authState.hoTen && authState.hoTen} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-sm-12 col-xs-12 box__banner mb15">
                            <div className=" ">
                                <div className="box-banner-index text-center mb15">
                                    <Link to="/category/t-shirts">
                                        <img src={img2} width="360" height="200" alt="banner 2" title="banner 2" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-12 col-xs-12 box__banner mb15">
                            <div className=" ">
                                <div className="box-banner-index text-center mb15">
                                    <Link to="/category/t-shirts">
                                        <img src={img3} className="dt-width-100 lazyloaded" width="360" height="200" alt="banner 3" title="banner 3" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-12 col-xs-12 box__banner mb15">
                            <div className=" ">
                                <div className="box-banner-index text-center mb15">
                                    <Link to="/category/t-shirts">
                                        <img src={img4} className="dt-width-100 lazyloaded" width="360" height="200" alt="banner 1" title="banner 1" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ >
    );
}

export default ProductDetails;