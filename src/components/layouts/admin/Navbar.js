import { faBars, faRightFromBracket, faSearch, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../assets/admin/css/styles.css";
import React from "react";
import { Link } from "react-router-dom";

function Navbar({onNavbarClick}) {

/*     if(onClick(true)) {
        onClick(false);
    }
    else{
        onClick(true);
    }
 */
    return (
        <nav className="navbar__admin">
            <div className="grid">
                <div className="row">
                    <div className="col">
                        <div className="navbar_admin--menu" onClick={onNavbarClick}>
                            <FontAwesomeIcon icon={faBars} className="navbar_admin--menu-icon" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="navbar__admin--search">
                            {/* <button className="admin__search--Sidebar" >
                                <FontAwesomeIcon icon={faSearch} />
                            </button> */}
                            
                        </div>
                    </div>
                    <div className="col">
                        <div className="navbar__admin--btn">
                            <button className="navbar__admin--background">
                                <FontAwesomeIcon icon={faSun} />
                            </button>
                            <Link to="/account" className="navbar__admin--exit">
                                <FontAwesomeIcon icon={faRightFromBracket} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;