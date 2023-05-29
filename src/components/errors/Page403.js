import React, { useEffect } from "react";

function Page403() {
    useEffect(() => {
        document.title = "Shop sóc xanh";
    },[])
    return (
        <div className="page403">
            <h1 className="text"><span>403</span></h1>
        </div>
    );
}

export default Page403;