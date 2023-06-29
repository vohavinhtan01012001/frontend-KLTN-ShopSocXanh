import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import API from '../../../API';
import Swal from 'sweetalert2';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

function EditRole
    ({
        showItemPermission,
        setRefersh,
        refersh
    }) {
    const [permissionInput, setPermission] = useState([]);
    const [showEditPermission, setShowEditPermission] = useState(false);
    const [permissionList, setPermissionList] = useState([]);

    console.log(permissionInput);
    //modal Add Category

    useEffect(() => {
        API({
            method: 'get',
            url: `/admin-permission/show-all`,
        }).then((res) => {
            setPermissionList(res.data.role)
            console.log(res.data.trademarks)
        })
    }, []);


    const handleCloseEditCategory = () => {
        setShowEditPermission(false);
        setRefersh(!refersh)
    }
    const handleShowEditPermission = (e) => {
        setShowEditPermission(true)
        setPermission(showItemPermission)
    };


    const handleInput = (e) => {
        e.persist();
        setPermission({ ...permissionInput, [e.target.name]: e.target.value })
    }


    //event onSubmit edit Category
    const submitCategory = (e) => {
        e.preventDefault();


        const data = {
            id: permissionInput.id,
            VaiTroId: permissionInput.VaiTroId,
        }
        if(!data.VaiTroId){
            data.VaiTroId = permissionList[0].id;
        }
        console.log(data);

        API({
            method: 'put',
            url: `/admin-permission/upload-user`,
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
                onClick={handleShowEditPermission}
            >
                <DriveFileRenameOutlineIcon style={{ fontSize: "30px", color: "#5ec9ff" }} />
            </button>
            <Modal show={showEditPermission} onHide={handleCloseEditCategory} size="lg" style={{ padding: "20px" }}>
                <form onSubmit={submitCategory}>
                    <Modal.Header closeButton>
                        <Modal.Title><h1 style={{ fontWeight: "600" }}>Phân quyền nhân viên</h1></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label><h2>Mã nhân viên</h2></Form.Label>
                                <Form.Control
                                    onChange={handleInput}
                                    style={{ padding: "10px 15px", fontSize: "16px" }}
                                    type="text"
                                    name='id'
                                    value={permissionInput.id}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label><h2>Họ tên</h2></Form.Label>
                                <Form.Control
                                    onChange={handleInput}
                                    style={{ padding: "10px 15px", fontSize: "16px" }}
                                    type="text"
                                    name='hoTen'
                                    value={permissionInput.hoTen}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label><h2>Vai trò</h2></Form.Label>
                                <Form.Control as="select"
                                    style={{ padding: "10px 15px", fontSize: "16px" }}
                                    value={permissionInput.VaiTroId}
                                    onChange={handleInput}
                                    name="VaiTroId"

                                >
                                    {
                                        permissionList.map((item, index) => {
                                            return <option style={{ padding: "10px 15px", fontSize: "16px" }} value={item.id}>{item.tenVaiTro}</option>
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary fs" style={{ fontSize: "16px" }} onClick={handleCloseEditCategory}>
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