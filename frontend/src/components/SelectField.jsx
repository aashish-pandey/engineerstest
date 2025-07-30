import React from 'react'

const SelectField = ({value, onChange, options = []}) => {
    return (
        <select value={value} onChange={onChange} className='app-select'>
            {options.map((opt, idx) => (
                <option key ={idx} value={opt.value}>{opt.label}</option>
            ))}
        </select>
    );
};

export default SelectField;