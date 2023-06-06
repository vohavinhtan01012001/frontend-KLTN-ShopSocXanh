import { faAngleDown, faAngleRight, faBagShopping, faBox, faGauge, faPercent, faSliders, faTimes, faTrademark, faUserCircle, faUsersGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar({ onCloseClick }) {
    const [menuAdminProduct, setMenuAdminProduct] = useState(false);
    const [menuAdminCategory, setMenuAdminCategory] = useState(false);
    const [menuAdminPromotion, setMenuAdminPromotion] = useState(false);

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
                <li className="admin__menu--account">
                    <Link to="/admin/view-category" className="admin__menu--account-link">
                        <FontAwesomeIcon icon={faGauge} className="account__link--icon" />
                        <p>Thống kê</p>
                    </Link>
                </li>
                <li className="admin__menu--account">
                    <div onClick={handleMenuProduct} className="admin__menu--account-listMenu">
                        <div className="admin__menu--account-link">
                            <div className="admin__menu--account-text">
                                <FontAwesomeIcon icon={faBagShopping} className="account__link--icon" />
                                <p>Quản lý sản phẩm</p>
                            </div>
                            {iconMenuProduct}
                        </div>
                        {listMenuProduct}
                    </div>
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
                    <Link to="/admin/order" className="admin__menu--account-link">
                        <FontAwesomeIcon icon={faBox} className="account__link--icon" />
                        <p>Quản lý đơn hàng</p>
                    </Link>
                </li>
                <li className="admin__menu--account">
                    <Link to="/admin/view-account" className="admin__menu--account-link">
                        <FontAwesomeIcon icon={faUsersGear} className="account__link--icon" />
                        <p>Quản lý tài khoản</p>
                    </Link>
                </li>
                <li className="admin__menu--account">
                    <Link to="/admin/view-account" className="admin__menu--account-link">
                        <FontAwesomeIcon icon={faUsersGear} className="account__link--icon" />
                        <p>Quản lý Phân quyền</p>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Sidebar;