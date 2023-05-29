import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "../../../assets/admin/css/styles.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar"
import Footer from "./Footer"
import { AuthContext } from "../../../helpers/AuthContext";
import Swal from "sweetalert2";

function MasterLayout() {
    const { authState } = useContext(AuthContext);
    const history = useNavigate()
    useEffect(() => {
        if (authState.phanQuyen === 0
            || (
                localStorage.getItem('accessToken') !== undefined
                && authState.phanQuyen === ''
                && authState.status === true
            )
            || !localStorage.getItem('accessToken')) {
            Swal.fire({
                text: 'Bạn không phải QTV!',
                icon: 'warning',
                confirmButtonText: 'Đóng'
            })
            history('/')
        }
    }, [authState.phanQuyen])
   
    const [onMenu, setOnMenu] = useState(false);

    //Xử lý Sidebar Menu
    const hanleMenu = () => {
        if (!onMenu) {
            setOnMenu(true);
        }
        else {
            setOnMenu(false);
        }
    };
    const hanldClose = () => {
        if (onMenu) {
            setOnMenu(false);
        }
    }


    var menuAdminTabletMobile = "";
    var bodymodal = "";
    if (onMenu) {
        menuAdminTabletMobile = <Sidebar onCloseClick={hanldClose} />;
        bodymodal = <div onClick={hanldClose} className="body_modal"></div>
    }
    else {
        bodymodal = "";
        menuAdminTabletMobile = "";
    }

    return (
        <div className="container__admin">
            {menuAdminTabletMobile}
            <div id="layoutSidenav_content">
                <main>
                    <Navbar onNavbarClick={hanleMenu} />
                    <div className="container__admin--main"><Outlet /></div>
                </main>
                <Footer />
            </div>
            {bodymodal}
        </div>)
}

export default MasterLayout;