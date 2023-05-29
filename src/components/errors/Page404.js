import React, { useEffect } from "react";
import page404 from "../../assets/frontend/img/error/404.png";
function Page404() {
    useEffect(() => {
        document.title = "Shop sóc xanh";
    },[])
    return (
        <React.Fragment>
            <div className="container__page404">
                <div className="grid wide">
                    <div className="row">
                        <div className="col l-12 m-12 c-12">
                            <img src={page404} className="page404" />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Page404;