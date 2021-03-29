import React from 'react';

export function FormInput({ label, name, form, validation, errors, render }) {
    const { register } = form;
    const ref = register(validation);
    
    return (
        <div className="flex flex-wrap mb-4">
            {label && (
                <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="first-name">
                    {label}
                    {validation.required && (
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
                className: 'form-input w-full text-gray-300'
            })}

            {errors && errors[name] && (
                <div className="text-red-500 text-sm mt-1">
                    {errors[name].message || 'Invalid input'}
                </div>
            )}
        </div>
    );
}