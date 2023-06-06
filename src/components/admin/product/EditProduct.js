import React, { useEffect, useState } from "react";
import { Formik, input, Form, h1, useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import API from "../../../API";
import Button from "react-bootstrap/esm/Button";
import Loading from "../../Loading";

function EditProduct() {
    const [categorylist, setCategorylist] = useState([]);
    const [trademarklist, setTrademarklist] = useState([]);
    const [promotionlist, setPromotionlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});
    const history = useNavigate()
    const slug = useParams();
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);

    useEffect(() => {
        API({
            method: 'get',
            url: `/admin-category/show-all`,
        }).then((res) => {
            if (res.status === 200) {
                setCategorylist(res.data.categories)
                console.log(res.data.categories)
                setLoading(false);
            }
            else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Do you want to continue',
                    icon: 'warning',
                    confirmButtonText: 'Cool'
                })
            }
        })
    }, []);
    useEffect(() => {
        API({
            method: 'get',
            url: `/admin-trademark/show-all`,
        }).then((res) => {
            if (res.status === 200) {
                setTrademarklist(res.data.trademarks)
                console.log(res.data.trademarks)
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
    useEffect(() => {
        API({
            method: 'get',
            url: `/admin-promotion/show-all`,
        }).then((res) => {
            if (res.status === 200) {
                setPromotionlist(res.data.promotions)
                console.log(res.data.promotions)
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
    var initialValues = {
        TheLoaiId: '',
        ten: '',
        giaTien: '',
        mauSac: '',
        soLuongM: '',
        soLuongL: '',
        soLuongXL: '',
        image1: null,
        image2: null,
        image3: null,
        image4: null,
        moTa: '',
        ThuongHieuId: '',
        KhuyenMaiId: '',
        trangThai: 1,
    }

    useEffect(() => {
        const productId = slug.id;
        API({
            method: 'get',
            url: `/admin-product/product/${productId}`,
        }).then((res) => {
            if (res.status === 200) {
                setProduct(res.data.product)
                console.log(res.data.product)
                initialValues.id = res.data.product[0].id
                initialValues.TheLoaiId = res.data.product[0].TheLoaiId
                initialValues.mauSac = res.data.product[0].mauSac
                initialValues.ThuongHieuId = res.data.product[0].ThuongHieuId
                initialValues.KhuyenMaiId = res.data.product[0].KhuyenMaiId ? res.data.product[0].KhuyenMaiId : null
                initialValues.ten = res.data.product[0].ten
                initialValues.giaTien = res.data.product[0].giaTien
                initialValues.soLuongL = res.data.product[0].soLuongL
                initialValues.soLuongM = res.data.product[0].soLuongM
                initialValues.soLuongXL = res.data.product[0].soLuongXL
                initialValues.trangThai = res.data.product[0].trangThai
                formik.setValues(initialValues)
                setLoading(false);
            }
        }).catch(error => {
            Swal.fire({
                icon: 'warning',
                text: 'Không tìm thấy địa chỉ!',
                confirmButtonText: 'Đóng'
            })
            history('/admin/view-product')
        })
    }, [slug.id])

    const validationSchema = Yup.object({
        TheLoaiId: Yup.string()
            .required('Loại sản phẩm là bắt buộc'),
        ThuongHieuId: Yup.string()
            .required('Thương hiệu là bắt buộc'),
        ten: Yup.string()
            .required('Tên sản phẩm là bắt buộc'),
        giaTien: Yup.number()
            .min(0, 'Giá tiền không được bé hơn 0')
            .required('Giá tiền là bắt buộc'),
        mauSac: Yup.string()
            .required('Màu sắc là bắt buộc'),
        soLuongM: Yup.number()
            .min(0, 'số Lượng M không được bé hơn 0')
            .required('số Lượng M là bắt buộc'),
        soLuongL: Yup.number()
            .min(0, 'số Lượng L không được bé hơn 0')
            .required('số Lượng L là bắt buộc'),
        soLuongXL: Yup.number()
            .min(0, 'số Lượng XL không được bé hơn 0')
            .required('số Lượng XL là bắt buộc'),

    })
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            // Xử lý submit form
            try {
                values.image1 = image1;
                values.image2 = image2;
                values.image3 = image3;
                values.image4 = image4;
                if(!values.KhuyenMaiId){
                    values.KhuyenMaiId = 0;
                }
                console.log(values)
                API({
                    method: 'put',
                    url: `admin-product/upload-product/${slug.id}`,
                    data: values,
                    headers: { 'Content-Type': 'multipart/form-data' }
                },)
                    .then((res) => {
                        Swal.fire({
                            title: 'Cập nhật thành công!',
                            icon: 'success',
                            confirmButtonText: 'Đóng'
                        })
                        history('/admin/view-product')
                    }).catch((err) => {
                        console.log(err);
                        Swal.fire({
                            icon: 'warning',
                            title: 'Lỗi server',
                            confirmButtonText: 'Đóng'
                        })
                    });

            } catch (error) {
                console.error(error);
            }
            console.log(values);
        },
    });


    if (loading) {
        return <Loading />
    }
    console.log(formik.errors)





    return (
        <>
            <div className="container" >
                <div className="card-header" style={{ padding: "30px 0" }}>
                    <h1 style={{ fontWeight: "700" }}>Cập nhật sản phẩm
                        <Button
                            className="btn btn-primary btn-lg float-end fs-4 text"
                            style={{ padding: "8px 10px", borderRadius: "5px" }}
                            onClick={() => history("/admin/view-product")}
                        >
                            Xem danh sách sản phẩm
                        </Button>
                    </h1>
                </div>
            </div>
            <div className="container px-4 fs-4 text " style={{ fontWeight: "600" }}>
                <div className="card mt-4 box-addProduct" style={{ background: "#f8f9fa" }}>

                    <div className="card-body">

                        <form onSubmit={formik.handleSubmit}>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                                    <div className="form-group mb-3">
                                        <label>Loại sản phẩm</label>
                                        <select
                                            placeholder="Nhập"
                                            name="TheLoaiId"
                                            value={formik.values.TheLoaiId}
                                            onChange={formik.handleChange} className="form-control fs-4 text" style={{ padding: "7px 15px", fontSize: "16px" }}
                                        >
                                            {
                                                categorylist.map((item) => {
                                                    return (
                                                        <option value={item.id} key={item.id}>{item.ten}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <p className="text-danger">
                                            {formik.errors.TheLoaiId ? (
                                                <p>{formik.errors.TheLoaiId}</p>
                                            ) : null}
                                        </p>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Thương hiệu</label>
                                        <select
                                            placeholder="Nhập"
                                            name="ThuongHieuId"
                                            value={formik.values.ThuongHieuId}
                                            onChange={formik.handleChange} className="form-control fs-4 text" style={{ padding: "7px 15px", fontSize: "16px" }}
                                        >
                                            {
                                                trademarklist.map((item) => {
                                                    return (
                                                        <option value={item.id} key={item.id}>{item.ten}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <p className="text-danger">
                                            {formik.errors.ThuongHieuId ? (
                                                <p>{formik.errors.ThuongHieuId}</p>
                                            ) : null}
                                        </p>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Tên sản phẩm</label>
                                        <input
                                            placeholder="Nhập tên sản phẩm..." name="ten"
                                            value={formik.values.ten}
                                            onChange={formik.handleChange} className="form-control fs-4 text" style={{ padding: "7px 15px", fontSize: "16px" }} />
                                        <p className="text-danger" style={{ color: "red", fontWeight: "500" }}>
                                            {formik.errors.ten ? (
                                                <p>{formik.errors.ten}</p>
                                            ) : null}
                                        </p>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Giá bán</label>
                                        <div style={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                                            <input
                                                placeholder="0.00"
                                                name="giaTien"
                                                type="number"
                                                value={formik.values.giaTien}
                                                onChange={formik.handleChange}
                                                className="form-control fs-4 text" style={{ padding: "7px 15px", fontSize: "16px", display: "flex", width: "20%", marginRight: "10px" }} />
                                            <span> VNĐ</span>
                                        </div>
                                        <p className="text-danger">
                                            {formik.errors.giaTien ? (
                                                <p>{formik.errors.giaTien}</p>
                                            ) : null}
                                        </p>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Chương trình khuyến mãi</label>
                                        <select
                                            placeholder="Nhập"
                                            name="KhuyenMaiId"
                                            value={formik.values.KhuyenMaiId}
                                            onChange={formik.handleChange} className="form-control fs-4 text" style={{ padding: "7px 15px", fontSize: "16px" }}
                                        >
                                            <option value={0}>---Không áp dụng khuyến mãi---</option>
                                            {
                                                promotionlist.map((item) => {
                                                    return (
                                                        <option value={item.id} key={item.id}>{item.tieuDe}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <p className="text-danger">
                                            {formik.errors.KhuyenMaiId ? (
                                                <p>{formik.errors.KhuyenMaiId}</p>
                                            ) : null}
                                        </p>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Màu sắc</label>
                                        <div >
                                            <input
                                                placeholder="Nhập màu săc..."
                                                name="mauSac"
                                                type="text"
                                                value={formik.values.mauSac}
                                                onChange={formik.handleChange}
                                                className="form-control fs-4 text" style={{ padding: "7px 15px", fontSize: "16px", display: "flex", width: "20%", marginRight: "10px" }} />
                                        </div>
                                        <p className="text-danger">
                                            {formik.errors.mauSac ? (
                                                <p>{formik.errors.mauSac}</p>
                                            ) : null}
                                        </p>
                                    </div>
                                    <div className="form-group mb-3" style={{ display: "flex" }}>
                                        <label style={{ margin: "10px 10px 10px 50px", width: "100%" }}>Số lượng(M)</label>
                                        <input placeholder="0" name="soLuongM"
                                            type="number"
                                            value={formik.values.soLuongM}
                                            onChange={formik.handleChange}
                                            className="form-control fs-4 text" />
                                        <label style={{ margin: "10px 10px 10px 50px", width: "100%" }}>Số lượng(L)</label>
                                        <input placeholder="0"
                                            name="soLuongL" type="number"
                                            value={formik.values.soLuongL}
                                            onChange={formik.handleChange}
                                            className="form-control fs-4 text" />
                                        <label style={{ margin: "10px 10px 10px 50px", width: "100%" }}>Số lượng(XL)</label>
                                        <input placeholder="0" name="soLuongXL"
                                            type="number"
                                            value={formik.values.soLuongXL}
                                            onChange={formik.handleChange}
                                            className="form-control fs-4 text" />
                                    </div>
                                    <p name='soLuongM' component="div" style={{ color: "red", fontWeight: "500" }} >
                                        {formik.errors.soLuongM ? (
                                            <p>{formik.errors.soLuongM}</p>
                                        ) : null}
                                    </p>
                                    <p name='soLuongL' component="div" style={{ color: "red", fontWeight: "500" }} >
                                        {formik.errors.soLuongL ? (
                                            <p>{formik.errors.soLuongL}</p>
                                        ) : null}
                                    </p>
                                    <p name='soLuongXL' component="div" style={{ color: "red", fontWeight: "500" }} >
                                        {formik.errors.soLuongXL ? (
                                            <p>{formik.errors.soLuongXL}</p>
                                        ) : null}
                                    </p>
                                    <div className="col-md-8 form-group mb-3">
                                        <label>Hình ảnh 1</label>
                                        <input
                                            type="file"
                                            id="image1"
                                            name="image1"
                                            value={formik.values.image1}
                                            onChange={(event) => {
                                                setImage1(event.currentTarget.files[0])
                                                formik.handleChange(event)
                                            }}
                                            className="form-control fs-4 text"
                                            style={{ padding: "7px 15px", fontSize: "16px" }}
                                        />
                                        <div style={{ marginTop: "10px" }}>
                                            {
                                                product.length > 0 ?
                                                    <img src={`http://localhost:4000/${product[0].hinh}`} width={200} /> : ""
                                            }
                                        </div>

                                    </div>
                                    <div className="col-md-8 form-group mb-3">
                                        <label>Hình ảnh 2</label>
                                        <input
                                            type="file" id="image2" name="image2" onChange={(event) => {
                                                setImage2(event.currentTarget.files[0])
                                                formik.handleChange(event)
                                            }}
                                            className="form-control fs-4 text"
                                            style={{ padding: "7px 15px", fontSize: "16px" }}
                                        />
                                        <div style={{ marginTop: "10px" }}>
                                            {
                                                product.length > 0 ?
                                                    <img src={`http://localhost:4000/${product[0].hinh2}`} width={200} /> : ""
                                            }
                                        </div>
                                        <p className="text-danger">
                                            <h1 name='image2' component="div" style={{ color: "red", fontWeight: "500" }} />
                                        </p>
                                    </div>
                                    <div className="col-md-8 form-group mb-3">
                                        <label>Hình ảnh 3 </label>
                                        <input
                                            type="file" id="image3" name="image3" onChange={(event) => {
                                                setImage3(event.currentTarget.files[0])
                                                formik.handleChange(event)
                                            }}
                                            className="form-control fs-4 text"
                                            style={{ padding: "7px 15px", fontSize: "16px" }}
                                        />
                                        <div style={{ marginTop: "10px" }}>
                                            {
                                                product.length > 0 ?
                                                    <img src={`http://localhost:4000/${product[0].hinh3}`} width={200} /> : ""
                                            }
                                        </div>
                                        <p className="text-danger">
                                            <h1 name='image3' component="div" style={{ color: "red", fontWeight: "500" }} />
                                        </p>
                                    </div>
                                    <div className="col-md-8 form-group mb-3">
                                        <label>Hình ảnh 4</label>
                                        <input
                                            type="file" id="image4" name="image4" onChange={(event) => {
                                                setImage4(event.currentTarget.files[0])
                                                formik.handleChange(event)
                                            }}
                                            className="form-control fs-4 text"
                                            style={{ padding: "7px 15px", fontSize: "16px" }}
                                        />
                                        <div>
                                            <div style={{ marginTop: "10px" }}>
                                                {
                                                    product.length > 0 ?
                                                        <img src={`http://localhost:4000/${product[0].hinh4}`} width={200} /> : ""
                                                }
                                            </div>
                                        </div>
                                        <p className="text-danger"><h1 name='image4' component="div" style={{ color: "red", fontWeight: "500" }} /></p>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Mô tả chi tiết</label>
                                        <textarea name="moTa" className="form-control fs-4 text" style={{ padding: "7px 15px", fontSize: "16px" }} />
                                        <p className="text-danger">
                                            <h1 name='moTa' component="div" style={{ color: "red", fontWeight: "500" }} />
                                        </p>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Trạng thái hoạt động</label>
                                        <select
                                            name="trangThai"
                                            value={formik.values.trangThai}
                                            onChange={formik.handleChange} className="form-control fs-4 text" style={{ padding: "7px 15px", fontSize: "16px" }}
                                        >
                                            <option value="1" >Hoạt động</option>
                                            <option value="0" >Tạm ngưng</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div style={{ width: "100%", paddingTop: "20px", textAlign: "center" }}
                            >
                                <button type="submit" className="btn btn-primary btn-lg px-4 mt-2 fs-4 text" style={{ padding: "10px", width: "200px" }}>
                                    Cập nhật
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditProduct;