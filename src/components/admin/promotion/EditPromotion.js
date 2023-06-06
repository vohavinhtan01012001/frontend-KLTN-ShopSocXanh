import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import API from '../../../API';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import Swal from 'sweetalert2';

function EditPromotion({
    showItemPromotion,
    setRefersh,
    refersh
}) {
    const [promotionInput, setPromotion] = useState([]);
    const [showEditPromotion, setShowEditPromotion] = useState(false);

    //modal Add Promotion


    const handleCloseEditPromotion = () => {
        setShowEditPromotion(false);
        setRefersh(!refersh)
    }
    const handleShowEditPromotion = (e) => {
        setShowEditPromotion(true)
        setPromotion(showItemPromotion)
    };


    const handleInput = (e) => {
        e.persist();
        setPromotion({ ...promotionInput, [e.target.name]: e.target.value })
    }


    //event onSubmit edit Category
    const submitCategory = (e) => {
        e.preventDefault();
        if (promotionInput.tieuDe == '' || promotionInput.giamGia == '') {
            Swal.fire({
                text: 'Vui lòng nhập đầy đủ tất cả các trường!',
                icon: 'error',
                confirmButtonText: 'Đóng'
            })
            return;
        }
        if (promotionInput.giamGia > 100 || promotionInput.giamGia < 0) {
            Swal.fire({
                text: 'Nhập giá trị trong khoảng 0 đến 100%',
                icon: 'warning',
                confirmButtonText: 'Đóng'
            })
            return;
        }

        const data = {
            id: promotionInput.id,
            tieuDe: promotionInput.tieuDe,
            giamGia: promotionInput.giamGia,
        }

        API({
            method: 'put',
            url: `/admin-promotion/upload-promotion`,
            data: data,
        }).then((res) => {
            Swal.fire({
                text: 'Cập nhật thành công!',
                icon: 'success',
                confirmButtonText: 'Đóng'
            })
        });

    }
    return (
        <>
            <button
                style={{ border: "0px", background: "none" }}
                onClick={handleShowEditPromotion}
            >
                <DriveFileRenameOutlineIcon style={{ fontSize: "30px", color: "#5ec9ff" }} />
            </button>
            <Modal show={showEditPromotion} onHide={handleCloseEditPromotion} size="lg" style={{ padding: "20px" }}>
                <form onSubmit={submitCategory}>
                    <Modal.Header closeButton>
                        <Modal.Title><h1 style={{ fontWeight: "600" }}>Cập nhật khuyến mãi</h1></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label><h2>Tiêu đề</h2></Form.Label>
                                <Form.Control
                                    onChange={handleInput}
                                    style={{ padding: "10px 15px", fontSize: "16px" }}
                                    type="text"
                                    name='tieuDe'
                                    value={promotionInput.tieuDe}
                                    placeholder="Nhập tên sản phẩm..."
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label><h2>Giá trị khuyến mãi</h2></Form.Label>
                                <div style={{ display: 'flex', alignItems: "center" }}>
                                    <Form.Control
                                        onChange={handleInput}
                                        name="giamGia"
                                        value={promotionInput.giamGia}
                                        style={{ padding: "10px 15px", fontSize: "16px", maxWidth: "200px" }}
                                        placeholder="Nhập giá trị..." />
                                    <Form.Label><h2 style={{ paddingLeft: "10px", fontWeight: "800" }}>%</h2></Form.Label>
                                </div>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary fs" style={{ fontSize: "16px" }} onClick={handleCloseEditPromotion}>
                            Đóng
                        </Button>
                        <Button variant="primary lg" style={{ fontSize: "16px" }} type='submit'>
                            Cập nhật
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default EditPromotion;