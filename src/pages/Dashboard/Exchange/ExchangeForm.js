import React, { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import toast from 'react-hot-toast';
import { FormInput } from '../../../utils/FormInput';
import { http } from '../../../utils/utils';
import IBAN from 'iban';
import { CURRENCIES } from '../../../partials/currencies/currencies';

export default function ExchangeForm(props) {
    const { type } = props;
    const form = useForm();
    const { formState, handleSubmit, errors, control, setValue, getValues, watch } = form;
    const [sent, setSent] = useState(false);
    const currency = !getValues('amountType')
        ? {}
        : CURRENCIES.filter(currency => currency.symbol === getValues('amountType'))[0];
    const address = type === 'deposit' ? 'source' : 'destination';
    const addressName = currency.isCrypto ? 'wallet' : 'IBAN';
    
    watch('amountType');

    const onSubmit = async (formData) => {
        try {
            await http({
                method: 'POST',
                url: type === 'deposit' ? '/deposit' : '/withdrawal',
                form: {
                    amountType: formData.amountType,
                    amount: formData.amount,
                    [address]: formData[address],
                }
            });
            setSent(true);
        } catch (e) {
            console.error(e);
            toast.error(e?.reason?.error || `${e}`);
        }
    };

    useEffect(() => {
        setValue('amountType', CURRENCIES[0].symbol);
    }, [setValue]);

    if (sent) {
        return (
            <div className="py-5 text-center">
                <svg  width="3em" viewBox="0 0 24 24" className="inline-block">
                    <path d="M21.29 5.89l-10 10a.996.996 0 0 1-1.41 0l-2.83-2.83a.996.996 0 1 1 1.41-1.41l2.12 2.12l9.29-9.29a.996.996 0 0 1 1.41 0c.4.39.4 1.02.01 1.41zm-5.52-3.15c-1.69-.69-3.61-.93-5.61-.57c-4.07.73-7.32 4.01-8.01 8.08a10.009 10.009 0 0 0 11.19 11.66c3.96-.51 7.28-3.46 8.32-7.31c.4-1.47.44-2.89.21-4.22c-.13-.8-1.12-1.11-1.7-.54c-.23.23-.33.57-.27.89c.22 1.33.12 2.75-.52 4.26c-1.16 2.71-3.68 4.7-6.61 4.97c-5.1.47-9.33-3.85-8.7-8.98c.43-3.54 3.28-6.42 6.81-6.91c1.73-.24 3.37.09 4.77.81a1.003 1.003 0 0 0 .93-1.78c-.27-.12-.54-.25-.81-.36z" className="fill-current text-green-600" />
                </svg>
                <div className="mt-3">
                    <div className="text-lg">
                        Request registered successfully
                    </div>
                    <a
                        href="#0"
                        className="text-lightblue-200"
                        onClick={e => {
                            e.preventDefault();
                            setSent(false);
                        }}
                    >
                        New operation
                    </a>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 400 }}>
            <fieldset disabled={formState.isSubmitting}>
                <div className="mb-4">
                    <div className="block text-gray-500 text-sm font-medium mb-3">
                        Currency &nbsp;<span className="text-red-600">*</span>
                    </div>
                    <div>
                        <Controller
                            name="amountType"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: { value: true, message: 'You must select a currency' },
                            }}
                            render={(field) => CURRENCIES.map(({ image, name, symbol }, key) => (
                                <label key={key} className={`flex flex-row border first:rounded-t last:rounded-b py-2 px-4 hover:bg-gray-100 cursor-pointer relative -m-px ${field?.value === symbol && 'border-lightblue-200 bg-gray-100 z-10'}`}>
                                    {image()}
                                    <div className="leading-5">
                                        <b className="text-gray-800">{symbol}</b>
                                        <div className="text-sm text-gray-600">{name}</div>
                                        <input type="radio" className="opacity-0 absolute top-0 left-0" {...field} value={symbol} />
                                    </div>
                                </label>
                            ))}
                        />
                    </div>
                    {errors?.amountType && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.amountType.message || 'Invalid input'}
                        </div>
                    )}
                </div>

                <div className="flex flex-row">
                    <FormInput
                        className="flex-grow"
                        label="Amount"
                        name="amount"
                        form={form}
                        errors={errors}
                        validation={{
                            required: { value: true, message: 'You must enter an amount' },
                        }}
                        render={({ name, className, ref, label }) => (
                            <input
                                ref={ref}
                                name={name}
                                type="number"
                                step={getValues('amountType') === 'EUR' ? '0.01' : '0.00000000000001'}
                                className={className}
                                placeholder={label}
                            />
                        )}
                    />
                    <FormInput
                        form={form}
                        label="&nbsp;"
                        className="ml-4"
                        render={({ className }) => (
                            <div className={`${className} border-none px-0 bg-none text-gray-500`}>
                                {currency.symbol}
                            </div>
                        )}
                    />
                </div>

                <FormInput
                    label={type === 'deposit'
                        ? `Please enter the ${addressName} address from which you are sending the amount`
                        : `Please enter the ${addressName} address you want to receive the amount to`
                    }
                    name={address}
                    form={form}
                    errors={errors}
                    validation={{
                        required: { value: true },
                        validate: value =>currency.isCrypto ? undefined : IBAN.isValid(value),
                    }}
                    render={({ name, className, ref }) => (
                        <input ref={ref} name={name} className={className} placeholder={addressName} />
                    )}
                />
                <button type="submit" className="btn text-white bg-lightblue-100 hover:bg-lightblue-200 px-6 w-full">
                    Confirm
                </button>
            </fieldset>
        </form>
    );
}