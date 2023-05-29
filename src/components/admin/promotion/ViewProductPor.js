import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import swal from "sweetalert";

function ViewProductPor() {
    const [loading, setLoading] = useState(true);
    const [viewProduct, setProduct] = useState([]);
    const { id } = useParams();
    const [promotionList, setPromotionList] = useState([]);
    const [message, setMessage] = useState('');

    //Xử lý search
    const handleInput = (e) => {
        if (e.key === 'Enter') {
            setMessage(e.target.value);
        }
    }

    const slug = message;
    useEffect(() => {
        document.title ="Danh sách sản phẩm";
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
    const deletePromotionId = (e, id) => {
        e.preventDefault();
        const thisclicked = e.target.closest('tr');
        axios.put(`/api/delete-productPro/${id}`).then(res => {
            if (res.data.status === 200) {
                thisclicked.closest("tr").remove();
            }
        })
    }
    const promotion_id = id;
    var display_Productdata = "";
    if (loading) {
        return <Loading />
    }
    else {
        display_Productdata = viewProduct.map((item, index) => {
            return (
                item.promotion_id == promotion_id ?
                    <tr id={item.id} key={index}>
                        <td className='fs-4 text'>{item.id}</td>
                        <td className='fs-4 text'>{item.name}</td>
                        <td className='fs-4 text'>{item.categorys.name}</td>
                        <td className='fs-4 text'>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</td>
                        <td><img src={`http://localhost:8000/${item.image}`} width="50px" alt={item.name} /></td>
                        <td>
                            <button type="button" onClick={(e) => {
                                swal({
                                    title: "Thông báo!",
                                    text: "Bạn có chắc muốn xóa không!",
                                    icon: "warning",
                                    buttons: [
                                        'Không',
                                        'Có'
                                    ],
                                    dangerMode: true,
                                }).then(function (isConfirm) {
                                    if (isConfirm) {
                                        swal({
                                            title: 'Thành công!',
                                            text: 'Đã xóa thành công!',
                                            icon: 'success'
                                        }).then(function () {
                                            deletePromotionId(e, item.id);
                                        });
                                    } else {

                                    }
                                })
                            }} className='btn btn-danger btn-sm fs-4 text'>Xóa</button></td>
                    </tr >
                    : ""
            )
        });
    }
    return (
        <div className="container px-4">
            <input type="text" placeholder="Nhập tên sản phẩm cần tìm kiếm..." className="admin__search--input" style={{ margin: "20px", marginLeft: "0" }} onKeyDown={handleInput} />
            <div className="card mt-4">
                <div className="card-header">
                    <h2>Danh sách sản phẩm áp dụng &nbsp;
                        {promotionList.map(item => {
                            return item.id == promotion_id ? item.title : "";
                        })}
                        <Link to="/admin/view-promotion" className="btn btn-primary btn-sm float-end  fs-4 text">Quay lại</Link>
                    </h2>
                </div>
                <div className="card-body">
                    <form /* onSubmit={submitProduct}  */>
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
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
                        <Link to={`../upload-productPor/${promotion_id}`} className="btn btn-success btn-lg">Thêm sản phẩm </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ViewProductPor;