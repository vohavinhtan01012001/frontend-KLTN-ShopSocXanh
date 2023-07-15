import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../helpers/AuthContext'
import API from '../../../API';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
function Profile() {
    const { authState } = useContext(AuthContext)
    const [nameRole, setNameRole] = useState()
    const [listPermission, setListPermission] = useState([])
    useEffect(() => {
        API({
            method: 'get',
            url: `admin-permission/show-role/${authState.VaiTroId}`,
        }).then((res) => {
            console.log(res.data)
            console.log(authState.VaiTroId)
            setNameRole(res.data.role.tenVaiTro)
            setListPermission(res.data.listPermission)
        })
    }, [authState.VaiTroId]);
    return (
        <div style={{ width: "100%", marginTop: "20px" }}>
            <div style={{ boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)", background: "white", width: "50%", borderRadius: "20px", padding: "20px 0", margin: "0 auto", backgroundColor: "#f8f9fa" }}>
                <div className='d-flex' style={{ alignItems: "center", justifyContent: "start", width: "80%", margin: "30px auto" }}>
                    <h2 style={{ marginLeft: "20px", marginRight: "20px", fontWeight: "bold" }}>Họ và tên:</h2>
                    {/* <input
                            style={{ padding: "10px 15px", fontSize: "16px" }}
                            type="text"
                            value={authState.hoTen}
                            disabled
                        /> */}
                    <h2 style={{ width: "60%" }}>{authState.hoTen}</h2>
                </div>
                <div className='d-flex' style={{ alignItems: "center", justifyContent: "start", width: "80%", margin: "30px auto" }}>
                    <h2 style={{ marginLeft: "20px", marginRight: "20px", fontWeight: "bold" }}>Địa chỉ:</h2>
                    {/* <input
                            style={{ padding: "10px 15px", fontSize: "16px" }}
                            type="text"
                            value={authState.sdt}
                            disabled
                        /> */}
                    <h2 style={{ width: "60%" }}>{authState.diaChi}</h2>
                </div>
                <div className='d-flex' style={{ alignItems: "center", justifyContent: "start", width: "80%", margin: "30px auto" }}>
                    <h2 style={{ marginLeft: "20px", marginRight: "20px", fontWeight: "bold" }}>Số điện thoại:</h2>
                    {/* <input
                            style={{ padding: "10px 15px", fontSize: "16px" }}
                            type="text"
                            value={authState.diaChi}
                            disabled
                        /> */}
                    <h2 style={{ width: "60%" }}>{authState.sdt}</h2>
                </div>
                <div className='d-flex' style={{ alignItems: "center", justifyContent: "start", width: "80%", margin: "30px auto" }}>
                    <h2 style={{ marginLeft: "20px", marginRight: "20px", fontWeight: "bold" }}>Vai trò:</h2>
                    {
                        authState.phanQuyen === 1 ? <h2 style={{width:"60%"}}>Admin</h2>:
                        <h2 style={{ width: "60%" }}>{nameRole && nameRole}</h2>
                        
                    }
                </div>
            </div>
            <div style={{ boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)", background: "white", width: "50%", borderRadius: "20px", padding: "20px 0", margin: "50px auto", backgroundColor: "#f8f9fa", paddingLeft: "50px" }}>
                <h2 style={{ fontWeight: "bold" }}>Danh sách được quản lý:</h2>
                {
                    listPermission.map((item) => {
                        return (
                            <><h2 style={{ paddingTop: "20px" }}><LabelImportantIcon style={{ margin: "0 20px", fontSize: "20px" }} />{item}</h2></>
                        )
                    })
                }
                {
                    authState.phanQuyen === 1 && 
                    <h2 style={{color:"red",fontWeight:"bold",textAlign:"center"}}>Tất cả</h2>
                }
            </div>
        </div>
    )
}

export default Profile