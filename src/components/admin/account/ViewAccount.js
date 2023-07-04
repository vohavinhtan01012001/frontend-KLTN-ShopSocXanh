import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../../Loading';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from 'react-bootstrap/Pagination';
import API from '../../../API';
import Swal from 'sweetalert2';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';



function VỉewAccount() {
    const [loading, setLoading] = useState(true);
    const [upload, setUpdate] = useState(1);
    const [viewAccount, setAccount] = useState([]);
    const [checkAction, setCheckAction] = useState([]);
    const [userLength, setUserLength] = useState(0);
    const [refersh, setRefersh] = useState(false);


    //show length category
    useEffect(() => {
        API({
            method: 'get',
            url: `/auth/show-all`,
        }).then((res) => {
            if (res.status === 200) {
                setUserLength(res.data.users.length)
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

    //show list user
    useEffect(() => {
        API({
            method: 'get',
            url: `/auth/user?page=${upload}&limit=${limit}`,
        }).then((res) => {
            if (res.status === 200) {
                setAccount(res.data.users)
                setLoading(false);
                setCheckAction(prevCheckAction => {
                    const newCheckAction = { ...prevCheckAction };
                    res.data.users.forEach((item, index) => {
                        if (item.trangThai === 1) {
                            newCheckAction[item.id] = item.id;
                        }
                    });
                    return newCheckAction;
                });
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

    const deleteAccount = (e, id) => {
        API({
            method: 'delete',
            url: `/auth/delete-user/${id}`,
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

    const handleRowDrag = (dragIndex, hoverIndex) => {
        const draggedRow = userLength[dragIndex];
        const updatedList = [...userLength];
        updatedList.splice(dragIndex, 1);
        updatedList.splice(hoverIndex, 0, draggedRow);
        setUserLength(updatedList);
    };


    const handlePagination = (e) => {
        setUpdate(e.target.name)
    }
    //Số lượng trong 1 trang
    const limit = 5;

    let items = [];
    for (let number = 1; number <= Math.ceil(userLength / limit); number++) {
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


    const handleChange = (id) => {
        setCheckAction({ ...checkAction, [id]: 0 });
        API({
            method: 'put',
            url: `/auth/upload-status/${id}`,
            data: { trangThai: 0 },
        }).then((res) => {
            console.log("thanh cong")
            setRefersh(!refersh)
        }).catch((err) =>
            Swal.fire({
                title: 'Error!',
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'Close'
            })
        )

    }
    const handleChange1 = (id) => {
        setCheckAction({ ...checkAction, [id]: id });
        API({
            method: 'put',
            url: `/auth/upload-status/${id}`,
            data: { trangThai: 1 },
        }).then((res) => {
            setRefersh(!refersh)
            console.log("thanh cong")
        }).catch((err) =>
            Swal.fire({
                title: 'Error!',
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'Close'
            })
        )

    }


    let viewAccount_HTMLTABLE = ""
    if (loading) {
        return <Loading />
    }
    else {
        viewAccount_HTMLTABLE = viewAccount.map((item, index) => {
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
                    <TableCell sx={{ fontSize: "16px" }} align="right" component="th" scope="row">
                        {item.id}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="right">
                        {item.hoTen}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="right">
                        {item.email}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="right">
                        {item.diaChi}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="right">
                        {item.sdt}
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
                    {/* <TableCell
                        sx={{ fontSize: "16px" }}
                        align="right"
                        component="th"
                        scope="row"
                    >
                        {

                            checkAction[item.id] == item.id ?
                                (<ToggleOnIcon
                                    style={{ fontSize: "45px", color: "#5ec9ff" }}

                                    onClick={() => handleChange(item.id)}

                                />) :
                                <ToggleOffIcon style={{ fontSize: "45px", color: "red" }}
                                    onClick={() => handleChange1(item.id)}
                                />
                        }
                    </TableCell> */}
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
                                    confirmButtonText: 'Đồng ý!',
                                    cancelButtonText: 'Đóng',
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        deleteAccount(e, item.id);
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
        <div className="" >
            <div className='container'>
                <div  >
                    <div className="card-header" style={{ padding: "30px 0" }}>
                        <h1 style={{ fontWeight: "700" }}>Danh sách khách hàng
                        </h1>
                    </div>
                </div>
                <TableContainer component={Paper} className='container' style={{ padding: "10px 20px", background: "white" }}>
                    <Table sx={{ minWidth: 650, fontSize: "16px" }} aria-label="caption table">
                        <TableHead >
                            <TableRow sx={{ '&:last-child tr, &:last-child th': { fontSize: '16px', fontWeight: "600" } }}>
                                <TableCell >STT</TableCell>
                                <TableCell align="right">Mã</TableCell>
                                <TableCell align="right">Tên</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Địa chỉ</TableCell>
                                <TableCell align="right">Số điện thoại</TableCell>
                                <TableCell align="right">Trạng thái</TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {viewAccount_HTMLTABLE}
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


export default VỉewAccount;