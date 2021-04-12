import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { FormInput } from '../../utils/FormInput';
import { EMAIL_REGEX, http } from '../../utils/utils';

export function Step3({ formData, onSubmit: onDone }) {
    const form = useForm({ defaultValues: formData });
    const { formState, handleSubmit, errors, getValues } = form;

    const onSubmit = async (data) => {
        try {
            const fullData = { ...formData, ...data };
            await http({
                method: 'POST',
                url: '/users',
                form: fullData
            });
            onDone(data);
        } catch (e) {
            console.error(e);
            toast.error(e?.reason || `${e}`);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset disabled={formState.isSubmitting}>
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                    <h1 className="h2">
                        Register now
                    </h1>
                </div>

                <FormInput
                    label="E-mail"
                    name="email"
                    form={form}
                    errors={errors}
                    validation={{
                        required: true,
                        pattern: EMAIL_REGEX
                    }}
                    render={({ name, className, ref, label }) => (
                        <input
                            ref={ref}
                            name={name}
                            className={className}
                            placeholder={label}
                            type="email"
                            autoFocus
                        />
                    )}
                />
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

                <FormInput
                    name="newsletter"
                    form={form}
                    errors={errors}
                    render={({ name, ref }) => (
                        <label className="flex items-center">
                            <input ref={ref} name={name} className="form-checkbox" type="checkbox" />
                            <span className="ml-3">
                                Subscribe to the newsletter
                            </span>
                        </label>
                    )}
                />
                <FormInput
                    name="ageCheck"
                    form={form}
                    errors={errors}
                    validation={{
                        required: { value: true, message: 'You must accept terms and conditions' }
                    }}
                    render={({ name, ref }) => (
                        <label className="flex items-center">
                            <input ref={ref} name={name} className="form-checkbox" type="checkbox" />
                            <span className="ml-3">
                                I declare that I am at least 18 years old
                            </span>
                        </label>
                    )}
                />
                <FormInput
                    name="termsAndConditions"
                    form={form}
                    errors={errors}
                    validation={{
                        required: { value: true, message: 'You must accept terms and conditions' }
                    }}
                    render={({ name, ref }) => (
                        <label className="flex items-center">
                            <input ref={ref} name={name} className="form-checkbox" type="checkbox" />
                            <span className="ml-3">
                                I accept the&nbsp;
                                <Link
                                    to="/terms-and-conditions.pdf"
                                    target="_blank"
                                    className="text-gray-400 hover:text-gray-200 transition duration-150 ease-in-out"
                                >
                                    Terms and Conditions
                                </Link>
                            </span>
                        </label>
                    )}
                />

                <div className="flex flex-wrap mt-6">
                    <button type="submit" className="btn text-white bg-teal-500 hover:bg-teal-600 w-full">
                        Continue
                    </button>
                </div>
            </fieldset>
        </form>
    );
}