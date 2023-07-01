import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function ButtonIcon({ icon, to }) {
    const history = useNavigate()    
    return (
        <button
            onClick={()=> history(to)}
            className='float-end navbar__admin--background '
            style={{ borderRadius: "50%", margin: '0 10px', padding: "0", height: "40px", width: "40px", lineHeight: "15px", textAlign: "center" }}
        >
            {icon}
        </button>
    )
}

export default ButtonIcon