import React from 'react';

export const renderField = ({
    input,
    placeholder,
    step,
    type,
    disabled,
    meta: { touched, error }
}) => {
    let className = 'input-field';

    if (disabled === true) {
        className = 'input-field--disabled';
    }

    return (
        <div className={className} >
            <input
                className='input'
                autoComplete={type === 'password' ? 'current-password' : 'off'}
                {...input}
                disabled={disabled}
                type={type}
                step={step}
            />
            <span className='input-label'>{placeholder}</span>
            {touched && error && <div className='error'>{error}</div>}
        </div>
    );
};
 