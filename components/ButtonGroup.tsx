import React from "react"


interface ButtonGroupProps {
    children: React.ReactNode
}
const ButtonGroup: React.FC<ButtonGroupProps> = ({ children }) => {
    return (
        <div className="btn-group" role="group" aria-label="Basic example">
            {children}
        </div>
    )
}

export default ButtonGroup