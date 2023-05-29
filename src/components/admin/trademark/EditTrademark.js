import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import API from '../../../API';
import Swal from 'sweetalert2';

function EditTrademark
    ({
        showItemTrademark,
        setRefersh,
        refersh
    }) {
    const [trademarkInput, setTrademark] = useState([]);
    const [showEditTrademark, setShowEditTrademark] = useState(false);
    //modal Add Category


    const handleCloseEditTrademark = () => {
        setShowEditTrademark(false);
        setRefersh(!refersh)
    }
    const handleShowEditTrademark = (e) => {
        setShowEditTrademark(true)
        setTrademark(showItemTrademark)
    };


    const handleInput = (e) => {
        e.persist();
        setTrademark({ ...trademarkInput, [e.target.name]: e.target.value })
    }


    //event onSubmit edit Category
    const submitCategory = (e) => {
        e.preventDefault();
        if (trademarkInput.ten == '') {
            Swal.fire({
                text: 'Tên không được để trống!',
                icon: 'error',
                confirmButtonText: 'Đóng'
            })
            return;
        }

        const data = {
            id: trademarkInput.id,
            ten: trademarkInput.ten,
            moTa: trademarkInput.moTa,
        }

        API({
            method: 'put',
            url: `/admin-trademark/upload-trademark`,
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
            <Button className="btn btn-primary btn-sm float-end fs-4 text" style={{ padding: "8px 10px", borderRadius: "5px",fontSize:"16px" }} onClick={handleShowEditTrademark}>Chỉnh sửa</Button>
            <Modal show={showEditTrademark} onHide={handleCloseEditTrademark} size="lg" style={{ padding: "20px" }}>
                <form onSubmit={submitCategory}>
                    <Modal.Header closeButton>
                        <Modal.Title><h1 style={{fontWeight:"600"}}>Cập nhật thương hiệu</h1></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label><h2>Tên</h2></Form.Label>
                                <Form.Control
                                    onChange={handleInput}
                                    style={{ padding: "10px 15px", fontSize: "16px" }}
                                    type="text"
                                    name='ten'
                                    value={trademarkInput.ten}
                                    placeholder="Nhập tên thương hiệu..."
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label><h2>Mô tả</h2></Form.Label>
                                <Form.Control
                                    as="textarea"
                                    onChange={handleInput}
                                    name="moTa"
                                    value={trademarkInput.moTa}
                                    style={{ padding: "10px 15px", fontSize: "16px" }} placeholder="Nhập mô tả..." rows={3} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary fs" style={{ fontSize: "16px" }} onClick={handleCloseEditTrademark}>
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

export default EditTrademark