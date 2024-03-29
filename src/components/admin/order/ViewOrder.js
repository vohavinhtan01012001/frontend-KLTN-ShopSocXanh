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
import ViewChartOrder from './ViewChartOrder';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import { Tooltip } from '@mui/material';
function ViewOrder() {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [orderLength, setOrderLength] = useState(0);
    const [upload, setUpdate] = useState(1);
    const [showAddOrder, setShowAddOrder] = useState(false);
    const [refersh, setRefersh] = useState(false);

    //show length order
    useEffect(() => {
        API({
            method: 'get',
            url: `/admin-order/show-all`,
        }).then((res) => {
            if (res.status === 200) {
                setOrderLength(res.data.orders.length)
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

    }, [refersh]);

    //Số lượng trong 1 trang
    const limit = 5;

    //show list order
    useEffect(() => {
        API({
            method: 'get',
            url: `/admin-order/order?page=${upload}&limit=${limit}`,
        }).then((res) => {
            if (res.status === 200) {
                setOrders(res.data.orders)
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

    }, [upload, refersh]);

    const handlePagination = (e) => {
        setUpdate(e.target.name)
    }

    let items = [];
    for (let number = 1; number <= Math.ceil(orderLength / limit); number++) {
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

    const handleCancel = (id) => {

        Swal.fire({
            text: "Bạn có chắc muốn hủy đơn hàng?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đồng ý!',
            cancelButtonText: 'Đóng'
        }).then((result) => {
            if (result.isConfirmed) {
                API({
                    method: "put",
                    url: `/admin-order/upload-cancel`,
                    data: { id: id },
                }).then((res) => {
                    if (res.data.status === 200) {
                        Swal.fire({
                            text: res.data.message,
                            icon: 'success',
                            confirmButtonText: 'Đóng'
                        })
                        setRefersh(!refersh)
                    }
                    else {
                        Swal.fire({
                            text: res.data.message,
                            icon: 'warning',
                            confirmButtonText: 'Đóng'
                        })
                    }
                });
            }
        })


    }
    //Xử lý search
    const handleInput = (e) => {
        if (e.key === 'Enter') {
            setOrderLength(null);
            API({
                method: 'post',
                url: `admin-order/search`,
                data: { id: e.target.value }
            }).then(res => {
                if (res.data.status === 400) {
                    Swal.fire({
                        text: res.data.message,
                        icon: 'warning',
                        confirmButtonText: 'Đóng'
                    })
                }
                setOrders(res.data.orders);
            })
        }
    }
        
    console.log(orders)
    var viewcategory_HTMLTABLE = "";
    const formatMoney = (value) => {
        return value.toLocaleString('vi-VN') + ' VNĐ';
    };
    if (loading) {
        return <Loading />
    }
    else {
        viewcategory_HTMLTABLE = orders.map((item, index) => {
            const offset = (upload - 1) * limit;
            const date = new Date(item.createdAt).toLocaleString('en-US');
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
                    <TableCell sx={{ fontSize: "16px" }} align="right" component="th" scope="row">
                        {item.id}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} width={200} align="right" component="th" scope="row">
                        {item.NguoiDung ? item.NguoiDung.email : ""}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px", }} width={300} align="left">
                        {item.hoTen}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} width={300} align="left">
                        {item.diaChi}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="right">
                        {item.sdt}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="left" width={400}>
                        {formatMoney(item.tongTien)}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="left" width={300}>
                        {item.thanhToanVnpay == 1 ? "VNPay" : ""}
                        {item.thanhToanTienMat == 1 ? "Tiền mặt" : ""}

                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="right">
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
                    <TableCell sx={{ fontSize: "16px" }} align="right">
                        {
                            item.giaoHang == 0 ?
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
                            item.huyDon == 1 && <HighlightOffIcon style={{ fontSize: "35px", color: "red", marginBottom: "10px" }} />
                        }
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="left" width={200}>
                        {date}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="left" width={350}>
                        {item.ghiChu}
                    </TableCell>
                    <TableCell
                        sx={{ fontSize: "16px" }}
                        align="right"
                        component="th"
                        scope="row"
                    >
                        <Link
                            to={`${item.id}`}
                        >
                            <ContentPasteIcon style={{ fontSize: "30px", color: "#5ec9ff" }} />
                        </Link>
                    </TableCell>

                    <TableCell
                        sx={{ fontSize: "16px" }}
                        align="right"
                        component="th"
                        scope="row"
                    >
                        {
                            item.huyDon == 0 && item.giaoHang == 0 && <Tooltip title={<h4>Hủy đơn</h4>}><DoNotDisturbOnIcon style={{ fontSize: "35px", color: "red" }} onClick={(e) => handleCancel(item.id)} /></Tooltip>
                        }
                    </TableCell>
                </TableRow>
            )
        });
    }


    const handleRowDrag = (dragIndex, hoverIndex) => {
        const draggedRow = orders[dragIndex];
        const updatedList = [...orders];
        updatedList.splice(dragIndex, 1);
        updatedList.splice(hoverIndex, 0, draggedRow);
        setOrders(updatedList);
    };


    return (
        <div className="" /* style={{ width: "100%", height: "100%", background: "var(--bs-gray-200)" }} */ >
            <ViewChartOrder />
            <div className='container'>
                <div  >
                    <div className="card-header" style={{ padding: "30px 0" }}>
                        <h1 style={{ fontWeight: "700" }}>Danh sách đơn hàng

                        </h1>
                        <div style={{ display: "flex", justifyContent: "end", alignItems: "center" }}><input type="text" placeholder="Nhập mã đơn hàng..." className="admin__search--input" style={{ margin: "20px", marginLeft: "0", width: "200px" }} onKeyDown={handleInput} /></div><p></p>
                    </div>
                </div>
                <TableContainer component={Paper} className='container' style={{ width: "120%", background: "rgb(248, 249, 250)" }}>
                    <Table sx={{ minWidth: 650, fontSize: "16px" }} aria-label="caption table">
                        <TableHead >
                            <TableRow sx={{ '&:last-child tr, &:last-child th': { fontSize: '16px', fontWeight: "600" } }}>
                                <TableCell >STT</TableCell>
                                <TableCell>Mã</TableCell>
                                <TableCell>Tài khoản</TableCell>
                                <TableCell>Tên khách hàng</TableCell>
                                <TableCell>Địa chỉ</TableCell>
                                <TableCell>Số điện thoại</TableCell>
                                <TableCell width={400} align='center'>Giá tiền <br />
                                    (đã bao gồm phí vận chuyển)</TableCell>
                                <TableCell>Phương thức thanh toán</TableCell>
                                <TableCell>Xác nhận</TableCell>
                                <TableCell>Giao Hàng</TableCell>
                                <TableCell>Hủy đơn</TableCell>
                                <TableCell>Ngày tạo</TableCell>
                                <TableCell>Ghi chú</TableCell>
                                <TableCell></TableCell>
                                <TableCell>Thao tác</TableCell>
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
            </div>
        </div>

    );
}

export default ViewOrder;