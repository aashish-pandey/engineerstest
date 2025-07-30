import React from 'react';

const InputField = ({label, type = 'text', value, onChange, placeholder = ' ', required = false}) => {
    return (
        <div className='form-group'>
            {label && <label>{label}</label>}
            <input
                type = {type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className="app-input"
            />
        </div>
    );
};

export default InputField;