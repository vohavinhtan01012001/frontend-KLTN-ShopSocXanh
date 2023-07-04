import { faAngleDown, faAngleRight, faBagShopping, faBox, faGauge, faLayerGroup, faPercent, faSliders, faTimes, faTrademark, faUserCircle, faUserGear, faUsersGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../helpers/AuthContext";
import API from "../../../API";


function Sidebar({ onCloseClick }) {
    const [menuAdminProduct, setMenuAdminProduct] = useState(false);
    const [menuAdminCategory, setMenuAdminCategory] = useState(false);
    const [menuAdminPromotion, setMenuAdminPromotion] = useState(false);
    const [permission, setPermission] = useState([]);
    const { authState } = useContext(AuthContext);
    //Xử lý hiện menu sản phẩm
    const handleMenuProduct = () => {
        if (!menuAdminProduct) {
            setMenuAdminProduct(true);
        }
        else {
            setMenuAdminProduct(false);
        }
    };

    var listMenuProduct = "";
    var iconMenuProduct = "";
    if (menuAdminProduct) {
        iconMenuProduct = (<FontAwesomeIcon icon={faAngleDown} className="menu__admin--icon" />)
        listMenuProduct = (<ul className='header__menu-list2'>
            <li className='haeder__menu-item2'>
                <Link to="/admin/add-product" className='header__menu-link2'>Thêm sản phẩm</Link>
            </li>
            <li className='haeder__menu-item2'>
                <Link to="/admin/view-product" className='header__menu-link2'>Danh sách sản phẩm</Link>
            </li>
        </ul>)
    }
    else {
        iconMenuProduct = (<FontAwesomeIcon icon={faAngleRight} className="menu__admin--icon" />)
        listMenuProduct = "";
    }

    //Xử lý hiện menu phân loại

    const handleMenuCategory = () => {
        if (!menuAdminCategory) {
            setMenuAdminCategory(true);
        }
        else {
            setMenuAdminCategory(false);
        }
    };

    var listMenuCategory = "";
    var iconMenuCategory = "";
    if (menuAdminCategory) {
        iconMenuCategory = (<FontAwesomeIcon icon={faAngleDown} className="menu__admin--icon" />)
        listMenuCategory = (<ul className='header__menu-list2'>
            <li className='haeder__menu-item2'>
                <Link to="/admin/view-Category" className='header__menu-link2'>Danh sách loại sản phẩm</Link>
            </li>
        </ul>)
    }
    else {
        iconMenuCategory = (<FontAwesomeIcon icon={faAngleRight} className="menu__admin--icon" />)
        listMenuCategory = "";
    }

    //Xử lý hiện menu Khuyến mãi

    const handleMenuPromotion = () => {
        if (!menuAdminPromotion) {
            setMenuAdminPromotion(true);
        }
        else {
            setMenuAdminPromotion(false);
        }
    };

    var listMenuPromotion = "";
    var iconMenuPromotion = "";
    if (menuAdminPromotion) {
        iconMenuPromotion = (<FontAwesomeIcon icon={faAngleDown} className="menu__admin--icon" />)
        listMenuPromotion = (<ul className='header__menu-list2'>
            <li className='haeder__menu-item2'>
                <Link to="/admin/add-Promotion" className='header__menu-link2'>Thêm Khuyến mãi</Link>
            </li>
            <li className='haeder__menu-item2'>
                <Link to="/admin/view-Promotion" className='header__menu-link2'>Danh sách khuyến mãi</Link>
            </li>
        </ul>)
    }
    else {
        iconMenuPromotion = (<FontAwesomeIcon icon={faAngleRight} className="menu__admin--icon" />)
        listMenuPromotion = "";
    }


    useEffect(() => {
        API({
            method: 'get',
            url: `admin-permission/permission/${authState.VaiTroId}`,
        }).then((res) => {
            setPermission(res.data.RolePermissions);
            console.log(res.data.RolePermissions);
        })
    }, [authState.VaiTroId])

    console.log(permission.PhanQuyenId === 1)

    return (
        <nav className="Sidebar__admin">
            <ul className="Sidebar__admin--menu">
                {/* <li className="admin__menu--account">
                    <div className="admin__menu--close-icon" onClick={onCloseClick}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </li>
                <li className="admin__menu--account-first">
                    <Link className="admin__menu--account-link-first">
                        <div className="admin__menu--account-icon">
                            <FontAwesomeIcon icon={faUserCircle} />
                        </div>
                        <p>Admin</p>
                    </Link>
                </li> */}
                {
                    authState.phanQuyen === 1 &&
                    <>
                        <li className="admin__menu--account">
                            <Link to="/admin/dashboard" className="admin__menu--account-link">
                                <FontAwesomeIcon icon={faGauge} className="account__link--icon" />
                                <p>Thống kê</p>
                            </Link>
                        </li>
                        <li className="admin__menu--account">
                            <Link to="/admin/view-product" className="admin__menu--account-link">
                                <FontAwesomeIcon icon={faBagShopping} className="account__link--icon" />
                                <p>Quản lý sản phẩm</p>
                            </Link>
                        </li>
                        <li className="admin__menu--account">
                            <Link to="/admin/view-category" className="admin__menu--account-link">
                                <FontAwesomeIcon icon={faSliders} className="account__link--icon" />
                                <p>Quản lý loại sản phẩm</p>
                            </Link>
                        </li>
                        <li className="admin__menu--account">
                            <Link to="/admin/view-promotion" className="admin__menu--account-link">
                                <FontAwesomeIcon icon={faPercent} className="account__link--icon" />
                                <p>Quản lý khuyến mãi</p>
                            </Link>
                        </li>
                        <li className="admin__menu--account">
                            <Link to="/admin/view-trademark" className="admin__menu--account-link">
                                <FontAwesomeIcon icon={faTrademark} className="account__link--icon" />
                                <p>Quản lý thương hiệu</p>
                            </Link>
                        </li>
                        <li className="admin__menu--account">
                            <Link to="/admin/view-order" className="admin__menu--account-link">
                                <FontAwesomeIcon icon={faBox} className="account__link--icon" />
                                <p>Quản lý đơn hàng</p>
                            </Link>
                        </li>
                        <li className="admin__menu--account">
                            <Link to="/admin/view-account" className="admin__menu--account-link">
                                <FontAwesomeIcon icon={faUsersGear} className="account__link--icon" />
                                <p>Quản lý khách hàng</p>
                            </Link>
                        </li>
                        <li className="admin__menu--account">
                            <Link to="/admin/view-staff" className="admin__menu--account-link">
                                <FontAwesomeIcon icon={faUsersGear} className="account__link--icon" />
                                <p>Quản lý nhân viên</p>
                            </Link>
                        </li>
                        <li className="admin__menu--account">
                            <Link to="/admin/view-role" className="admin__menu--account-link">
                                <FontAwesomeIcon icon={faLayerGroup} className="account__link--icon" />
                                <p>Quản lý phân quyền</p>
                            </Link>
                        </li>
                    </>
                }
                {
                    authState.phanQuyen === 2 && permission.PhanQuyenId == 1 ?
                        <li className="admin__menu--account">
                            <Link to="/admin/view-product" className="admin__menu--account-link">
                                <FontAwesomeIcon icon={faBagShopping} className="account__link--icon" />
                                <p>Quản lý sản phẩm</p>
                            </Link>
                        </li> : ""

                }
                {
                    authState.phanQuyen === 2 ?
                        permission.map((item, index) => {
                            if (item.PhanQuyenId === 1) {
                                return <li className="admin__menu--account">
                                    <Link to="/admin/view-product" className="admin__menu--account-link">
                                        <FontAwesomeIcon icon={faBagShopping} className="account__link--icon" />
                                        <p>Quản lý sản phẩm</p>
                                    </Link>
                                </li>
                            }
                            else if (item.PhanQuyenId === 2) {
                                return <li className="admin__menu--account">
                                    <Link to="/admin/view-category" className="admin__menu--account-link">
                                        <FontAwesomeIcon icon={faSliders} className="account__link--icon" />
                                        <p>Quản lý loại sản phẩm</p>
                                    </Link>
                                </li>
                            }
                            else if (item.PhanQuyenId === 3) {
                                return <li className="admin__menu--account">
                                    <Link to="/admin/view-promotion" className="admin__menu--account-link">
                                        <FontAwesomeIcon icon={faPercent} className="account__link--icon" />
                                        <p>Quản lý khuyến mãi</p>
                                    </Link>
                                </li>
                            }
                            else if (item.PhanQuyenId === 4) {
                                return <li className="admin__menu--account">
                                    <Link to="/admin/view-trademark" className="admin__menu--account-link">
                                        <FontAwesomeIcon icon={faTrademark} className="account__link--icon" />
                                        <p>Quản lý thương hiệu</p>
                                    </Link>
                                </li>
                            }
                            else if (item.PhanQuyenId === 5) {
                                return <li className="admin__menu--account">
                                    <Link to="/admin/view-order" className="admin__menu--account-link">
                                        <FontAwesomeIcon icon={faBox} className="account__link--icon" />
                                        <p>Quản lý đơn hàng</p>
                                    </Link>
                                </li>
                            }
                            else if (item.PhanQuyenId === 6) {
                                return <li className="admin__menu--account">
                                    <Link to="/admin/view-account" className="admin__menu--account-link">
                                        <FontAwesomeIcon icon={faUsersGear} className="account__link--icon" />
                                        <p>Quản lý khách hàng</p>
                                    </Link>
                                </li>
                            }
                            else if (item.PhanQuyenId === 7) {
                                return <li className="admin__menu--account">
                                    <Link to="/admin/view-staff" className="admin__menu--account-link">
                                        <FontAwesomeIcon icon={faUsersGear} className="account__link--icon" />
                                        <p>Quản lý nhân viên</p>
                                    </Link>
                                </li>
                            }
                            else if (item.PhanQuyenId === 8) {
                                return <li className="admin__menu--account">
                                    <Link to="/admin/view-role" className="admin__menu--account-link">
                                        <FontAwesomeIcon icon={faLayerGroup} className="account__link--icon" />
                                        <p>Quản lý phân quyền</p>
                                    </Link>
                                </li>
                            }
                        }) : ""

                }
            </ul>
        </nav>
    )
}

export default Sidebar;