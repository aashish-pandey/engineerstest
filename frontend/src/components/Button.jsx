import React from "react";

const Button = ({ type = 'button', onClick, children, className = ''}) => {
    return (
        <button type={type} onClick={onClick} className={`app-button ${className}`}>
            {children}
        </button>
    )
}

export default Button;