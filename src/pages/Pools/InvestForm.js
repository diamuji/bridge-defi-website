import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { CURRENCIES } from '../../partials/currencies/currencies';
import { FormInput } from '../../utils/FormInput';
import { http } from '../../utils/utils';

const ALLOWED_CURRENCIES = ['USDC'];

export default function InvestForm(props) {
    const { pool, close } = props;
    const firstCurrency = CURRENCIES.filter(currency => ALLOWED_CURRENCIES.indexOf(currency.symbol) >= 0)[0] || {};
    const form = useForm({ defaultValues: {
        amountType: firstCurrency.symbol,
    } });
    const { formState, handleSubmit, errors, control } = form;

    const onSubmit = async (formData) => {
        try {
            const res = await http({
                method: 'POST',
                url: `/investment/${pool._id}`,
                form: formData
            });
            console.log(res);
            toast.success('Investment addedd successfully');
            close();
        } catch (e) {
            console.error(e);
            toast.error(e?.reason?.error || `${e}`);
        }
    };
    const cancel = e => {
        e.preventDefault();
        close();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset disabled={formState.isSubmitting}>
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
                        <input ref={ref} name={name} type="number" step="0.01" className={className} placeholder={label} autoFocus />
                    )}
                />

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
                                <label
                                    key={key}
                                    className={`
                                        flex flex-row border first:rounded-t last:rounded-b py-2 px-4 relative -m-px
                                        ${field?.value === symbol && 'border-teal-500 bg-gray-100 z-10'}
                                        ${ALLOWED_CURRENCIES.indexOf(symbol) < 0 ? 'opacity-50' : 'hover:bg-gray-100 cursor-pointer'}`}
                                >
                                    {image()}
                                    <div className="leading-5">
                                        <b>{symbol}</b>
                                        <div className="text-sm text-gray-600">{name}</div>
                                        <input
                                            type="radio"
                                            className="opacity-0 absolute top-0 left-0"
                                            {...field}
                                            value={symbol}
                                            disabled={ALLOWED_CURRENCIES.indexOf(symbol) < 0}
                                        />
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
            
                <button type="submit" className="btn text-white bg-teal-500 hover:bg-teal-600 w-full text-center mb-2">
                    Confirm
                </button>
                <div className="text-center mb-4 text-gray-600 text-sm">
                    <a href="#0" onClick={cancel}>
                        Cancel
                    </a>
                </div>
            </fieldset>
        </form>
    );
}