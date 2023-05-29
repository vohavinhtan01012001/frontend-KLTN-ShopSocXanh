import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../../API";
import Swal from "sweetalert2";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function AddPromotion({
    setShowAddPromotion,
    showAddPromotion,
    setRefersh,
    refersh
}) {

    //modal Add Promotion
    const handleCloseAddPromotion = () => {
        setShowAddPromotion(false)
        setRefersh(!refersh);
    };
    const handleShowAddPromotion = () => setShowAddPromotion(true);
    const [promotionInput, setPromotion] = useState({
        tieuDe: '',
        giamGia: '',
    });

    const handleInput = (e) => {
        e.persist();
        setPromotion({ ...promotionInput, [e.target.name]: e.target.value })
    }

    //event onSubmit add Promotion
    const submitPromotion = (e) => {
        e.preventDefault();
        if (promotionInput.tieuDe == '' || promotionInput.giamGia == '') {
            Swal.fire({
                text: 'Vui lòng nhập đầy đủ tất cả các trường!',
                icon: 'error',
                confirmButtonText: 'Đóng'
            })
            return;
        }
        if(promotionInput.giamGia > 100 || promotionInput.giamGia < 0) {
            Swal.fire({
                text: 'Nhập giá trị trong khoảng 0 đến 100%',
                icon: 'warning',
                confirmButtonText: 'Đóng'
            })
            return;
        }

        const data = {
            tieuDe: promotionInput.tieuDe,
            giamGia: promotionInput.giamGia,
        }

        API({
            method: 'post',
            url: `admin-promotion/add-promotion`,
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
                className="btn btn-primary btn-sm float-end fs-4 text"
                style={{ padding: "8px 10px", borderRadius: "5px" }}
                onClick={handleShowAddPromotion}
            >
                Thêm khuyến mãi
            </Button>
            <Modal
                show={showAddPromotion}
                onHide={handleCloseAddPromotion}
                size="lg"
                style={{ padding: "20px" }}
            >
                <form onSubmit={submitPromotion}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h1
                                style={{ fontWeight: "600" }}
                            >
                                Thêm khuyến mãi
                            </h1>
                        </Modal.Title>
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
                                    placeholder="Nhập tiêu đề khuyến mãi..."
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
                                        type="number"
                                        onChange={handleInput}
                                        name="giamGia"
                                        style={{ padding: "10px 15px", fontSize: "16px", maxWidth: "200px" }}
                                        placeholder="Nhập giá trị..." />
                                    <Form.Label><h2 style={{ paddingLeft: "10px", fontWeight: "800" }}>%</h2></Form.Label>
                                </div>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary fs" style={{ fontSize: "16px" }} onClick={handleCloseAddPromotion}>
                            Đóng
                        </Button>
                        <Button variant="primary lg" type='submit' style={{ fontSize: "16px" }} >
                            Thêm
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal >
        </>
    );
}

export default AddPromotion;