import React from 'react';

export function FormInput({ label, name, form, validation, errors, render, className }) {
    const { register } = form;
    const ref = register(validation);
    
    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label className="block text-gray-500 text-sm font-medium mb-1" htmlFor={name}>
                    {label}
                    {validation?.required && (
                        <>
                            &nbsp;<span className="text-red-600">*</span>
                        </>
                    )}
                </label>
            )}

            {render({
                ref,
                name,
                label,
                className: 'form-input w-full'
            })}

            {errors && errors[name] && (
                <div className="text-red-500 text-sm mt-1">
                    {errors[name].message || 'Invalid input'}
                </div>
            )}
        </div>
    );
}