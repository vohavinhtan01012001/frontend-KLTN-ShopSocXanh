import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../Loading';
import API from '../../../API';
import Swal from 'sweetalert2';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from 'react-bootstrap/Pagination';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function AddProductPor() {
    const [loading, setLoading] = useState(true);
    const [viewProduct, setProduct] = useState([]);
    const [message, setMessage] = useState('');
    const [valueInput, setValueInput] = useState([]);
    const [promotion, setPromotion] = useState([]);
    const [refersh, setRefersh] = useState(false);
    const idPromotion = useParams();
    //Xử lý search
    const handleInput = (e) => {
        if (e.key === 'Enter') {
            setMessage(e.target.value);
        }
    }

    /*     const slug = message;
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

    //Xử lý xuất dữ liệu
    useEffect(() => {
        const id = idPromotion.id
        API({
            method: 'get',
            url: `admin-promotion/show-product/${id}`,
        },)
            .then((res) => {
                setProduct(res.data.products)
                setLoading(false)
                console.log(res.data.products)
            }).catch((err) => {
                console.log(err);
                Swal.fire({
                    icon: 'warning',
                    title: 'Error',
                    confirmButtonText: 'Đóng'
                })
            });
    }, [idPromotion.id, refersh]);



    //Xử lý promotion
    useEffect(() => {
        const id = idPromotion.id
        console.log(id);
        API({
            method: 'get',
            url: `admin-promotion/show-promotion/${id}`,
        },)
            .then((res) => {
                setPromotion(res.data.promotion)
            }).catch((err) => {
                console.log(err);
                Swal.fire({
                    icon: 'warning',
                    title: 'Error',
                    confirmButtonText: 'Đóng'
                })
            });
    }, [idPromotion.id]);


    const checkValue = (e) => {
        if (e.target.checked == true) {
            setValueInput([...valueInput, e.target.value])
        }
    }

    const submitProduct = (e) => {
        e.preventDefault();
        const promotion_id = idPromotion.id;
        console.log(valueInput)
        for (let i = 0; i < valueInput.length; i++) {
            API({
                method: 'put',
                url: `admin-promotion/upload-productPro/${promotion_id}`,
                data: {
                    idProduct: valueInput[i],
                }
            },)
                .then((res) => {
                    Swal.fire({
                        text: 'Thêm thành công!',
                        icon: 'success',
                        confirmButtonText: 'Đóng'
                    })
                    setRefersh(!refersh)
                    /* window.location.reload(); */
                }).catch((err) => {
                    console.log(err);
                    Swal.fire({
                        icon: 'warning',
                        title: 'Error',
                        confirmButtonText: 'Đóng'
                    })
                });
        }
    }

    const formatMoney = (value) => {
        return value.toLocaleString('vi-VN') + ' VNĐ';
    };

    var display_Productdata = "";
    if (loading) {
        return <Loading />
    }
    else {

        display_Productdata = viewProduct.map((item, index) => {
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
                        <input
                            type="checkbox"
                            name="checkbox"
                            onChange={checkValue}
                            value={item.id}
                            style={{ width: "20px", height: "20px" }}
                        />
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
                        width={250}
                    >
                        {item.KhuyenMai ? item.KhuyenMai.tieuDe : <p style={{ color: "red",fontWeight:"600" }}><HighlightOffIcon style={{fontSize:"30px"}} /></p>}
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
                </TableRow>
            )
        });

    }

    return (
        <div className="container px-4">
            <input
                type="text"
                placeholder="Nhập tên sản phẩm cần tìm kiếm..."
                className="admin__search--input"
                style={{ margin: "20px", marginLeft: "0" }}
                onKeyDown={handleInput}
            />
            <div className="card-header" style={{ padding: "30px 0" }}>
                <h2>Thêm Sản phẩm áp dụng khuyến mãi &nbsp;"
                    {promotion ? promotion.tieuDe : ""}"
                    <Link to="/admin/view-promotion" className="btn btn-primary btn-lg float-end  fs-4 text">Quay lại</Link>
                </h2>
            </div>
            {viewProduct.length > 0 ? <form onSubmit={submitProduct}>
                <TableContainer component={Paper} className='container' style={{ padding: "10px 20px", background: "white" }}>
                    <Table sx={{ minWidth: 650, fontSize: "16px" }} aria-label="caption table">
                        <TableHead >
                            <TableRow sx={{ '&:last-child tr, &:last-child th': { fontSize: '16px', fontWeight: "600" } }}>
                                <TableCell ></TableCell>
                                <TableCell align="right">Mã</TableCell>
                                <TableCell align="right" >Tên</TableCell>
                                <TableCell align="right">Loại</TableCell>
                                <TableCell align="right">Thương hiệu</TableCell>
                                <TableCell align="right" width={150}>Giá gốc</TableCell>
                                <TableCell align="right">Khuyến mãi</TableCell>
                                <TableCell align="right" width={150}>Giá đã giảm</TableCell>
                                <TableCell align="right">Màu sắc</TableCell>
                                <TableCell align="right" width={100}>Hình ảnh</TableCell>
                                <TableCell align="right" width={120}>Trạng thái</TableCell>
                                <TableCell align="right" width={120}>Hoạt động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {display_Productdata}
                        </TableBody>
                    </Table>
                    <div style={{ width: "100%", paddingTop: "20px", textAlign: "center" }}
                    >
                        <button type="submit" className="btn btn-primary btn-lg px-4 mt-2 fs-4 text" style={{ padding: "10px", width: "200px" }}>
                            Thêm
                        </button>
                    </div>
                </TableContainer>
            </form> : <h1 style={{ color: "red" }}>Không còn sản phẩm</h1>}
        </div>
    );
}

export default AddProductPor;