import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FormInput } from '../../utils/FormInput';
import { UserContext } from '../../utils/UserProvider';
import { http } from '../../utils/utils';
import countries from '../../refdata/countries.json';

export default function SettlementAddress() {
    const userContext = useContext(UserContext);
    const settlementAddress = userContext.me?.verification?.settlementAddress;
    const form = useForm({ defaultValues: settlementAddress });
    const { formState, handleSubmit, errors, setValue } = form;
    
    userContext.getCountry();
    useEffect(() => {
        if (userContext.country && !settlementAddress) {
            setValue('country', userContext.country.name);
        }
    }, [setValue, settlementAddress, userContext.country]);

    const onSubmit = async (settlementAddress) => {
        try {
            const me = await http({
                method: 'POST',
                url: '/verification/settlement-address',
                form: {
                    settlementAddress
                }
            });
            userContext.update(me);
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
                    <h2 className="h4 mb-4">Settlement address</h2>
                </div>

                <div className="flex flex-wrap -m-2">
                    <FormInput
                        className="w-full md:w-1/2 p-2"
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
                        className="w-full md:w-1/2 p-2"
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
                        className="w-full md:w-1/2 p-2"
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
                        className="w-full md:w-1/2 p-2"
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
                    <button type="submit" className="btn text-white bg-teal-500 hover:bg-teal-600 px-6">
                        Continue
                    </button>
                </div>
            </fieldset>
        </form>
    );
}