import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormInput } from '../../utils/FormInput';
import countries from '../../refdata/countries.json';
import { http } from '../../utils/utils';

export function Step2({ formData, onSubmit }) {
    const form = useForm({ defaultValues: formData });
    const { formState, handleSubmit, errors, setValue } = form;

    useEffect(() => {
        const setDefaultCountry = async () => {
            const res = await http({
                text: true,
                url: 'https://www.cloudflare.com/cdn-cgi/trace',
            });
            const countryCode = res.split('\n').map(line => line.split('=')).filter(item => item[0] === 'loc')[0][1];
            const isoCode = countries.filter(country => country.code === countryCode)[0]?.isoCode;
            setValue('country', isoCode);
        };
        setDefaultCountry();
    }, [setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset disabled={formState.isSubmitting}>
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                    <h1 className="h2">
                        Complete your account
                    </h1>
                </div>

                <FormInput
                    label="Country"
                    name="country"
                    form={form}
                    errors={errors}
                    validation={{
                        required: { value: true, message: 'You must select a country' },
                    }}
                    render={({ name, className, ref, label }) => (
                        <select
                            ref={ref}
                            name={name}
                            className={className}
                            placeholder={label}
                            autoFocus
                        >
                            {countries.map(country => (
                                <option key={country.code} value={country.isoCode}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    )}
                />
                <FormInput
                    label="Phone"
                    name="phone"
                    form={form}
                    errors={errors}
                    validation={{
                        required: { value: true, message: 'You must enter your phone' },
                        pattern: /^[0-9]{5,}$/
                    }}
                    render={({ name, className, ref, label }) => (
                        <input ref={ref} name={name} className={className} placeholder={label} />
                    )}
                />

                <div className="flex flex-wrap mt-6">
                    <button type="submit" className="btn text-white bg-lightblue-100 hover:bg-lightblue-200 w-full">
                        Continue
                    </button>
                </div>
            </fieldset>
        </form>
    );
}