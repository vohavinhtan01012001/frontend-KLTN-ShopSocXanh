import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../Loading";
import API from "../../../API";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

function ViewProductPor() {
    const [loading, setLoading] = useState(true);
    const [viewProduct, setProduct] = useState([]);
    const { id } = useParams();
    const [promotion, setPromotion] = useState([]);
    const [message, setMessage] = useState('');
    const [refersh, setRefersh] = useState(false)

    //Xử lý search
    const handleInput = (e) => {
        if (e.key === 'Enter') {
            setMessage(e.target.value);
        }
    }

    /*  const slug = message;
     useEffect(() => {
         if (slug != "") {
             axios.get(`/api/search/${slug}`).then(res => {
                 if (res.data.status === 200) {
                     setProduct(res.data.product);
                 }
                 else if (res.data.status === 404) {
 
                 }
             });
         }
     }, [message]) */

    //Xử lý promotion
    useEffect(() => {
        console.log(id);
        API({
            method: 'get',
            url: `admin-promotion/show-promotion/${id}`,
        },)
            .then((res) => {
                setPromotion(res.data.promotion)
            }).catch((err) => {
                console.log(err);
                Swal.fire({
                    icon: 'warning',
                    title: 'Error',
                    confirmButtonText: 'Đóng'
                })
            });
    }, [id]);

    //Xử lý xuất dữ liệu
    useEffect(() => {
        API({
            method: 'get',
            url: `/admin-Promotion/show-listProduct/${id}`,
        }).then((res) => {
            if (res.status === 200) {
                setProduct(res.data.products)
                setLoading(false);
                console.log(res.data.products)
            }
            else {
                Swal.fire({
                    text: 'Lỗi server',
                    icon: 'warning',
                    confirmButtonText: 'Đóng'
                })
            }
        })
    }, [id, refersh])
    /* const deletePromotionId = (e, id) => {
        e.preventDefault();
        const thisclicked = e.target.closest('tr');
        axios.put(`/api/delete-productPro/${id}`).then(res => {
            if (res.data.status === 200) {
                thisclicked.closest("tr").remove();
            }
        })
    } */
    //Xử lý xóa
    const deleteProduct = (e, productId) => {
        e.preventDefault();
        API({
            method: 'put',
            url: `/admin-promotion/detele-idPromotion`,
            data: { id: productId }
        }).then((res) => {
            setRefersh(!refersh)
            Swal.fire(
                'Thành công!',
                'Đã xóa thành công!',
                'success'
            )
        }).catch((err) => {
            console.log(err);
            Swal.fire({
                icon: 'warning',
                title: 'Lỗi server',
                confirmButtonText: 'Đóng'
            })
        });
    }

    const formatMoney = (value) => {
        return value.toLocaleString('vi-VN') + ' VNĐ';
    };
    var display_Productdata = "";
    if (loading) {
        return <Loading />
    }
    else {
        display_Productdata = viewProduct.map((item, index) => {
            return (
                <TableRow
                    sx={{ '&:last-child tr, &:last-child th': { fontSize: '16px' } }}
                    id={item.id}
                    key={index}
                >
                    <TableCell
                        sx={{ fontSize: "16px" }}
                        align="right" component="th"
                        scope="row"
                    >
                        {item.id}
                    </TableCell>
                    <TableCell
                        sx={{ fontSize: "16px", width: '250px' }}
                        align="right"
                        component="th"
                        scope="row"

                    >
                        {item.ten}
                    </TableCell>
                    <TableCell
                        sx={{ fontSize: "16px" }}
                        align="right"
                        component="th"
                        scope="row"
                    >
                        {item.TheLoai.ten}
                    </TableCell>
                    <TableCell
                        sx={{ fontSize: "16px" }}
                        align="right"
                        component="th"
                        scope="row"
                    >
                        {item.ThuongHieu.ten}
                    </TableCell>
                    <TableCell
                        sx={{ fontSize: "16px" }}
                        align="right"
                        component="th"
                        scope="row"
                        width={200}
                    >
                        {formatMoney(item.giaTien)}
                    </TableCell>
                    <TableCell
                        sx={{ fontSize: "16px" }}
                        align="right"
                        component="th"
                        scope="row"
                        width={250}
                    >
                        {item.KhuyenMai ? item.KhuyenMai.tieuDe : <p style={{ color: "red" }}>Chưa có</p>}
                    </TableCell>
                    <TableCell
                        sx={{ fontSize: "16px" }}
                        align="right"
                        component="th"
                        scope="row"
                    >
                        {formatMoney(item.giaGiam)}
                    </TableCell>
                    <TableCell
                        sx={{ fontSize: "16px" }}
                        align="right"
                        component="th"
                        scope="row"
                    >
                        {item.mauSac}
                    </TableCell>

                    <TableCell
                        sx={{ fontSize: "16px" }}
                        align="right"
                        component="th"
                        scope="row"
                    >
                        <img src={`http://localhost:4000/${item.hinh}`} alt={item.ten} width={70} />
                    </TableCell>
                    <TableCell
                        sx={{ fontSize: "16px" }}
                        align="right"
                        component="th"
                        scope="row"
                    >
                        {
                            item.soLuongL == 0 &&
                                item.soLuongM == 0 &&
                                item.soLuongXL == 0 ?
                                <p style={{ color: 'red', fontWeight: "bold" }}>
                                    <ClearIcon color='#0ccf0f' style={{ fontSize: "35px", fontWeight: "800" }} />
                                </p>
                                :
                                <p style={{ color: '#0ccf0f', fontWeight: "bold" }}>
                                    <CheckIcon color='#0ccf0f' style={{ fontSize: "35px", fontWeight: "800" }} />
                                </p>
                        }
                    </TableCell>
                    <TableCell
                        sx={{ fontSize: "16px" }}
                        align="right"
                        component="th"
                        scope="row"
                    >
                        {
                            item.trangThai == 0 ?
                                <p style={{ color: 'red', fontWeight: "bold" }}>
                                    <ClearIcon color='#0ccf0f' style={{ fontSize: "35px", fontWeight: "800" }} />
                                </p>
                                :
                                <p style={{ color: '#0ccf0f', fontWeight: "bold" }}>
                                    <CheckIcon color='#0ccf0f' style={{ fontSize: "35px", fontWeight: "800" }} />
                                </p>
                        }
                    </TableCell>
                    <TableCell
                        sx={{ fontSize: "16px" }}
                        align="right"
                        component="th"
                        scope="row"
                    >
                        <button
                            className='btn btn-primary btn-lg'
                            style={{ border: "0px", background: "none" }}
                            onClick={(e) => {
                                Swal.fire({
                                    text: "Bạn có chắc muốn xóa không?",
                                    icon: 'question',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Đồng ý!',
                                    cancelButtonText: 'Đóng',
                                }).then((result) => {
                                    if (result.isConfirmed) {

                                        deleteProduct(e, item.id);
                                    }
                                })
                            }}
                        >
                            <DeleteForeverIcon style={{ fontSize: "30px", color: "red" }} />
                        </button>
                    </TableCell>
                </TableRow>
            )
        });
    }
    return (
        <div className="container px-4">
            <input
                type="text"
                placeholder="Nhập tên sản phẩm cần tìm kiếm..."
                className="admin__search--input"
                style={{ margin: "20px", marginLeft: "0" }}
                onKeyDown={handleInput}
            />
            <div className="card-header" style={{ padding: "30px" }}>
                <h2>Danh sách sản phẩm áp dụng khuyến mãi &nbsp;"
                    {promotion ? promotion.tieuDe : ""}"
                    <Link to="/admin/view-promotion" className="btn btn-primary btn-lg float-end  fs-4 text">Quay lại</Link>
                </h2>
            </div>
            {
                viewProduct.length > 0 ? (
                    <TableContainer component={Paper} className='container' style={{ padding: "10px 20px", background: "#f8f9fa" }}>
                        <Table sx={{ minWidth: 650, fontSize: "16px" }} aria-label="caption table">
                            <TableHead >
                                <TableRow sx={{ '&:last-child tr, &:last-child th': { fontSize: '16px', fontWeight: "600" } }}>
                                    <TableCell align="right">Mã</TableCell>
                                    <TableCell align="right" >Tên</TableCell>
                                    <TableCell align="right">Loại</TableCell>
                                    <TableCell align="right">Thương hiệu</TableCell>
                                    <TableCell align="right" width={150}>Giá gốc</TableCell>
                                    <TableCell align="right">Khuyến mãi</TableCell>
                                    <TableCell align="right" width={150}>Giá đã giảm</TableCell>
                                    <TableCell align="right">Màu sắc</TableCell>
                                    <TableCell align="right" width={100}>Hình ảnh</TableCell>
                                    <TableCell align="right" width={120}>Trạng thái</TableCell>
                                    <TableCell align="right" width={120}>Hoạt động</TableCell>
                                    <TableCell align="right" width={120}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {display_Productdata}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : <h1 style={{ color: "red" }}>Chưa có sản phẩm áp dụng khuyến mãi</h1>
            }
        </div>
    );
}

export default ViewProductPor;