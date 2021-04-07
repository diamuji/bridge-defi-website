import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FormInput } from '../../utils/FormInput';
import { UserContext } from '../../utils/UserProvider';
import { http } from '../../utils/utils';
import countries from '../../refdata/countries.json';

export default function ResidenceAddress() {
    const userContext = useContext(UserContext);
    const residenceAddress = userContext.me?.verification?.residenceAddress || {};
    const form = useForm({
        defaultValues: residenceAddress,
    });
    const { formState, handleSubmit, errors, setValue } = form;

    useEffect(() => {
        const setDefaultCountry = async () => {
            const res = await http({ url: 'http://ip-api.com/json' });
            const name = countries.filter(country => country.code === res.countryCode)[0]?.name;
            setValue('country', name);
        };
        setDefaultCountry();
    }, [setValue]);

    const onSubmit = async (residenceAddress) => {
        try {
            await http({
                method: 'POST',
                url: '/verification/residence-address',
                form: {
                    residenceAddress
                }
            });
            toast.success('Information updated successfully');
        } catch (e) {
            console.error(e);
            toast.error(e?.reason || `${e}`);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset disabled={formState.isSubmitting}>
                <div className="mb-8">
                    <h2 className="h4 mb-4">Residence address</h2>
                </div>

                <div className="flex flex-wrap -m-2">
                    <FormInput
                        className="w-1/2 p-2"
                        label="Street"
                        name="street"
                        form={form}
                        errors={errors}
                        validation={{
                            required: { value: true, message: 'You must enter a street' },
                        }}
                        render={({ name, className, ref, label }) => (
                            <input ref={ref} name={name} className={className} placeholder={label} autoFocus />
                        )}
                    />
                    <FormInput
                        className="w-1/2 p-2"
                        label="House number"
                        name="houseNumber"
                        form={form}
                        errors={errors}
                        validation={{
                            required: { value: true, message: 'You must enter a house number' },
                        }}
                        render={({ name, className, ref, label }) => (
                            <input ref={ref} name={name} className={className} placeholder={label} />
                        )}
                    />
                    <FormInput
                        className="w-1/2 p-2"
                        label="Postal code"
                        name="postcode"
                        form={form}
                        errors={errors}
                        validation={{
                            required: { value: true, message: 'You must enter a postal code' },
                        }}
                        render={({ name, className, ref, label }) => (
                            <input ref={ref} name={name} className={className} placeholder={label} />
                        )}
                    />
                    <FormInput
                        className="w-1/2 p-2"
                        label="Country"
                        name="country"
                        form={form}
                        errors={errors}
                        validation={{
                            required: { value: true, message: 'You must select a country' },
                        }}
                        render={({ name, className, ref, label }) => (
                            <select ref={ref} name={name} className={className} placeholder={label}>
                                {countries.map(country => (
                                    <option key={country.code} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                </div>

                <div className="flex flex-wrap mt-6">
                    <button type="submit" className="btn text-white bg-purple-600 hover:bg-purple-700 px-6">
                        Continue
                    </button>
                </div>
            </fieldset>
        </form>
    );
}