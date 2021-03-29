import React from 'react';
import { useForm } from 'react-hook-form';
import { FormInput } from '../../utils/FormInput';

export function Step2({ onSubmit }) {
    const form = useForm();
    const { handleSubmit, errors } = form;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h2">
                    Complete your account
                </h1>
            </div>
            
            <FormInput
                label="Phone"
                name="phone"
                form={form}
                errors={errors}
                validation={{
                    required: { value: true, message: 'You must enter your phone' },
                }}
                render={({ name, className, ref, label }) => (
                    <input ref={ref} name={name} className={className} placeholder={label} autoFocus />
                )}
            />

            <div className="flex flex-wrap mt-6">
                <button type="submit" className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">
                    Continue
                </button>
            </div>
        </form>
    );
}