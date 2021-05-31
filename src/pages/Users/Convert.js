import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useHistory, useParams, withRouter } from 'react-router';
import { CURRENCIES } from '../../partials/currencies/currencies';
import LoggedPage from '../../partials/LoggedPage';
import { FormInput } from '../../utils/FormInput';
import { http } from '../../utils/utils';

export function Convert() {
    const { id } = useParams();
    const firstCurrency = CURRENCIES[0] || {};
    const form = useForm({ defaultValues: {
        amountType: firstCurrency.symbol,
    } });
    const { formState, handleSubmit, errors, control, getValues, watch } = form;
    const history = useHistory();

    watch(['from_amountType', 'to_amountType']);

    const onSubmit = async (formData) => {
        try {
            await http({
                method: 'POST',
                url: `/portfolio/convert/${id}`,
                form: {
                    from: {
                        amount: formData.from_amount,
                        amountType: formData.from_amountType,
                    },
                    to: {
                        amount: formData.to_amount,
                        amountType: formData.to_amountType,
                    },
                }
            });
            toast.success('Conversion completed successfully');
            history.push(`/users/${id}`);
        } catch (e) {
            console.error(e);
            toast.error(e?.reason?.error || `${e}`);
        }
    };
    const back = e => {
        e.preventDefault();
        history.goBack();
    };

    return (
        <LoggedPage title={(
            <>
                <a onClick={back} className="block cursor-pointer mr-3" href="#0">
                    <svg height="24" width="24" viewBox="0 0 24 24" fill="currentcolor">
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                    </svg>
                </a>
                Convert
            </>
        )}>

            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset disabled={formState.isSubmitting}>
                    <div className="grid grid-cols-2 gap-8 mb-8">
                        <div>
                            <FormInput
                                label="Amount"
                                name="from_amount"
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
                                        step={getValues('from_amountType') === 'EUR' ? '0.01' : '0.00000000000001'}
                                        className={className}
                                        placeholder={label}
                                        autoFocus
                                    />
                                )}
                            />

                            <div className="mb-4">
                                <div className="block text-gray-500 text-sm font-medium mb-3">
                                    Currency &nbsp;<span className="text-red-600">*</span>
                                </div>
                                <div>
                                    <Controller
                                        name="from_amountType"
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: { value: true, message: 'You must select a currency' },
                                        }}
                                        render={(field) => CURRENCIES.map(({ image, name, symbol }, key) => {
                                            const disabled = !!getValues('to_amountType') && getValues('to_amountType') === symbol;
                                            return (
                                                <label
                                                    key={key}
                                                    className={`
                                                        bg-white
                                                        flex flex-row border first:rounded-t last:rounded-b py-2 px-4 relative -m-px
                                                        ${field?.value === symbol && 'border-lightblue-100 bg-gray-100 z-10'}
                                                        ${disabled ? 'opacity-50' : 'hover:bg-gray-100 cursor-pointer'}
                                                    `}
                                                >
                                                    {image()}
                                                    <div className="leading-5">
                                                        <b className="text-gray-800">{symbol}</b>
                                                        <div className="text-sm text-gray-600">{name}</div>
                                                        <input
                                                            type="radio"
                                                            className="opacity-0 absolute top-0 left-0"
                                                            {...field}
                                                            value={symbol}
                                                            disabled={disabled}
                                                        />
                                                    </div>
                                                </label>
                                            );
                                        })}
                                    />
                                </div>
                                {errors?.amountType && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.amountType.message || 'Invalid input'}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <FormInput
                                label="Amount"
                                name="to_amount"
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
                                        step={getValues('to_amountType') === 'EUR' ? '0.01' : '0.00000000000001'}
                                        className={className}
                                        placeholder={label}
                                    />
                                )}
                            />

                            <div className="mb-4">
                                <div className="block text-gray-500 text-sm font-medium mb-3">
                                    Currency &nbsp;<span className="text-red-600">*</span>
                                </div>
                                <div>
                                    <Controller
                                        name="to_amountType"
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: { value: true, message: 'You must select a currency' },
                                        }}
                                        render={(field) => CURRENCIES.map(({ image, name, symbol }, key) => {
                                            const disabled = !!getValues('from_amountType') && getValues('from_amountType') === symbol;
                                            return (
                                                <label
                                                    key={key}
                                                    className={`
                                                    bg-white
                                                        flex flex-row border first:rounded-t last:rounded-b py-2 px-4 relative -m-px
                                                        ${field?.value === symbol && 'border-lightblue-100 bg-gray-100 z-10'}
                                                        ${disabled ? 'opacity-50' : 'hover:bg-gray-100 cursor-pointer'}
                                                    `}
                                                >
                                                    {image()}
                                                    <div className="leading-5">
                                                        <b className="text-gray-800">{symbol}</b>
                                                        <div className="text-sm text-gray-600">{name}</div>
                                                        <input
                                                            type="radio"
                                                            className="opacity-0 absolute top-0 left-0"
                                                            {...field}
                                                            value={symbol}
                                                            disabled={disabled}
                                                        />
                                                    </div>
                                                </label>
                                            );
                                        })}
                                    />
                                </div>
                                {errors?.amountType && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.amountType.message || 'Invalid input'}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn text-white bg-lightblue-100 hover:bg-lightblue-200 text-center mx-6 px-10">
                            Confirm
                        </button>
                        <a href="#0" onClick={back} className="px-10">
                            Cancel
                        </a>
                    </div>
                </fieldset>
            </form>
        </LoggedPage>
    );
}

export default withRouter(Convert);