import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../../API";

function Thanks() {

    useEffect(() => {
        API({
            method: "get",
            url:"vnpay/vnpay_return",
        }).then((response) => {
            console.log(response)
        })
        .catch(err => {
            console.error(err);
        });
    },[]);

    return (
        <React.Fragment>
        <div className="app__container">
            <div className="grid wide">
                <div className="row">
                    <div className="app__container--category">
                        <Link to="/" className="app__container--link">Trang chủ</Link>
                        <FontAwesomeIcon icon={faChevronRight} />
                        <p className="app__container--text">cảm ơn</p>
                    </div>
                </div>
                <div className="">
                    <div className="app__container--formLogin" style={{color:"#146791",width:"100%",textAlign:"center"}}>
                        
                        <div>
                            <h1>Chúng tôi sẽ gửi thông tin đơn hàng qua email cho bạn</h1>
                        </div>
                        <h1>Cảm ơn bạn đã tin tưởng đặt hàng của chúng tôi!</h1>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
    );
}

export default Thanks;