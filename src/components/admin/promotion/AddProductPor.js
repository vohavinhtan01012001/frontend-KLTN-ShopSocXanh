import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import swal from 'sweetalert';

function AddProductPor() {
    const [loading, setLoading] = useState(true);
    const [viewProduct, setProduct] = useState([]);
    const [message, setMessage] = useState('');
    const [promotionInput, setPromotion] = useState([]);
    const [promotionList, setPromotionList] = useState([]);

    //Xử lý search
    const handleInput = (e) => {
        if (e.key === 'Enter') {
            setMessage(e.target.value);
        }
    }

    const slug = message;
    useEffect(() => {
        document.title ="Thêm chương trình khuyến mãi";
        if (slug != "") {
            axios.get(`/api/search/${slug}`).then(res => {
                if (res.data.status === 200) {
                    setProduct(res.data.product);
                }
                else if (res.data.status === 404) {

                }
            });
        }
    }, [message])

    //Xử lý xuất dữ liệu
    useEffect(() => {
        let isMounted = true;
        document.title = "Shop sóc xanh";

        axios.get(`/api/view-product`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setProduct(res.data.products);
                    setLoading(false);
                }
            }
        });
        return () => {
            isMounted = false
        };
    }, []);



    //Xử lý promotion
    useEffect(() => {
        let isMounted = true;
        axios.get(`/api/view-promotion`).then(res => {
            if (isMounted) {
                if (res.status === 200) {
                    setPromotionList(res.data.promotion)
                }
            }
        });

        return () => {
            isMounted = false
        };

    }, []);


    const checkValue = (e) => {
        if (e.target.checked == true) {
            setPromotion([...promotionInput, e.target.value])
        }
    }

    const { id } = useParams();
    const submitProduct = (e) => {
        e.preventDefault();
        const promotion_id = id;
        const data = {
            promotion_id: promotion_id,
        }
        for (let i = 0; i < promotionInput.length; i++) {
            axios.put(`api/upload-productPro/${promotionInput[i]}`, data).then(res => {
                if (res.data.status === 200) {
                    swal('Success', res.data.message, "success");
                }
                else if (res.data.status === 422) {
                    swal('All fields are mandetory', "", "error");
                }
                else if (res.data.status === 404) {
                    swal('error', res.data.message, "error");
                }
            });
        }
    }

    var display_Productdata = "";
    if (loading) {
        return <Loading />
    }
    else {
        display_Productdata = viewProduct.map((item, index) => {
            return (
                item.promotion_id == id ? "" :
                    (<tr id={item.id} key={index}>
                        <td><input
                            type="checkbox"
                            name="checkbox"
                            onChange={checkValue}
                            value={item.id}
                            style ={{width:"20px",height:"20px"}}
                        /></td>
                        <td className='fs-4 text'>{item.id}</td>
                        <td className='fs-4 text'>{item.name}</td>
                        <td className='fs-4 text'>{item.categorys.name}</td>
                        <td className='fs-4 text'>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</td>
                        <td><img src={`http://localhost:8000/${item.image}`} width="50px" alt={item.name} /></td>
                    </tr >)
            )
        });
    }

    return (
        <div className="container px-4">
            <input type="text" placeholder="Nhập tên sản phẩm cần tìm kiếm..." className="admin__search--input" style={{ margin: "20px", marginLeft: "0" }} onKeyDown={handleInput} />

            <div className="card mt-4">
                <div className="card-header">
                    <h2>Thêm Sản phẩm áp dụng &nbsp;
                        {promotionList.map(item => {
                            return item.id == id ? item.title : "";
                        })}
                        <Link to="/admin/view-promotion" className="btn btn-primary btn-sm float-end  fs-4 text">Quay lại</Link>
                    </h2>
                </div>
                <div className="card-body">
                    <form onSubmit={submitProduct} >
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Mã sản phẩm</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Loại sản phẩm</th>
                                    <th>Giá bán</th>
                                    <th>Hình ảnh</th>
                                </tr>
                            </thead>
                            <tbody>
                                {display_Productdata}
                            </tbody>
                        </table>
                        <button type="submit" className="btn btn-primary btn-lg px-4 float-end  fs-4 text">Thêm</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddProductPor;