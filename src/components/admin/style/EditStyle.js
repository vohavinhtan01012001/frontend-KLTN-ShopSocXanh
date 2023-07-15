import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import API from '../../../API';
import Swal from 'sweetalert2';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

function EditStyle
    ({
        showItemStyle,
        setRefersh,
        refersh
    }) {
    const [styleInput, setStyle] = useState([]);
    const [showEditStyle, setShowEditStyle] = useState(false);
    //modal Add color


    const handleCloseEditStyle = () => {
        setShowEditStyle(false);
        setRefersh(!refersh)
    }
    const handleShowEditStyle = (e) => {
        setShowEditStyle(true)
        setStyle(showItemStyle)
    };


    const handleInput = (e) => {
        e.persist();
        setStyle({ ...styleInput, [e.target.name]: e.target.value })
    }


    //event onSubmit edit Category
    const submitCategory = (e) => {
        e.preventDefault();
        if (styleInput.ten == '') {
            Swal.fire({
                text: 'Tên không được để trống!',
                icon: 'error',
                confirmButtonText: 'Đóng'
            })
            return;
        }

        const data = {
            id: styleInput.id,
            ten: styleInput.ten,
            moTa: styleInput.moTa,
        }
        console.log(data);
        API({
            method: 'put',
            url: `/admin-style/upload-style`,
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
                onClick={handleShowEditStyle}
            >
                <DriveFileRenameOutlineIcon style={{ fontSize: "30px", color: "#5ec9ff" }} />
            </button>
            <Modal show={showEditStyle} onHide={handleCloseEditStyle} size="lg" style={{ padding: "20px" }}>
                <form onSubmit={submitCategory}>
                    <Modal.Header closeButton>
                        <Modal.Title><h1 style={{ fontWeight: "600" }}>Cập nhật màu sắc</h1></Modal.Title>
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
                                    value={styleInput.ten}
                                    placeholder="Nhập tên màu sắc..."
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
                                    value={styleInput.moTa}
                                    style={{ padding: "10px 15px", fontSize: "16px" }} placeholder="Nhập mô tả..." rows={3} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary fs" style={{ fontSize: "16px" }} onClick={handleCloseEditStyle}>
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

export default EditStyle