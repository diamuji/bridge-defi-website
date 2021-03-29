import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FormInput } from '../../utils/FormInput';

export function Step3({ onSubmit }) {
    const form = useForm();
    const { handleSubmit, errors, getValues } = form;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h2">
                    Register now
                </h1>
            </div>
            
            <FormInput
                label="Password"
                name="password"
                form={form}
                errors={errors}
                validation={{
                    required: { value: true, message: 'You must enter a password' },
                    minLength: { value: 6, message: 'Password must be at least 6 characters' }
                }}
                render={({ name, className, ref, label }) => (
                    <input
                        ref={ref}
                        name={name}
                        className={className}
                        placeholder={label}
                        type="password"
                        autoFocus
                    />
                )}
            />
            <FormInput
                label="Ripeti password"
                name="repeatPassword"
                form={form}
                errors={errors}
                validation={{
                    required: { value: true, message: 'You must enter a password' },
                    validate: value => value === getValues('password') || 'Passwords do not match'
                }}
                render={({ name, className, ref, label }) => (
                    <input
                        ref={ref}
                        name={name}
                        className={className}
                        placeholder={label}
                        type="password"
                    />
                )}
            />

            <div className="text-sm text-gray-500">
                I agree to receive updates from Bridge DeFi, as stated in the&nbsp;
                <Link
                    to="/bridgedefi-privacy.pdf"
                    target="_blank"
                    className="text-gray-400 hover:text-gray-200 transition duration-150 ease-in-out"
                >
                    Privacy Policy
                </Link>.
            </div>

            <div className="flex flex-wrap mt-6">
                <button type="submit" className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">
                    Continue
                </button>
            </div>
        </form>
    );
}