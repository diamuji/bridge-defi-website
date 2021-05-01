import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router';
import Loading from '../../partials/Loading';
import LoggedPage from '../../partials/LoggedPage';
import { FormInput } from '../../utils/FormInput';
import { http } from '../../utils/utils';

export default function Pool() {
    const { id } = useParams();
    const form = useForm({ defaultValues: { active: true } });
    const { formState, handleSubmit, errors, getValues, reset } = form;
    const [numDetails, setNumDetails] = useState(1);
    const history = useHistory();
    const [ready, setReady] = useState(false);

    const back = (e) => {
        if (e) e.preventDefault();
        history.push('/pools');
    };
    const onSubmit = async (formData) => {
        try {
            await http({
                method: id ? 'PUT' : 'POST',
                url: id ? `/pool/${id}` : '/pool',
                form: {
                    name: formData.name,
                    apyYearly: formData.apyYearly,
                    apyMonthly: formData.apyMonthly,
                    active: formData.active,
                    balanceAvailable: formData.balanceAvailable,
                    description: {
                        protocolDescription: formData.protocolDescription,
                        features: formData.features.split('\n'),
                        sourceOfProfit: formData.sourceOfProfit.split('\n'),
                        details: Object.keys(formData).filter(key => key.indexOf('detail_title') === 0).map(name => {
                            const index = name.replace('detail_title', '');
                            return {
                                title: formData[`detail_title${index}`],
                                data: formData[`detail_data${index}`],
                            };
                        })
                    }
                }
            });
            toast.success(id ? 'Pool updated successfully' : 'Pool created successfully');
            back();
        } catch (e) {
            console.error(e);
            toast.error(e?.reason?.error || `${e}`);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const { pool } = await http({ url: `/pool/${id}` });
            setNumDetails(pool.description?.details?.length || 1);
            const formData = {
                name: pool.name,
                apyYearly: pool.apyYearly,
                apyMonthly: pool.apyMonthly,
                active: pool.active,
                balanceAvailable: pool.balanceAvailable,
                protocolDescription: pool.description?.protocolDescription,
                features: pool.description?.features.join('\n'),
                sourceOfProfit: pool.description?.sourceOfProfit.join('\n'),
            };
            (pool.description?.details || []).forEach((details, index) => {
                formData[`detail_title${index}`] = details.title;
                formData[`detail_data${index}`] = details.data;
            });
            reset(formData);
            setReady(true);
        };
        if (!id) setReady(true);
        else fetchData();
    }, [id, reset]);

    return (
        <LoggedPage>
            <Loading if={!ready}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset disabled={formState.isSubmitting}>
                        <div className="flex flex-row items-start mb-5">
                            <a onClick={back} className="block cursor-pointer mr-3 mt-2" href="#0">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24" fill="#000000">
                                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                                </svg>
                            </a>
                            <div className="mb-4 sm:mb-0">
                                <h1 className="text-2xl text-gray-800 font-bold">
                                    {id ? 'Create pool' : 'Pool'}
                                </h1>
                            </div>
                        </div>

                        <div className="grid grid-flow-row xs:grid-flow-col sm:grid-cols-2 md:grid-cols-4 gap-4">
                            <FormInput
                                className="flex-grow"
                                label="Name"
                                name="name"
                                form={form}
                                errors={errors}
                                validation={{
                                    required: { value: true, message: 'You must enter a name' },
                                }}
                                render={({ name, className, ref, label }) => (
                                    <input ref={ref} name={name} className={className} placeholder={label} />
                                )}
                            />
                            <FormInput
                                className="flex-grow"
                                label="Yearly APY"
                                name="apyYearly"
                                form={form}
                                errors={errors}
                                validation={{
                                    required: { value: true, message: 'You must enter an amount' },
                                }}
                                render={({ name, className, ref, label }) => (
                                    <input ref={ref} name={name} type="number" step="0.01" className={className} placeholder={label} />
                                )}
                            />
                            <FormInput
                                className="flex-grow"
                                label="Monthly APY"
                                name="apyMonthly"
                                form={form}
                                errors={errors}
                                validation={{
                                    required: { value: true, message: 'You must enter an amount' },
                                }}
                                render={({ name, className, ref, label }) => (
                                    <input ref={ref} name={name} type="number" step="0.01" className={className} placeholder={label} />
                                )}
                            />
                            <FormInput
                                label="Available balance"
                                name="balanceAvailable"
                                form={form}
                                errors={errors}
                                render={({ name, className, ref, label }) => (
                                    <input ref={ref} name={name} type="number" step="0.01" className={className} placeholder={label} />
                                )}
                            />
                        </div>
                    
                        <div className="flex flex-col md:flex-row md:-mx-2 mb-4">
                            <div className="md:w-2/4 md:mx-2">
                                <label className="text-xs text-gray-500 uppercase tracking-wider block mb-2 flex flex-row items-end mt-1 py-2">
                                    Features
                                </label>
                                <FormInput
                                    label="Protocol description"
                                    name="protocolDescription"
                                    form={form}
                                    errors={errors}
                                    validation={{
                                        required: { value: true, message: 'You must enter a value' },
                                    }}
                                    render={({ name, className, ref, label }) => (
                                        <input ref={ref} name={name} className={className} placeholder={label} />
                                    )}
                                />
                                <FormInput
                                    label="Features"
                                    name="features"
                                    form={form}
                                    errors={errors}
                                    validation={{
                                        required: { value: true, message: 'You must enter a value' },
                                    }}
                                    render={({ name, className, ref }) => (
                                        <textarea ref={ref} name={name} className={className} placeholder="Features (1 per line)" />
                                    )}
                                />
                                <FormInput
                                    label="Sources of profit"
                                    name="sourceOfProfit"
                                    form={form}
                                    errors={errors}
                                    validation={{
                                        required: { value: true, message: 'You must enter a value' },
                                    }}
                                    render={({ name, className, ref }) => (
                                        <textarea ref={ref} name={name} className={className} placeholder="Sources of profit (1 per line)" />
                                    )}
                                />
                                <FormInput
                                    label="Active"
                                    name="active"
                                    form={form}
                                    errors={errors}
                                    render={({ name, ref }) => (
                                        <label className="flex items-center">
                                            <input ref={ref} name={name} className="form-checkbox" type="checkbox" />
                                            <span className="ml-3">
                                                Active
                                            </span>
                                        </label>
                                    )}
                                />
                            </div>
                            
                            <div className="md:w-2/4 md:mx-2">
                                <label className="text-xs text-gray-500 uppercase tracking-wider block mb-2 flex flex-row items-end">
                                    <span className="flex-grow">Details</span>
                                    <button
                                        type="button"
                                        className="float-right btn btn-sm bg-teal-500 px-3 py-1 text-white"
                                        onClick={() => setNumDetails(numDetails + 1)}
                                    >
                                        add
                                    </button>
                                </label>
                                {numDetails > 0 && Array.from({ length: numDetails }).map((v, index) => (
                                    <div key={index} className="mb-4 border rounded px-4 py-2">
                                        <div className="flex flex-col md:flex-row md:-mx-2">
                                            <FormInput
                                                className="md:w-2/4 md:mx-2"
                                                label="Title"
                                                name={`detail_title${index}`}
                                                form={form}
                                                errors={errors}
                                                validation={{
                                                    validate: title => !getValues(`data${index}`) || title || 'You must enter a value'
                                                }}
                                                render={({ name, className, ref, label }) => (
                                                    <input ref={ref} name={name} className={className} placeholder={label} />
                                                )}
                                            />
                                            <FormInput
                                                className="md:w-2/4 md:mx-2"
                                                label="Description"
                                                name={`detail_data${index}`}
                                                form={form}
                                                errors={errors}
                                                validation={{
                                                    validate: data => !getValues(`title${index}`) || data || 'You must enter a value'
                                                }}
                                                render={({ name, className, ref, label }) => (
                                                    <input ref={ref} name={name} className={className} placeholder={label} />
                                                )}
                                            />
                                        </div>
                                    </div>
                                ))}
                                {numDetails > 1 && (
                                    <div className="text-xs text-right">
                                        <button
                                            type="button"
                                            className="btn btn-sm bg-red-500 px-3 py-1 text-white"
                                            onClick={() => setNumDetails(numDetails - 1)}
                                        >
                                            delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-6">
                            <button type="submit" className="btn text-white bg-teal-500 hover:bg-teal-600 px-20">
                                Continue
                            </button>
                        </div>
                    </fieldset>
                </form>
            </Loading>
        </LoggedPage>
    );
}