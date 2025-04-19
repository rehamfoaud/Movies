import React, { useState } from 'react';
import './Button.css';


function Button(props){
    const {text,btnClass,width,height,border,margin,bgColor,radius,onClick}=props;
    return(
        <div className='buttonComponent'>
            <button className={`${btnClass} text-white`}
            onClick={onClick}
            style={{
                width,
                height,
                border,
                marginTop:margin,
                backgroundColor:bgColor,
                borderRadius:radius
            }}
            >{text}</button>
        </div>
    )
}
export default Button;