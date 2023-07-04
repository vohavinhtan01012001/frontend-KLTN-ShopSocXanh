import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import API from '../../../API';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
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

    const deletePromotion = (e,id) => {
        e.preventDefault();
        API({
            method: 'delete',
            url: `/admin-promotion/delete-promotion/${id}`,
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
                        <Link
                            to={`/admin/promotion/view-product/${item.id}`}
                            
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
                        <Link
                            to={`/admin/promotion/add-product/${item.id}`}
                        >
                            <AddCircleIcon style={{ fontSize: "30px", color: "#5ec9ff" }}/>
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
                            className='btn btn-primary btn-lg'
                            style={{border:"0px",background: "none"}}
                            onClick={(e) => {
                                Swal.fire({
                                    text: "Bạn có chắc muốn xóa không?",
                                    icon: 'question',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Đồng ý!',
                                    cancelButtonText: 'Đóng'
                                }).then((result) => {
                                    if (result.isConfirmed) {

                                        deletePromotion(e, item.id);
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
                {
                    promotionList.length > 0 ? <TableContainer component={Paper} className='container' style={{ padding: "10px 20px", background: "white" }}>
                    <Table sx={{ minWidth: 650, fontSize: "16px" }} aria-label="caption table">
                        <TableHead >
                            <TableRow sx={{ '&:last-child tr, &:last-child th': { fontSize: '16px', fontWeight: "600" } }}>
                                <TableCell >STT</TableCell>
                                <TableCell align="right">Mã khuyến mãi</TableCell>
                                <TableCell align="right">Tiêu đề</TableCell>
                                <TableCell align="right">Giá trị khuyến mãi(%)</TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
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
                :<h1 style={{color:"red"}}>Chưa có chương trình khuyến mãi nào</h1> 
                }
            </div>
        </div>
    );
}

export default ViewPromotion;