import React from 'react';
import './FormInput.scss'

const FormInput = ({ handleChange, label, ...otherProps }) => {
    return (
        <div className="formRowInput">
            {label && (
                <label>{label}</label>
            )}
            <input
                className="formInput"
                onChange={handleChange}
                {...otherProps}
            />
        </div>
    )
}

export default FormInput
