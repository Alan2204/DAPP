import React from "react";
import style from "../styles/contenedor.module.css"

const Contendor= (props) =>{
    return(
    <div className="card">
        <h5 className="card-header bg-info">Hola</h5>
        <div className="card-body">            
            <div className="card-text">{props.children}</div>            
        </div>
    </div>
                
    )
}

export default Contendor;