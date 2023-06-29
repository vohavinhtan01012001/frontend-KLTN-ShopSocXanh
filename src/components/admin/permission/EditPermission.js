import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import API from '../../../API';
import Swal from 'sweetalert2';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

function EditPermission
    ({
        showItemPermission,
        setRefersh,
        refersh
    }) {
    const [permissionInput, setPermission] = useState([]);
    const [showEditPermission, setShowEditPermission] = useState(false);
    const [viewPermission, setViewPermission] = useState([]);
    const [checkbox, setCheckbox] = useState([]);
    //modal Add Category

    const handleCloseEditPermission = () => {
        setShowEditPermission(false);
        setRefersh(!refersh)
        setCheckbox([])
    }
    const handleShowEditPermission = (e) => {
        setShowEditPermission(true)
        setPermission(showItemPermission)

        API({
            method: 'get',
            url: `/admin-permission/show-permission/${showItemPermission.id}`,
        }).then((res) => {
            setCheckbox(res.data.rolePermissions.map((rolePermission) =>{
                return rolePermission.PhanQuyenId
            }))
        }).catch((err) => {
            console.error(err)
        });
    };
    console.log(checkbox)



    useEffect(() => {
        API({
            method: 'get',
            url: `/admin-permission/show-all`,
        }).then((res) => {
            setViewPermission(res.data.permissions)
            console.log(res.data.permissions)
        }).catch((err) => {
            console.error(err)
        });
    }, [refersh])

    const handleCheckboxChange = (e,id) => {
        if (e.target.checked) {
            setCheckbox([...checkbox, id]);
        } else {
            setCheckbox(checkbox.filter(item => item !== id));
        }
    }



    const handleInput = (e) => {
        e.persist();
        setPermission({ ...permissionInput, [e.target.name]: e.target.value })
    }


    //event onSubmit edit Category
    const submitCategory = (e) => {
        e.preventDefault();
        console.log(checkbox.length)
        const data = {
            permissions: checkbox,
        }
        console.log(checkbox)
        API({
            method: 'put',
            url: `/admin-permission/upload-RolePermissions/${permissionInput.id}`,
            data: data,
        }).then((res) => {
            Swal.fire({
                text: 'Cập nhật thành công!',
                icon: 'success',
                confirmButtonText: 'Đóng'
            })
        });
    }
    let count = 0;

    return (
        <>
            <button
                style={{ border: "0px", background: "none" }}
                onClick={handleShowEditPermission}
            >
                <ContentPasteIcon style={{ fontSize: "30px", color: "#5ec9ff" }} />
            </button>
            <Modal show={showEditPermission} onHide={handleCloseEditPermission} size="lg" style={{ padding: "20px" }}>
                <form onSubmit={submitCategory}>
                    <Modal.Header closeButton>
                        <Modal.Title><h1 style={{ fontWeight: "600" }}>Cập nhật phân quyền</h1></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label><h2>Tên vai trò</h2></Form.Label>
                                <Form.Control
                                    onChange={handleInput}
                                    style={{ padding: "10px 15px", fontSize: "16px" }}
                                    type="text"
                                    name='tenVaiTro'
                                    value={permissionInput.tenVaiTro}
                                    placeholder="Nhập tên loại sản phẩm..."
                                    readOnly
                                />
                            </Form.Group>
                            <h2 style={{ padding: "10px 0" }}>Phân quyền</h2>
                            {
                                viewPermission.map((item, index) => {
                                    const checkboxIndex = checkbox.findIndex((c) => c && c === item.id);
                                    const isChecked = checkboxIndex !== -1;
                                    return (
                                        <Form.Group
                                            className="mb-3 , d-flex align-items-center"
                                            controlId="exampleForm.ControlTextarea1"
                                        >
                                            <input
                                                type="checkbox"
                                                value={item.id}
                                                checked={isChecked}
                                                onChange={(e) => { handleCheckboxChange(e, item.id) }}
                                                name="phanQuyen"
                                                style={{ marginRight: "10px", width: "20px", height: "20px" }}

                                            />
                                            <Form.Label style={{ height: "20px" }}><h3>{item.tenQuanLi}</h3></Form.Label>
                                        </Form.Group>
                                    )
                                })
                            }
                            {/*  <Form.Group
                                className="mb-3 , d-flex align-items-center"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <input
                                    type="checkbox"
                                    onChange={handleInput}
                                    name="checkbox"
                                    style={{ marginRight: "10px", width: "20px", height: "20px" }}
                                />
                                <Form.Label style={{ height: "20px" }}><h3>Quản lý sản phẩm</h3></Form.Label>
                            </Form.Group> */}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary fs" style={{ fontSize: "16px" }} onClick={handleCloseEditPermission}>
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

export default EditPermission