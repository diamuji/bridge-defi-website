import React from 'react';
import { useForm } from 'react-hook-form';
import { FormInput } from '../../utils/FormInput';

export function Step1({ formData, onSubmit }) {
    const form = useForm({ defaultValues: formData });
    const { formState, handleSubmit, errors } = form;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset disabled={formState.isSubmitting}>
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                    <h1 className="h2">
                        Welcome to Bridge Defi
                    </h1>
                </div>
                
                <FormInput
                    label="First name"
                    name="firstName"
                    form={form}
                    errors={errors}
                    validation={{
                        required: { value: true, message: 'You must enter your name' }
                    }}
                    render={({ name, className, ref, label }) => (
                        <input ref={ref} name={name} className={className} placeholder={label} autoFocus />
                    )}
                />
                <FormInput
                    label="Last name"
                    name="lastName"
                    form={form}
                    errors={errors}
                    validation={{
                        required: { value: true, message: 'You must enter your last name' }
                    }}
                    render={({ name, className, ref, label }) => (
                        <input ref={ref} name={name} className={className} placeholder={label} />
                    )}
                />
                
                <div className="flex flex-wrap mt-6">
                    <button type="submit" className="btn text-white bg-teal-500 hover:bg-teal-600 w-full">
                        Start
                    </button>
                </div>
            </fieldset>
        </form>
    );
}