import React from "react";
import style from "../styles/contenedor.module.css"

const Contendor= (props) =>{
    return(
    <div className="card">
                   
        <div className="card-text">{props.children}</div>            
       
    </div>                
    )
}

export default Contendor;