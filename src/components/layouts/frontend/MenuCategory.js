import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../../API';

function MenuCategory(props) {
    const [onMenu, setOnMenu] = useState(true);
    const [categorylist, setCategorylist] = useState([]);


    useEffect(() => {

        API({
            method: 'get',
            url: 'category/show-all',
        }).then((res) => {
            setCategorylist(res.data.categories);
        })

    }, []);


    //xử lý hiện menu
    const handleMenu = () => {
        if (!onMenu) {
            setOnMenu(true)
        }
        else {
            setOnMenu(false)
        }

    }

    var iconMenu = ""
    var listMenu = ""
    if (onMenu) {
        iconMenu = (<FontAwesomeIcon icon={faMinus} />)
        listMenu = (<ul className="tshirts__category--list">
            {categorylist.map((item, index) => {
                return (
                    <li key={index} className="tshirts__category--item"><Link to={`/category/${item.ten}`}>{item.ten}</Link></li>
                )
            })
            }
        </ul >)
    }

    else {
        iconMenu = (<FontAwesomeIcon icon={faPlus} />);
        listMenu = "";
    }

    function hanldeFilter(e) {
        props.parentCallback(e.target.value);
    }
    return (
        <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
            <div className="tshirts__category">
                <div className="tshirts__category--title">
                    <h3 className="tshirts__category--text">Danh mục nhóm</h3>
                    <div onClick={handleMenu} className="tshirts__category--minus">
                        {iconMenu}
                    </div>
                </div>
                {listMenu}
            </div>
            
        </div>
    );
}

export default MenuCategory;