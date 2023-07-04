import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import API from '../../../API';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Pagination from 'react-bootstrap/Pagination';
import Loading from '../../Loading';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

function ViewOrderItems() {
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [orderItemsLength, setOrderItemsLength] = useState(0);
    const [upload, setUpdate] = useState(1);
    const [refersh, setRefersh] = useState(0);
    const { id } = useParams()
    //show length order
    useEffect(() => {
        const itemId = id;
        API({
            method: 'get',
            url: `/admin-order/show-all/orderItems/${itemId}`,
        }).then((res) => {
            if (res.status === 200) {
                setOrderItemsLength(res.data.orderItems.length)
                setLoading(false);
            }
            else {
                Swal.fire({
                    text: 'Do you want to continue',
                    icon: 'warning',
                    confirmButtonText: 'Cool'
                })
            }
        })

    }, [id]);

    //show  order
    useEffect(() => {
        const orderId = id;
        API({
            method: 'get',
            url: `/admin-order/show/order/${orderId}`,
        }).then((res) => {
            if (res.status === 200) {
                if (res.data.order.trangThai === 1) {
                    setRefersh(1);
                    if (res.data.order.giaoHang === 1) {
                        setRefersh(2);
                    }
                }
            }
            else {
                Swal.fire({
                    text: 'Do you want to continue',
                    icon: 'warning',
                    confirmButtonText: 'Cool'
                })
            }
        })

    }, [id]);

    //Số lượng trong 1 trang
    const limit = 5;

    //show list order
    useEffect(() => {
        API({
            method: 'get',
            url: `/admin-order/orderItems/${id}?page=${upload}&limit=${limit}`,
        }).then((res) => {
            if (res.status === 200) {
                setOrderItems(res.data.orderItems)
                console.log(res.data.orderItems)
                setLoading(false);
            }
            else {
                Swal.fire({
                    text: 'Do you want to continue',
                    icon: 'warning',
                    confirmButtonText: 'Cool'
                })
            }
        })

    }, [upload, refersh, id]);

    const formatMoney = (value) => {
        return value.toLocaleString('vi-VN') + ' VNĐ';
    };

    const handlePagination = (e) => {
        setUpdate(e.target.name)
    }

    let items = [];
    for (let number = 1; number <= Math.ceil(orderItemsLength / limit); number++) {
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

    console.log(orderItems)
    var viewcategory_HTMLTABLE = "";
    if (loading) {
        return <Loading />
    }
    else {
        viewcategory_HTMLTABLE = orderItems.map((item, index) => {
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
                    <TableCell sx={{ fontSize: "16px" }} component="th" scope="row">
                        {offset + index + 1}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="left" component="th" scope="row" width={130}>
                        {item.DonHangId}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="right">
                        {item.SanPhamId}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="left">
                        {item.SanPham.ten}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="left">
                        {item.soLuongM}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="left">
                        {item.soLuongL}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="left">
                        {item.soLuongXL}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="left">
                        {formatMoney(item.giaTien)}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="left" width={150}>
                        {formatMoney(item.tongTien)}
                    </TableCell>

                </TableRow>
            )
        });
    }


    const handleRowDrag = (dragIndex, hoverIndex) => {
        const draggedRow = orderItems[dragIndex];
        const updatedList = [...orderItems];
        updatedList.splice(dragIndex, 1);
        updatedList.splice(hoverIndex, 0, draggedRow);
        setOrderItems(updatedList);
    };

    const handleConfirm = (e) => {
        const orderItemId = id;
        API({
            method: 'put',
            url: `/admin-order/upload-status/${orderItemId}`,
        }).then((res) => {
            if (res.data.status === 200) {
                setRefersh(1)
                Swal.fire({
                    icon: 'success',
                    text: res.data.message,
                    confirmButtonText: 'Đóng'
                })
            }
            else if (res.data.status === 404) {
                Swal.fire({
                    icon: 'warning',
                    text: res.data.message,
                    confirmButtonText: 'Đóng'
                })
            }
        }).catch((err) => {
            Swal.fire({
                icon: 'error',
                text: err.message,
                confirmButtonText: 'Đóng'
            })
        })
    }

    const handleDelivery = (e) => {
        const orderItemId = id;
        API({
            method: 'put',
            url: `/admin-order/upload-delivery/${orderItemId}`,
        }).then((res) => {
            if (res.data.status === 200) {
                setRefersh(2)
                Swal.fire({
                    icon: 'success',
                    text: res.data.message,
                    confirmButtonText: 'Đóng'
                })
            }
            else if (res.data.status === 404) {
                Swal.fire({
                    icon: 'warning',
                    text: res.data.message,
                    confirmButtonText: 'Đóng'
                })
            }
        }).catch((err) => {
            Swal.fire({
                icon: 'error',
                text: err.message,
                confirmButtonText: 'Đóng'
            })
        })
    }

    return (
        <div className="" /* style={{ width: "100%", height: "100%", background: "var(--bs-gray-200)" }} */ >
            <div className='container'>
                <div  >
                    <div className="card-header" style={{ padding: "30px 0" }}>
                        <h1 style={{ fontWeight: "700" }}>Danh sách chi tiết đơn hàng
                            {/* <AddCategory
                                setShowAddOrder={setShowAddOrder} showAddOrder={showAddOrder}
                                setRefersh={setRefersh}
                                refersh={refersh}
                            /> */}
                        </h1>
                    </div>
                </div>
                <TableContainer component={Paper} className='container' style={{ padding: "10px 20px", background: "white" }}>
                    <Table sx={{ minWidth: 650, fontSize: "16px" }} aria-label="caption table">
                        <TableHead >
                            <TableRow sx={{ '&:last-child tr, &:last-child th': { fontSize: '16px', fontWeight: "600" } }}>
                                <TableCell >STT</TableCell>
                                <TableCell>Mã đơn hàng</TableCell>
                                <TableCell>Mã sản phẩm</TableCell>
                                <TableCell>Tên sản phẩm</TableCell>
                                <TableCell>Số lượng (M)</TableCell>
                                <TableCell>Số lượng (L)</TableCell>
                                <TableCell>Số lượng (XL)</TableCell>
                                <TableCell>Giá tiền 1 sản phẩm</TableCell>
                                <TableCell>Tổng tiền</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {viewcategory_HTMLTABLE}
                        </TableBody>
                    </Table>
                    <div style={{ margin: "20px 0 0 0", fontSize: "16px" }}>
                        <Pagination size="lg" >{items}</Pagination>
                    </div>
                </TableContainer>
                <div style={{ marginTop: "20px" }}>
                    {refersh === 1 ? <button type="button" className='btn btn-success btn-lg fs-4 text float-end p-3' onClick={(e) => {
                        Swal.fire({
                            text: "Bạn có chắc giao hàng thành công?",
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Đồng ý!',
                            cancelButtonText: 'Đóng',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                handleDelivery(e);
                            }
                        })
                    }}>Xác nhận giao hàng</button> : refersh === 2 ? <button type="button" className='btn btn-success btn-lg fs-4 text float-end p-3' disabled>Đơn Hàng đã giao</button> : <button type="button" onClick={(e) => {
                        Swal.fire({
                            text: "Bạn có chắc muốn xác nhận đơn hàng?",
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Đồng ý!',
                            cancelButtonText: 'Đóng',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                handleConfirm(e);
                            }
                        })
                    }} className='btn btn-danger btn-lg fs-4 text float-end p-3'>Xác nhận đơn hàng</button>}
                </div>
            </div>
        </div>

    );
}

export default ViewOrderItems;