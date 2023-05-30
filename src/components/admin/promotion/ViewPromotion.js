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
import AddPromotion from './AddPromotion';
import Button from 'react-bootstrap/Button';
import EditPromotion from './EditPromotion';

import Pagination from 'react-bootstrap/Pagination';
import Loading from '../../Loading';


function ViewPromotion() {
    const [loading, setLoading] = useState(true);
    const [promotionList, setPromotionList] = useState([]);
    const [promotionLength, setPromotionLength] = useState(0);
    const [upload, setUpdate] = useState(1);
    const [showAddPromotion, setShowAddPromotion] = useState(false);
    const [refersh, setRefersh] = useState(false);

    //show length promotions
    useEffect(() => {
        API({
            method: 'get',
            url: `/admin-Promotion/show-all`,
        }).then((res) => {
            if (res.status === 200) {
                setPromotionLength(res.data.promotions.length)
                setLoading(false);
            }
            else {
                Swal.fire({
                    text: 'Lỗi server',
                    icon: 'warning',
                    confirmButtonText: 'Cool'
                })
            }
        })

    }, [refersh]);


    //Số lượng trong 1 trang
    const limit = 5;

    //show list promotion
    useEffect(() => {
        API({
            method: 'get',
            url: `/admin-promotion/promotion?page=${upload}&limit=${limit}`,
        }).then((res) => {
            if (res.status === 200) {
                setPromotionList(res.data.promotion)
                console.log(res.data)
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
    for (let number = 1; number <= Math.ceil(promotionLength / limit); number++) {
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
    var viewpromotion_HTMLTABLE = "";
    if (loading) {
        return <Loading />
    }
    else {
        viewpromotion_HTMLTABLE = promotionList.map((item, index) => {
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
                        sx={{ fontSize: "16px" }}
                        align="right"
                        component="th"
                        scope="row"
                    >
                        {item.tieuDe}
                    </TableCell>
                    <TableCell
                        sx={{ fontSize: "16px" }}
                        align="right"
                        component="th"
                        scope="row"
                    >
                        {item.giamGia}%
                    </TableCell>
                    <TableCell
                        sx={{ fontSize: "16px" }}
                        align="right"
                        component="th"
                        scope="row"
                    >
                        Trạng thái
                    </TableCell>
                    <TableCell
                        sx={{ fontSize: "16px" }}
                        align="right"
                        component="th"
                        scope="row"
                    >
                        <Link
                            to={`/admin/edit-product/${item.id}`}
                            className="btn btn-success btn-lg"
                            style={{ padding: "8px", borderRadius: "5px", fontSize: "16px", width: "160px" }}
                        >
                            Xem sản phẩm áp dụng
                        </Link>
                    </TableCell>
                    <TableCell
                        sx={{ fontSize: "16px" }}
                        align="right"
                        component="th"
                        scope="row"
                    >
                        <Link
                            to={`/admin/edit-product/${item.id}`}
                            className="btn btn-success btn-lg"
                            style={{ padding: "8px", borderRadius: "5px", fontSize: "16px", width: "160px" }}
                        >
                           Thêm sản phẩm khuyến mãi
                        </Link>
                    </TableCell>
                    <TableCell
                        sx={{ fontSize: "16px" }}
                        align="right"
                        component="th"
                        scope="row"
                    >
                        <EditPromotion
                            showItemPromotion={item}
                            setRefersh={setRefersh}
                            refersh={refersh}
                        />
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
                        /* onClick={(e) => {
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
                        }} */
                        >
                            Xóa
                        </button>
                    </TableCell>
                </TableRow>
            )
        });
    }


    const handleRowDrag = (dragIndex, hoverIndex) => {
        const draggedRow = promotionList[dragIndex];
        const updatedList = [...promotionList];
        updatedList.splice(dragIndex, 1);
        updatedList.splice(hoverIndex, 0, draggedRow);
        setPromotionList(updatedList);
    };

    return (
        <div className="" /* style={{ width: "100%", height: "100%", background: "var(--bs-gray-200)" }} */ >
            <div className='container'>
                <div  >
                    <div className="card-header" style={{ padding: "30px 0" }}>
                        <h1 style={{ fontWeight: "700" }}>Danh sách khuyến mãi
                            <AddPromotion
                            setShowAddPromotion={setShowAddPromotion} showAddPromotion={showAddPromotion}
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
                                <TableCell align="right">Mã khuyến mãi</TableCell>
                                <TableCell align="right">Tiêu đề</TableCell>
                                <TableCell align="right">Giá trị khuyến mãi(%)</TableCell>
                                <TableCell align="right">Trạng thái</TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right">Chỉnh sửa</TableCell>
                                <TableCell align="right">Xóa</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {viewpromotion_HTMLTABLE}
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

export default ViewPromotion;