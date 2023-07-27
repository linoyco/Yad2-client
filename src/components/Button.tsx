import React from 'react';

interface ButtonProps {
    text: string;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ onClick, text }) => {

    return (
        <button
            style={{
                padding: '10px 20px',
                borderRadius: '5px',
                fontSize: '1.2rem',
                backgroundColor: '#CD95DE',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
            }}
            onClick={onClick}>{text}</button>
    )
}

export default Button;