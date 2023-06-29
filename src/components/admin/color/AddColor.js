import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2'
import API from '../../../API';

function AddColor
    ({
        setShowAddColor,
        showAddColor,
        setRefersh,
        refersh
    }) {
    //modal Add Color
    const handleCloseAddColor = () => {
        setShowAddColor(false)
        setRefersh(!refersh);
    };
    const handleShowAddColor = () => setShowAddColor(true);
    const [colorInput, setColor] = useState({
        tenMauSac: '',
        moTa: ''
    });

    const handleInput = (e) => {
        e.persist();
        setColor({ ...colorInput, [e.target.name]: e.target.value })
    }


    //event onSubmit add Category
    const submitColor = (e) => {
        e.preventDefault();
        if (colorInput.tenMauSac == '') {
            Swal.fire({
                text: 'Tên không được để trống!',
                icon: 'error',
                confirmButtonText: 'Đóng'
            })
            return;
        }

        const data = {
            tenMauSac: colorInput.tenMauSac,
            moTa: colorInput.moTa,
        }

        API({
            method: 'post',
            url: `admin-color/add-color`,
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
                onClick={handleShowAddColor}
            >
                Thêm màu
            </Button>
            <Modal
                show={showAddColor}
                onHide={handleCloseAddColor}
                size="lg"
                style={{ padding: "20px" }}
            >
                <form onSubmit={submitColor}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h1
                                style={{ fontWeight: "600" }}
                            >
                                Thêm màu sắc
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
                                    name='tenMauSac'
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
                        <Button variant="secondary fs" style={{ fontSize: "16px" }} onClick={handleCloseAddColor}>
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

export default AddColor