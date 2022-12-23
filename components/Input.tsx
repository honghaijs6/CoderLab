import React, { HTMLInputTypeAttribute } from "react"

interface InputProps {
    className?: string
    style?: React.CSSProperties
}

const Input: React.FC<InputProps> = ({ style = {}, className = '', ...rest }) => {

    return (
        <input style={style} className={`form-control ${className}`} {...rest} />
    )
}

export default Input