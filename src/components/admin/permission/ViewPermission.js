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
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import EditPermission from './EditPermission';
import AddRole from './AddRole';
import EditRole from './EditRole';

function ViewPermission() {
    const [loading, setLoading] = useState(true);
    const [upload, setUpdate] = useState(1);
    const [role, setRole] = useState([]);
    const [userLength, setRolePermissionLength] = useState(0);
    const [showAddRole, setShowAddRole] = useState(false);
    const [refersh, setRefersh] = useState(false);


    //show length user
    useEffect(() => {
        API({
            method: 'get',
            url: `/admin-permission/show-all`,
        }).then((res) => {
            if (res.status === 200) {
                setRolePermissionLength(res.data.role.length)
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

    //show list user
    useEffect(() => {
        API({
            method: 'get',
            url: `/admin-permission/role?page=${upload}&limit=${limit}`,
        }).then((res) => {
            if (res.data.status === 200) {
                setRole(res.data.roles)
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

    /* const deleteAccount = (e, id) => {
        e.preventDefault();
        const thisclicked = e.target.closest('tr');
        axios.delete(`/api/delete-account/${id}`).then(res => {
            if (res.data.status === 200) {
                swal('Success', res.data.message, "success");
                thisclicked.closest("tr").remove();
            }
            else if (res.data.status === 404) {
                swal('Warning', res.data.message, "warning");
            }
        })
    } */

    const handleRowDrag = (dragIndex, hoverIndex) => {
        const draggedRow = userLength[dragIndex];
        const updatedList = [...userLength];
        updatedList.splice(dragIndex, 1);
        updatedList.splice(hoverIndex, 0, draggedRow);
        setRolePermissionLength(updatedList);
    };


    const handlePagination = (e) => {
        setUpdate(e.target.name)
    }

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
    let viewAccount_HTMLTABLE = ""
    if (loading) {
        return <Loading />
    }
    else {
        viewAccount_HTMLTABLE = role.map((item, index) => {
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
                    <TableCell sx={{ fontSize: "16px" }} align="right">
                        {item.tenVaiTro}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="right">
                        {item.moTa}
                    </TableCell>
                    <TableCell
                        align="right"
                    >

                        <EditPermission
                            showItemPermission={item}
                            setRefersh={setRefersh}
                            refersh={refersh}
                        />
                    </TableCell>
                    <TableCell
                        align="right"
                    >
                        {/*  <Link
                            to={`${item.id}`}

                        >
                            <ContentPasteIcon style={{ fontSize: "30px", color: "#5ec9ff" }} />
                        </Link> */}
                        <EditRole
                            showItemRole={item}
                            setRefersh={setRefersh}
                            refersh={refersh}
                        />
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
                        <h1 style={{ fontWeight: "700" }}>Danh sách vai trò
                            <AddRole
                                setShowAddRole={setShowAddRole} showAddRole={showAddRole}
                                setRefersh={setRefersh}
                                refersh={refersh}
                            />
                        </h1>
                    </div>
                </div>
                <TableContainer component={Paper} className='container' style={{ padding: "10px 20px", background: "#f8f9fa" }}>
                    <Table sx={{ minWidth: 650, fontSize: "16px" }} aria-label="caption table">
                        <TableHead >
                            <TableRow sx={{ '&:last-child tr, &:last-child th': { fontSize: '16px', fontWeight: "600" } }}>
                                <TableCell >STT</TableCell>
                                <TableCell align="right">Tên vai trò</TableCell>
                                <TableCell align="right">Mô tả</TableCell>
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


export default ViewPermission;