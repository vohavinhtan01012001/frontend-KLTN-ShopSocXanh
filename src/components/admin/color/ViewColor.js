import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import API from '../../../API';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from 'react-bootstrap/Pagination';
import Loading from '../../Loading';
import AddColor from './AddColor';
import EditColor from './EditColor';


function ViewColor() {
    const [loading, setLoading] = useState(true);
    const [colorlist, setColorlist] = useState([]);
    const [colorLength, setColorLength] = useState(0);
    const [upload, setUpdate] = useState(1);
    const [showAddColor, setShowAddColor] = useState(false);
    const [refersh, setRefersh] = useState(false);

    //show length color
    useEffect(() => {
        API({
            method: 'get',
            url: `/admin-color/show-all`,
        }).then((res) => {
            if (res.status === 200) {
                setColorLength(res.data.colors.length)
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

    //show list color
    useEffect(() => {
        API({
            method: 'get',
            url: `/admin-color/color?page=${upload}&limit=${limit}`,
        }).then((res) => {
            if (res.status === 200) {
                setColorlist(res.data.colors)
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
    for (let number = 1; number <= Math.ceil(colorLength / limit); number++) {
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



    var viewcategory_HTMLTABLE = "";
    if (loading) {
        return <Loading />
    }
    else {
        viewcategory_HTMLTABLE = colorlist.map((item, index) => {
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
                        {item.ten}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="right">
                        {item.moTa}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="right">
                        <EditColor
                            showItemColor={item}
                            setRefersh={setRefersh}
                            refersh={refersh}
                        />
                    </TableCell>
                </TableRow>
            )
        });
    }


    const handleRowDrag = (dragIndex, hoverIndex) => {
        const draggedRow = colorlist[dragIndex];
        const updatedList = [...colorlist];
        updatedList.splice(dragIndex, 1);
        updatedList.splice(hoverIndex, 0, draggedRow);
        setColorlist(updatedList);
    };

    const formatMoney = (value) => {
        return value.toLocaleString('vi-VN') + ' VNĐ';
    };
    return (
        <div className="">
            <div className='container'>
                <div  >
                    <div className="card-header" style={{ padding: "30px 0" }}>
                        <h1 style={{ fontWeight: "700" }}>Danh sách màu sắc
                            <AddColor
                                setShowAddColor={setShowAddColor}
                                showAddColor={showAddColor}
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
                                <TableCell align="right">Mã</TableCell>
                                <TableCell align="right">Tên màu</TableCell>
                                <TableCell align="right">Mô tả</TableCell>
                                <TableCell align="right"></TableCell>
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

export default ViewColor;