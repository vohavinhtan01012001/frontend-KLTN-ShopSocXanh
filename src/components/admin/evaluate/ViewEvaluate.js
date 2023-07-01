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


function ViewEvaluate() {
    const [loading, setLoading] = useState(true);
    const [evaluateList, setEvaluateList] = useState([]);
    const [evaluateLength, setEvaluateLength] = useState(0);
    const [upload, setUpdate] = useState(1);
    const [showAddColor, setShowAddColor] = useState(false);
    const [refersh, setRefersh] = useState(false);



    useEffect(() => {
        API({
            method: 'get',
            url: `/admin-evaluate/evaluate?page=${upload}&limit=${limit}`,
        }).then((res) => {
            if (res.status === 200) {
                setEvaluateLength(res.data.evaluateLength)
                setEvaluateList(res.data.evaluate)
                setLoading(false)
            }
        }).catch(err => {
            Swal.fire({
                text: 'Error',
                icon: 'error',
                confirmButtonText: "Đóng"
            })
        })

    }, [upload, refersh]);

    //Số lượng trong 1 trang
    const limit = 5;

    const handlePagination = (e) => {
        setUpdate(e.target.name)
    }

    let items = [];
    for (let number = 1; number <= Math.ceil(evaluateLength / limit); number++) {
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
        viewcategory_HTMLTABLE = evaluateList.map((item, index) => {
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
                        {item.productId}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="right">
                        {item.productName}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="right">
                        {item.evaluate}
                    </TableCell>
                </TableRow>
            )
        });
    }


    const handleRowDrag = (dragIndex, hoverIndex) => {
        const draggedRow = evaluateList[dragIndex];
        const updatedList = [...evaluateList];
        updatedList.splice(dragIndex, 1);
        updatedList.splice(hoverIndex, 0, draggedRow);
        setEvaluateList(updatedList);
    };

    const formatMoney = (value) => {
        return value.toLocaleString('vi-VN') + ' VNĐ';
    };
    return (
        <div className="">
            <div className='container'>
                <div  >
                    <div className="card-header" style={{ padding: "30px 0" }}>
                        <h1 style={{ fontWeight: "700" }}>Danh sách đánh giá
                        </h1>
                    </div>
                </div>
                <TableContainer component={Paper} className='container' style={{ padding: "10px 20px", background: "#f8f9fa" }}>
                    <Table sx={{ minWidth: 650, fontSize: "16px" }} aria-label="caption table">
                        <TableHead >
                            <TableRow sx={{ '&:last-child tr, &:last-child th': { fontSize: '16px', fontWeight: "600" } }}>
                                <TableCell >STT</TableCell>
                                <TableCell align="right">Mã sản phẩm</TableCell>
                                <TableCell align="right">Tên sản phẩm</TableCell>
                                <TableCell align="right">Đánh giá (0 -- 5)</TableCell>
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

export default ViewEvaluate;