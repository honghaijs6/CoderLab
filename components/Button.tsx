import { NextPage } from 'next';
import React from 'react';

interface ButtonProps {
    underlined?: boolean;
    onClick?: () => void;
    label?: string;
    bordered?: boolean;
    disabled?: boolean;
    dark?: boolean;
    children: React.ReactNode
}

const Button: NextPage<ButtonProps> = ({
    underlined,
    children,
    onClick,
    label,
    bordered,
    disabled = false,
    dark = false,
    ...rest
}) => {
    const className = '';

    const style = bordered
        ? {
            border: ' 3px solid #f3a712',
            backgroundColor: 'transparent',
            color: '#261709',
            padding: '0.875rem 2rem',
        }
        : {
            backgroundColor: dark ? '#261709' : '',
        };

    return (
        <button
            style={style}
            className={`button ${className}`}
            disabled={disabled}
            onClick={onClick}
            {...rest}
        >
            {children || label}
        </button>
    );
};

export default Button;
