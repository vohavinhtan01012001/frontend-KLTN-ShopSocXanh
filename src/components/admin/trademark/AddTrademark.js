import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2'
import API from '../../../API';
import AddCircleIcon from '@mui/icons-material/AddCircle';


function AddTrademark
    ({
        setShowAddTrademark,
        showAddTrademark,
        setRefersh,
        refersh
    }) {
    //modal Add Category
    const handleCloseAddTrademark = () => {
        setShowAddTrademark(false)
        setRefersh(!refersh);
    };
    const handleShowAddTrademark = () => setShowAddTrademark(true);
    const [trademarkInput, setTrademark] = useState({
        ten: '',
        moTa: ''
    });

    const handleInput = (e) => {
        e.persist();
        setTrademark({ ...trademarkInput, [e.target.name]: e.target.value })
    }


    //event onSubmit add Trademark
    const submitTrademark = (e) => {
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
            ten: trademarkInput.ten,
            moTa: trademarkInput.moTa,
        }

        API({
            method: 'post',
            url: `admin-trademark/add-trademark`,
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
            <button
                className='float-end navbar__admin--background '
                style={{ borderRadius: "50%", margin: '0 10px', padding: "0", height: "40px", width: "40px", lineHeight: "15px", textAlign: "center" }}
                onClick={handleShowAddTrademark}
            >
                <AddCircleIcon style={{ fontSize: "20px" }} />

            </button>
            <Modal
                show={showAddTrademark}
                onHide={handleCloseAddTrademark}
                size="lg"
                style={{ padding: "20px" }}
            >
                <form onSubmit={submitTrademark}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h1
                                style={{ fontWeight: "600" }}
                            >
                                Thêm thương hiệu
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
                                    name='ten'
                                    placeholder="Nhập tên sản phẩm..."
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
                        <Button variant="secondary fs" style={{ fontSize: "16px" }} onClick={handleCloseAddTrademark}>
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

export default AddTrademark