import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from 'react-bootstrap/Pagination';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import API from '../../../API';
import { AuthContext } from '../../../helpers/AuthContext';
import Swal from 'sweetalert2';
import Loading from '../../Loading';

let PageSize = 7;
function ViewProduct() {

    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [viewProduct, setProduct] = useState([]);
    const [upload, setUpdate] = useState(1);
    const [category, setCategory] = useState([])
    const [productLength, setProductLength] = useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [refersh, setRefersh] = useState(false)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    //Xử lý search
    /*  const handleInput = (e) => {
         if (e.key === 'Enter') {
             setMessage(e.target.value);
         }
     }
     const slug = message;
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

    //show categories
    useEffect(() => {
        API({
            method: 'get',
            url: `/admin-category/show-all`,
        }).then((res) => {
            if (res.status === 200) {
                setCategory(res.data.categories)
                setLoading(false);
            }
            else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Do you want to continue',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
            }
        })

    }, []);

    //show length product
    useEffect(() => {
        API({
            method: 'get',
            url: `/admin-product/show-all`,
        }).then((res) => {
            if (res.data.status === 200) {
                setProductLength(res.data.products.length)
                setLoading(false);
            }
            else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Do you want to continue',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
            }
        })

    }, [refersh]);

    //Xử lý xóa
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
    //Số lượng trong 1 trang
    const limit = 5;
    //show list product
    useEffect(() => {
        API({
            method: 'get',
            url: `/admin-product/product?page=${upload}&limit=${limit}`,
        }).then((res) => {
            if (res.data.status === 200) {
                setProduct(res.data.products)
                setLoading(false);
            }
            else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Do you want to continue',
                    icon: 'error',
                    confirmButtonText: 'Close'
                })
            }
        })
    }, [upload, refersh]);

    console.log(viewProduct)



    const handlePagination = (e) => {
        setUpdate(e.target.name)
    }

    let items = [];
    for (let number = 1; number <= Math.ceil(productLength / limit); number++) {
        items.push(
            <Pagination.Item
                onClick={handlePagination}
                style={{ fontSize: "20px", border: "0px" }}
                key={number}
                name={number}
                active={number == upload}
            >
                {number}
            </Pagination.Item>,
        );
    }
    const handleRowDrag = (dragIndex, hoverIndex) => {
        const draggedRow = viewProduct[dragIndex];
        const updatedList = [...viewProduct];
        updatedList.splice(dragIndex, 1);
        updatedList.splice(hoverIndex, 0, draggedRow);
        setProduct(updatedList);
    };


    const formatMoney = (value) => {
        return value.toLocaleString('vi-VN') + ' VNĐ';
    };


    var role = authState.phanQuyen;
    var display_Productdata = "";
    if (loading) {
        return <Loading />
    }
    else {
        display_Productdata = viewProduct.map((item, index) => {
            const offset = (upload - 1) * limit;
            return (
                <TableRow
                    sx={{ '&:last-child tr, &:last-child th': { fontSize: '16px' } }}
                    id={item.id}
                    key={index}
                    draggable={true}
                    onDragStart={(e) => {
                        e.dataTransfer.setData('text/plain', index);
                    }}
                    onDragOver={(e) => {
                        e.preventDefault();
                    }}
                    onDrop={(e) => {
                        e.preventDefault();
                        const dragIndex = Number(e.dataTransfer.getData('text/plain'));
                        handleRowDrag(dragIndex, index);
                    }}
                >
                    <TableCell
                        sx={{ fontSize: "16px" }}
                        component="th"
                        scope="row"
                    >
                        {offset + index + 1}
                    </TableCell>
                    <TableCell
                        sx={{ fontSize: "16px" }}
                        align="right" component="th"
                        scope="row"
                    >
                        {item.id}
                    </TableCell>
                    <TableCell
                        sx={{ fontSize: "16px",width:'250px' }}
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
                                    Hết hàng
                                </p>
                                :
                                <p style={{ color: '#0ccf0f', fontWeight: "bold" }}>
                                    Còn hàng
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
                            Xem chi tiết
                        </Link>
                    </TableCell>
                    <TableCell
                        sx={{ fontSize: "16px" }}
                        align="right"
                        component="th"
                        scope="row"
                    >
                        <button
                            className='btn btn-primary btn-sm'
                            style={{ padding: "8px", borderRadius: "5px", fontSize: "16px", background: "red", color: "white", border: 0 }}
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
                            Xóa
                        </button>
                    </TableCell>
                </TableRow>
            )
        });
    }


    return (
        <div className="container">
            <input type="text" placeholder="Nhập tên sản phẩm cần tìm kiếm..." className="admin__search--input" style={{ margin: "20px", marginLeft: "0" }} /* onKeyDown={handleInput} */ />
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <FilterAltIcon
                    className='filterIcon'
                    style={{ fontSize: "30px" }}
                />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {
                    category.map((item, index) => {
                        return (
                            <MenuItem onClick={handleClose} style={{ fontSize: "16px" }} key={index}>{item.ten}</MenuItem>
                        )
                    })
                }

            </Menu>
            <div className="card-header" style={{ padding: "30px 0" }}>
                <h1 style={{ fontWeight: "700" }}>Danh sách sản phẩm
                    <Link to="/admin/add-product" className="btn btn-primary btn-lg float-end fs-4 text">Thêm sản phẩm</Link>
                </h1>
            </div>
            <TableContainer component={Paper} className='container' style={{ padding: "10px 20px", background: "#f8f9fa" }}>
                <Table sx={{ minWidth: 650, fontSize: "16px" }} aria-label="caption table">
                    <TableHead >
                        <TableRow sx={{ '&:last-child tr, &:last-child th': { fontSize: '16px', fontWeight: "600" } }}>
                            <TableCell >STT</TableCell>
                            <TableCell align="right">Mã</TableCell>
                            <TableCell align="right" >Tên</TableCell>
                            <TableCell align="right">Loại</TableCell>
                            <TableCell align="right" width={150}>Giá gốc</TableCell>
                            <TableCell align="right">Khuyến mãi</TableCell>
                            <TableCell align="right" width={150}>Giá đã giảm</TableCell>
                            <TableCell align="right">M</TableCell>
                            <TableCell align="right">L</TableCell>
                            <TableCell align="right">XL</TableCell>
                            <TableCell align="right" width={100}>Hình ảnh</TableCell>
                            <TableCell align="right" width={120}>Trạng thái</TableCell>
                            <TableCell align="right" width={120}></TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {display_Productdata}
                    </TableBody>
                </Table>
                <div style={{ margin: "20px 0 0 0", fontSize: "16px" }}>
                    <Pagination size="lg" >{items}</Pagination>
                </div>
            </TableContainer>
            
        </div>
    )
}

export default ViewProduct;