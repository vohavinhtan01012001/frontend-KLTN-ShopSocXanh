import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import API from "../../../API";
import Button from "react-bootstrap/esm/Button";

function AddProduct() {
    const [categorylist, setCategorylist] = useState([]);
    const [trademarklist, setTrademarklist] = useState([]);
    const [promotionlist, setPromotionlist] = useState([]);
    const [colorlist, setColorlist] = useState([]);
    const [materialList, setMaterialList] = useState([]);
    const history = useNavigate()
    const [image1, setImage1] = useState();
    const [image2, setImage2] = useState();
    const [image3, setImage3] = useState();
    const [image4, setImage4] = useState();
    useEffect(() => {
        API({
            method: 'get',
            url: `/admin-category/show-all`,
        }).then((res) => {
            if (res.status === 200) {
                setCategorylist(res.data.categories)
                console.log(res.data.categories)
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

    useEffect(() => {
        API({
            method: 'get',
            url: `/admin-color/show-all`,
        }).then((res) => {
            if (res.status === 200) {
                setColorlist(res.data.colors)
                console.log(res.data.colors)
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
            url: `/admin-material/show-all`,
        }).then((res) => {
            if (res.status === 200) {
                setMaterialList(res.data.materials)
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
    const initialValues = {
        TheLoaiId: '',
        ten: '',
        giaTien: '',
        MauSacId: '',
        ChatLieuId: '',
        soLuongM: '',
        soLuongL: '',
        soLuongXL: '',
        image1: null,
        image2: null,
        image3: null,
        image4: null,
        moTa: '',
        KhuyenMaiId: null,
        ThuongHieuId: '',
        trangThai: 1,
    }
    const validationSchema = Yup.object().shape({
        TheLoaiId: Yup.string()
            .required('Loại sản phẩm là bắt buộc'),
        ThuongHieuId: Yup.string()
            .required('Thương hiệu là bắt buộc'),
        ten: Yup.string()
            .required('Tên sản phẩm là bắt buộc'),
        giaTien: Yup.number()
            .min(0, 'Giá tiền không được bé hơn 0')
            .required('Giá tiền là bắt buộc'),
        MauSacId: Yup.string()
            .required('Màu sắc là bắt buộc'),
        ChatLieuId: Yup.string()
            .required('Chất liệu là bắt buộc'),
        soLuongM: Yup.number()
            .min(0, 'số Lượng M không được bé hơn 0')
            .required('số Lượng M là bắt buộc'),
        soLuongL: Yup.number()
            .min(0, 'số Lượng L không được bé hơn 0')
            .required('số Lượng L là bắt buộc'),
        soLuongXL: Yup.number()
            .min(0, 'số Lượng XL không được bé hơn 0')
            .required('số Lượng XL là bắt buộc'),
        /* image1: Yup.mixed().required('Hình ảnh 1 là bắt buộc'),
        image2: Yup.mixed().required('Hình ảnh 2 là bắt buộc'),
        image3: Yup.mixed().required('Hình ảnh 3 là bắt buộc'),
        image4: Yup.mixed().required('Hình ảnh 4 là bắt buộc'), */
    })
    const handleSubmit = (values) => {
        try {
            values.image1 = image1;
            values.image2 = image2;
            values.image3 = image3;
            values.image4 = image4;
            console.log(values);
            if (values.image1 == null || values.image2 == null || values.image3 == null || values.image4 == null) {
                Swal.fire({
                    icon: 'warning',
                    text: 'Vui lòng nhập đầy đủ các trường file hình!',
                    confirmButtonText: 'Đóng'
                })
                return;
            }
            if (!values.KhuyenMaiId) {
                values.KhuyenMaiId = 0;
            }
            console.log(values)
            API({
                method: 'post',
                url: `admin-product/add-product`,
                data: values,
                headers: { 'Content-Type': 'multipart/form-data' }
            },)
                .then((res) => {
                    Swal.fire({
                        text: 'Thêm thành công!',
                        icon: 'success',
                        confirmButtonText: 'Đóng'
                    })

                }).catch((err) => {
                    console.log(err);
                    Swal.fire({
                        icon: 'warning',
                        title: 'Error',
                        confirmButtonText: 'Đóng'
                    })
                });

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="container" >
                <div className="card-header" style={{ padding: "30px 0" }}>
                    <h1 style={{ fontWeight: "700" }}>Thêm sản phẩm
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
                <div className="card mt-4 box-addProduct" style={{ background: "white" }}>

                    <div className="card-body">
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                            validationSchema={validationSchema}
                        >
                            <Form>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                                        <div className="form-group mb-3">
                                            <label>Loại sản phẩm</label>
                                            <Field placeholder="Nhập" as="select" name="TheLoaiId" className="form-control fs-4 text" style={{ padding: "7px 15px", fontSize: "16px" }}>
                                                <option>---loại sản phẩm---</option>
                                                {
                                                    categorylist.map((item) => {
                                                        return (
                                                            <option value={item.id} key={item.id}>{item.ten}</option>
                                                        )
                                                    })
                                                }
                                            </Field>
                                            <p className="text-danger">
                                                <ErrorMessage name='TheLoaiId' component="div" style={{ color: "red", fontWeight: "500" }}
                                                />
                                            </p>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Thương hiệu</label>
                                            <Field placeholder="Nhập" as="select" name="ThuongHieuId" className="form-control fs-4 text" style={{ padding: "7px 15px", fontSize: "16px" }}>
                                                <option>---Thương hiệu---</option>
                                                {
                                                    trademarklist.map((item) => {
                                                        return (
                                                            <option value={item.id} key={item.id}>{item.ten}</option>
                                                        )
                                                    })
                                                }
                                            </Field>
                                            <p className="text-danger">
                                                <ErrorMessage name='ThuongHieuId' component="div" style={{ color: "red", fontWeight: "500" }}
                                                />
                                            </p>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Tên sản phẩm</label>
                                            <Field placeholder="Nhập tên sản phẩm..." name="ten" className="form-control fs-4 text" style={{ padding: "7px 15px", fontSize: "16px" }} />
                                            <p className="text-danger">
                                                <ErrorMessage name='ten' component="div" style={{ color: "red", fontWeight: "500" }} />
                                            </p>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Giá bán</label>
                                            <div style={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                                                <Field placeholder="Nhập giá tiền..." name="giaTien" type="number" className="form-control fs-4 text" style={{ padding: "7px 15px", fontSize: "16px", display: "flex", width: "20%", marginRight: "10px" }} />
                                                <span> VNĐ</span>
                                            </div>
                                            <p className="text-danger">
                                                <ErrorMessage name='giaTien' component="div" style={{ color: "red", fontWeight: "500" }} />
                                            </p>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Chương trình khuyến mãi</label>
                                            <Field placeholder="Nhập" as="select" name="KhuyenMaiId" className="form-control fs-4 text" style={{ padding: "7px 15px", fontSize: "16px" }}>
                                                <option value='0' >---Chương trình khuyến mãi---</option>
                                                {
                                                    promotionlist.map((item) => {
                                                        return (
                                                            <option value={item.id} key={item.id}>{item.tieuDe}</option>
                                                        )
                                                    })
                                                }
                                            </Field>
                                            <p className="text-danger">
                                                <ErrorMessage name='KhuyenMaiId' component="div" style={{ color: "red", fontWeight: "500" }}
                                                />
                                            </p>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Màu sắc</label>
                                            <Field placeholder="Nhập" as="select" name="MauSacId" className="form-control fs-4 text" style={{ padding: "7px 15px", fontSize: "16px" }}>
                                                <option value='0' >---Màu sắc---</option>
                                                {
                                                    colorlist.map((item) => {
                                                        return (
                                                            <option value={item.id} key={item.id}>{item.ten}</option>
                                                        )
                                                    })
                                                }
                                            </Field>
                                            <p className="text-danger">
                                                <ErrorMessage name='MauSacId' component="div" style={{ color: "red", fontWeight: "500" }} />
                                            </p>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Chất liệu</label>
                                            <Field placeholder="Nhập" as="select" name="ChatLieuId" className="form-control fs-4 text" style={{ padding: "7px 15px", fontSize: "16px" }}>
                                                <option value='0' >---Chất liệu---</option>
                                                {
                                                    materialList.map((item) => {
                                                        return (
                                                            <option value={item.id} key={item.id}>{item.ten}</option>
                                                        )
                                                    })
                                                }
                                            </Field>
                                            <p className="text-danger">
                                                <ErrorMessage name='ChatLieuId' component="div" style={{ color: "red", fontWeight: "500" }} />
                                            </p>
                                        </div>
                                        <div className="form-group mb-3" style={{ display: "flex" }}>
                                            <label style={{ margin: "10px 10px 10px 50px", width: "100%" }}>Số lượng(M)</label>
                                            <Field placeholder="0" name="soLuongM"
                                                type="number" className="form-control fs-4 text" />
                                            <p className="text-danger" style={{ display: "block" }}>

                                            </p>
                                            <label style={{ margin: "10px 10px 10px 50px", width: "100%" }}>Số lượng(L)</label>
                                            <Field placeholder="0"
                                                name="soLuongL" type="number"
                                                className="form-control fs-4 text" />
                                            <p className="text-danger" style={{ display: "block" }}>

                                            </p>
                                            <label style={{ margin: "10px 10px 10px 50px", width: "100%" }}>Số lượng(XL)</label>
                                            <Field placeholder="0" name="soLuongXL"
                                                type="number"
                                                className="form-control fs-4 text" />
                                            <p className="text-danger" style={{ display: "block" }}>

                                            </p>
                                        </div>
                                        <ErrorMessage name='soLuongM' component="div" style={{ color: "red", fontWeight: "500" }} />
                                        <ErrorMessage name='soLuongL' component="div" style={{ color: "red", fontWeight: "500" }} />
                                        <ErrorMessage name='soLuongXL' component="div" style={{ color: "red", fontWeight: "500" }} />
                                        <div className="col-md-8 form-group mb-3">
                                            <label>Hình ảnh 1</label>
                                            <input
                                                type="file" id="image1" name="image1" onChange={(event) => {
                                                    setImage1(event.currentTarget.files[0]);
                                                }}
                                                className="form-control fs-4 text"
                                                style={{ padding: "7px 15px", fontSize: "16px" }}
                                            />
                                            <p className="text-danger"><ErrorMessage name='image1' component="div" style={{ color: "red", fontWeight: "500" }} /></p>
                                        </div>
                                        <div className="col-md-8 form-group mb-3">
                                            <label>Hình ảnh 2</label>
                                            <input
                                                type="file" id="image2" name="image2" onChange={(event) => {
                                                    setImage2(event.currentTarget.files[0]);
                                                }}
                                                className="form-control fs-4 text"
                                                style={{ padding: "7px 15px", fontSize: "16px" }}
                                            />
                                            <p className="text-danger">
                                                <ErrorMessage name='image2' component="div" style={{ color: "red", fontWeight: "500" }} />
                                            </p>
                                        </div>
                                        <div className="col-md-8 form-group mb-3">
                                            <label>Hình ảnh 3 </label>
                                            <input
                                                type="file" id="image3" name="image3" onChange={(event) => {
                                                    setImage3(event.currentTarget.files[0]);
                                                }}
                                                className="form-control fs-4 text"
                                                style={{ padding: "7px 15px", fontSize: "16px" }}
                                            />
                                            <p className="text-danger">
                                                <ErrorMessage name='image3' component="div" style={{ color: "red", fontWeight: "500" }} />
                                            </p>
                                        </div>
                                        <div className="col-md-8 form-group mb-3">
                                            <label>Hình ảnh 4</label>
                                            <input
                                                type="file" id="image4" name="image4" onChange={(event) => {
                                                    setImage4(event.currentTarget.files[0]);
                                                }}
                                                className="form-control fs-4 text"
                                                style={{ padding: "7px 15px", fontSize: "16px" }}
                                            />
                                            <p className="text-danger"><ErrorMessage name='image4' component="div" style={{ color: "red", fontWeight: "500" }} /></p>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Mô tả chi tiết</label>
                                            <Field as="textarea" name="moTa" className="form-control fs-4 text" style={{ padding: "7px 15px", fontSize: "16px" }} />
                                            <p className="text-danger">
                                                <ErrorMessage name='moTa' component="div" style={{ color: "red", fontWeight: "500" }} />
                                            </p>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Trạng thái hoạt động</label>
                                            <Field as="select" name="trangThai" className="form-control fs-4 text" style={{ padding: "7px 15px", fontSize: "16px" }}>
                                                <option value="1" >Hoạt động</option>
                                                <option value="0" >Tạm ngưng</option>
                                            </Field>

                                        </div>
                                    </div>
                                </div>
                                <div style={{ width: "100%", paddingTop: "20px", textAlign: "center" }}
                                >
                                    <button type="submit" className="btn btn-primary btn-lg px-4 mt-2 fs-4 text" style={{ padding: "10px", width: "200px" }}>
                                        Thêm sản phẩm
                                    </button>
                                </div>

                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
};


export default AddProduct;