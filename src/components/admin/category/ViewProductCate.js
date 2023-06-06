import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import API from '../../../API';
import Swal from 'sweetalert2';
import Loading from '../../Loading';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from 'react-bootstrap/Pagination';
import Button from '@mui/material/Button';

function ViewProductCate() {
    const history = useNavigate();
    const [loading, setLoading] = useState(true);
    const [viewProduct, setProduct] = useState([]);
    const [category, setCategory] = useState();
    const [refersh, setRefersh] = useState(false)
    const [message, setMessage] = useState('');


    //Xử lý search
    const handleInput = (e) => {
        if (e.key === 'Enter') {
            setMessage(e.target.value);
        }
    }

    /* const slug = message;
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

    //phân trang
    /*     const [currentPage, setCurrentPage] = useState(1);
    
        const currentTableData = useMemo(() => {
            const firstPageIndex = (currentPage - 1) * PageSize;
            const lastPageIndex = firstPageIndex + PageSize;
            return viewProduct ? viewProduct.slice(firstPageIndex, lastPageIndex) : "";
        }, [currentPage, viewProduct]); */


    const idCategory = useParams();
    useEffect(() => {
        const id = idCategory.id;
        API({
            method: 'get',
            url: `/admin-category/show-category/${id}`,
        }).then((res) => {
            if (res.status === 200) {
                setCategory(res.data.category);
                setLoading(false);
            }
        });
    }, [idCategory.id, refersh]);

    useEffect(() => {
        const id = idCategory.id;
        console.log(id);
        API({
            method: 'get',
            url: `/admin-category/show-product/${id}`,
        }).then((res) => {
            if (res.status === 200) {
                setProduct(res.data.products);
                setLoading(false);
                console.log(res.data.products);
            }
        });
    }, [idCategory.id, refersh]);

    //Xử lý xóa product
    const deleteProduct = (e, id) => {
        e.preventDefault();
        API({
            method: 'delete',
            url: `/admin-product/delete-product`,
            data: { id: id }
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

    //Xử lý xóa category
    const deleteCategory = (e) => {
        e.preventDefault();
        const id = idCategory.id;
        if (indexA > 0) {
            Swal.fire({
                icon: 'warning',
                text: `Còn sản phẩm trong loại ${category ? category.ten : ""} nên không xóa được `,
                confirmButtonText: 'Đóng'
            })
            return
        }
        API({
            method: 'delete',
            url: `/admin-category/delete-category/${id}`,
        }).then((res) => {
            if (res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    text: 'Xóa Thành công!',
                    confirmButtonText: 'Đóng'
                })
            }
            history('/admin/view-category');
        }).catch((err, res) => {
            console.log(res)
            Swal.fire({
                icon: 'warning',
                text: 'Còn sản phẩm trong loại sản phẩm!',
                confirmButtonText: 'Đóng'
            })
        })
    }

    const formatMoney = (value) => {
        return value.toLocaleString('vi-VN') + ' VNĐ';
    };


    const { id } = useParams();
    const category_id = id;
    var display_Productdata = "";
    var display_DeleteButton = "";
    var indexA = 0;
    var role = 1;
    if (loading) {
        return <Loading />
    }
    else {
        if (viewProduct.length > 0) {
            if (role == 1) {
                display_Productdata = viewProduct.map((item, index) => {
                    console.log(item.mauSac)
                    indexA++;
                    return (
                        <TableRow
                            sx={{ '&:last-child tr, &:last-child th': { fontSize: '16px' } }}
                            id={item.id}
                            key={index}

                        >
                            <TableCell
                                sx={{ fontSize: "16px" }}
                                component="th"
                                scope="row"
                            >
                                {index + 1}
                            </TableCell>
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
                            >
                                {item.KhuyenMai ? item.KhuyenMai.giamGia + "%" : "0%"}
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
                                {item.soLuongM}
                            </TableCell>
                            <TableCell
                                sx={{ fontSize: "16px" }}
                                align="right"
                                component="th"
                                scope="row"
                            >{item.soLuongL}</TableCell>
                            <TableCell
                                sx={{ fontSize: "16px" }}
                                align="right"
                                component="th"
                                scope="row"
                            >
                                {item.soLuongXL}
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
                                sx={{ fontSize: "16px", width: "100px" }}
                                align="right"
                                component="th"
                                scope="row"
                            >
                                <Link
                                    to={`/admin/edit-product/${item.id}`}

                                >
                                    <DriveFileRenameOutlineIcon style={{ fontSize: "30px", color: "#5ec9ff" }} />
                                </Link>
                            </TableCell>
                            <TableCell
                                sx={{ fontSize: "16px" }}
                                align="right"
                                component="th"
                                scope="row"
                            >
                                <button
                                    style={{ border: "0px", background: "none" }}
                                    onClick={(e) => {
                                        Swal.fire({
                                            text: "Bạn có chắc muốn xóa không?",
                                            icon: 'question',
                                            showCancelButton: true,
                                            confirmButtonColor: '#3085d6',
                                            cancelButtonColor: '#d33',
                                            confirmButtonText: 'Đồng ý!'
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
                display_DeleteButton = (<button type="button" onClick={(e) => {
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

                            deleteCategory(e);
                        }
                    })
                }} className='btn btn-danger btn-lg fs-4 text float-end p-3'>Xóa Loại sản phẩm</button>)

            }
            else {
                display_Productdata = viewProduct.map((item, index) => {
                    if (item.category_id == category_id) {
                        indexA++;
                        return (
                            <TableRow
                                sx={{ '&:last-child tr, &:last-child th': { fontSize: '16px' } }}
                                id={item.id}
                                key={index}

                            >
                                <TableCell
                                    sx={{ fontSize: "16px" }}
                                    component="th"
                                    scope="row"
                                >
                                    {index + 1}
                                </TableCell>
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
                                >
                                    {item.KhuyenMai ? item.KhuyenMai.giamGia + "%" : "0%"}
                                </TableCell>
                                <TableCell
                                    sx={{ fontSize: "16px" }}
                                    align="right"
                                    component="th"
                                    scope="row"
                                >
                                    {formatMoney(item.giaGiam)}
                                </TableCell>

                                {/*  <TableCell
                                sx={{ fontSize: "16px" }}
                                align="right"
                                component="th"
                                scope="row"
                            >
                                {item.soLuongM}
                            </TableCell> */}
                                <TableCell
                                    sx={{ fontSize: "16px" }}
                                    align="right"
                                    component="th"
                                    scope="row"
                                >{item.soLuongL}</TableCell>
                                <TableCell
                                    sx={{ fontSize: "16px" }}
                                    align="right"
                                    component="th"
                                    scope="row"
                                >
                                    {item.soLuongXL}
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
                                                Hết hàng
                                            </p>
                                            :
                                            <p style={{ color: '#0ccf0f', fontWeight: "bold" }}>
                                                Còn hàng
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
                                    sx={{ fontSize: "16px", width: "100px" }}
                                    align="right"
                                    component="th"
                                    scope="row"
                                >
                                    <Link
                                        to={`/admin/edit-product/${item.id}`}
                                        className="btn btn-success btn-lg"
                                        style={{ padding: "8px", borderRadius: "5px", fontSize: "16px", width: "100px" }}
                                    >
                                        <DriveFileRenameOutlineIcon style={{ fontSize: "30px", color: "#5ec9ff" }} />
                                    </Link>
                                </TableCell>
                                <TableCell
                                    sx={{ fontSize: "16px" }}
                                    align="right"
                                    component="th"
                                    scope="row"
                                >
                                    <button
                                        className='btn btn-primary btn-lg'
                                        style={{ padding: "8px", borderRadius: "5px", fontSize: "16px", background: "red", color: "white", border: 0 }}
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
                    }
                    else {
                        display_Productdata = "";
                    }
                });
                display_DeleteButton = "";
            }
        }
        else {
            display_Productdata = ""
            display_DeleteButton = (<button type="button" onClick={(e) => {
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

                        deleteCategory(e);
                    }
                })
            }} className='btn btn-danger btn-lg fs-4 text float-end p-3'>Xóa Loại sản phẩm</button>)
        }
    }
    return (
        <div className="container px-4 mt-3">
            <input type="text" placeholder="Nhập tên sản phẩm cần tìm kiếm..." className="admin__search--input" style={{ margin: "20px", marginLeft: "0" }} onKeyDown={handleInput} />
            <div className="card-header" style={{ padding: "30px 0" }}>
                <h1 style={{ fontWeight: "700" }}>Danh sách sản phẩm của loại {category ? category.ten : ""}
                    <Link to="/admin/view-category" className="btn btn-primary btn-lg float-end fs-4 text">Quay lại</Link>
                </h1>
            </div>
            {viewProduct.length > 0 ? <TableContainer component={Paper} className='container' style={{ padding: "10px 20px", background: "#f8f9fa" }}>
                <Table sx={{ minWidth: 650, fontSize: "16px" }} aria-label="caption table">
                    <TableHead >
                        <TableRow sx={{ '&:last-child tr, &:last-child th': { fontSize: '16px', fontWeight: "600" } }}>
                            <TableCell >STT</TableCell>
                            <TableCell align="right">Mã</TableCell>
                            <TableCell align="right" >Tên</TableCell>
                            <TableCell align="right">Loại</TableCell>
                            <TableCell align="right">Thương hiệu</TableCell>
                            <TableCell align="right" width={150}>Giá gốc</TableCell>
                            <TableCell align="right">Khuyến mãi</TableCell>
                            <TableCell align="right" width={150}>Giá đã giảm</TableCell>
                            <TableCell align="right">Màu sắc</TableCell>
                            <TableCell align="right">M</TableCell>
                            <TableCell align="right">L</TableCell>
                            <TableCell align="right">XL</TableCell>
                            <TableCell align="right" width={100}>Hình ảnh</TableCell>
                            <TableCell align="right" width={120}>Trạng thái</TableCell>
                            <TableCell align="right" width={120}>Hoạt động</TableCell>
                            <TableCell align="right" width={120}></TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {display_Productdata}
                    </TableBody>
                </Table>
            </TableContainer> : <h2>{`Không có sản phẩm nào trong loại ${category ? category.ten : ""}`}</h2>}
            <div style={{ marginTop: "30px" }}>{display_DeleteButton}</div>
        </div >
    )
}

export default ViewProductCate;