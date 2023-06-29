import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2'
import API from '../../../API';

function AddMaterial
    ({
        setShowAddMaterial,
        showAddMaterial,
        setRefersh,
        refersh
    }) {
    //modal Add Color
    const handleCloseAddMaterial = () => {
        setShowAddMaterial(false)
        setRefersh(!refersh);
    };
    const handleShowAddMaterial = () => setShowAddMaterial(true);
    const [materialInput, setMaterial] = useState({
        tenChatLieu: '',
        moTa: ''
    });

    const handleInput = (e) => {
        e.persist();
        setMaterial({ ...materialInput, [e.target.name]: e.target.value })
    }


    //event onSubmit add Category
    const submitMaterial = (e) => {
        e.preventDefault();
        if (materialInput.tenChatLieu == '') {
            Swal.fire({
                text: 'Tên không được để trống!',
                icon: 'error',
                confirmButtonText: 'Đóng'
            })
            return;
        }

        const data = {
            tenChatLieu: materialInput.tenChatLieu,
            moTa: materialInput.moTa,
        }

        API({
            method: 'post',
            url: `admin-material/add-material`,
            data: data,
        }).then((res) => {
            Swal.fire({
                text: 'Thêm thành công!',
                icon: 'success',
                confirmButtonText: 'Đóng'
            })
            setRefersh(!refersh);
        });

    }
    return (
        <>
            <Button
                className="btn btn-primary btn-lg float-end fs-4 text"
                style={{ padding: "8px 10px", borderRadius: "5px" }}
                onClick={handleShowAddMaterial}
            >
                Thêm chất liệu
            </Button>
            <Modal
                show={showAddMaterial}
                onHide={handleCloseAddMaterial}
                size="lg"
                style={{ padding: "20px" }}
            >
                <form onSubmit={submitMaterial}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h1
                                style={{ fontWeight: "600" }}
                            >
                                Thêm chất liệu
                            </h1>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label><h2>Tên</h2></Form.Label>
                                <Form.Control
                                    onChange={handleInput}
                                    style={{ padding: "10px 15px", fontSize: "16px" }}
                                    type="text"
                                    name='tenChatLieu'
                                    placeholder="Nhập tên màu sắc..."
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label><h2>Mô tả</h2></Form.Label>
                                <Form.Control as="textarea"
                                    onChange={handleInput}
                                    name="moTa"
                                    style={{ padding: "10px 15px", fontSize: "16px" }} placeholder="Nhập mô tả..." rows={3} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary fs" style={{ fontSize: "16px" }} onClick={handleCloseAddMaterial}>
                            Đóng
                        </Button>
                        <Button variant="primary lg" type='submit' style={{ fontSize: "16px" }} >
                            Thêm
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default AddMaterial