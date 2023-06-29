import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import API from '../../../API';
import Swal from 'sweetalert2';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

function EditRole
    ({
        showItemRole,
        setRefersh,
        refersh
    }) {
    const [roleInput, setRole] = useState([]);
    const [showEditRole, setShowEditRole] = useState(false);
    //modal Add Category


    const handleCloseEditRole = () => {
        setShowEditRole(false);
        setRefersh(!refersh)
    }
    const handleShowEditRole = (e) => {
        setShowEditRole(true)
        setRole(showItemRole)
    };


    const handleInput = (e) => {
        e.persist();
        setRole({ ...roleInput, [e.target.name]: e.target.value })
    }


    //event onSubmit edit Category
    const submitCategory = (e) => {
        e.preventDefault();
        if (roleInput.tenVaiTro == '') {
            Swal.fire({
                text: 'Tên không được để trống!',
                icon: 'error',
                confirmButtonText: 'Đóng'
            })
            return;
        }

        const data = {
            id: roleInput.id,
            tenVaiTro: roleInput.tenVaiTro,
            moTa: roleInput.moTa,
        }

        API({
            method: 'put',
            url: `/admin-permission/upload-role`,
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
                onClick={handleShowEditRole}
            >
                <DriveFileRenameOutlineIcon style={{ fontSize: "30px", color: "#5ec9ff" }} />
            </button>
            <Modal show={showEditRole} onHide={handleCloseEditRole} size="lg" style={{ padding: "20px" }}>
                <form onSubmit={submitCategory}>
                    <Modal.Header closeButton>
                        <Modal.Title><h1 style={{ fontWeight: "600" }}>Cập nhật loại sản phẩm</h1></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label><h2>Tên</h2></Form.Label>
                                <Form.Control
                                    onChange={handleInput}
                                    style={{ padding: "10px 15px", fontSize: "16px" }}
                                    type="text"
                                    name='tenVaiTro'
                                    value={roleInput.tenVaiTro}
                                    placeholder="Nhập tên vai trò..."
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
                                    value={roleInput.moTa}
                                    style={{ padding: "10px 15px", fontSize: "16px" }} placeholder="Nhập mô tả..." rows={3} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary fs" style={{ fontSize: "16px" }} onClick={handleCloseEditRole}>
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

export default EditRole