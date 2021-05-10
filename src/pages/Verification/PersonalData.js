import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FormInput } from '../../utils/FormInput';
import { UserContext } from '../../utils/UserProvider';
import { http } from '../../utils/utils';

export default function PersonalData() {
    const userContext = useContext(UserContext);
    const personalInfo = userContext.me?.verification?.personalInfo || {};
    const form = useForm({
        defaultValues: {
            ...personalInfo,
            birthDate: personalInfo?.birthday
                ? [
                    new Date(personalInfo.birthday).getDate(),
                    new Date(personalInfo.birthday).getMonth() + 1,
                    new Date(personalInfo.birthday).getFullYear(),
                ].join('/')
                : null,
        }
    });
    const { formState, handleSubmit, errors } = form;

    const onSubmit = async (personalInfo) => {
        try {
            // transform
            personalInfo.birthday = new Date(personalInfo.birthDate.split('/').reverse());
            // send data
            const me = await http({
                method: 'POST',
                url: '/verification/personal-info',
                form: {
                    personalInfo
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
                    <h2 className="h4 mb-4">Personal data</h2>
                </div>

                <div className="flex flex-wrap -m-2">
                    <FormInput
                        className="w-full md:w-1/2 p-2"
                        label="Birth date"
                        name="birthDate"
                        form={form}
                        errors={errors}
                        validation={{
                            required: { value: true, message: 'You must enter your birth date' },
                            validate: value => isNaN(new Date(value.split('/').reverse())) ? 'Invalid date' : true,
                        }}
                        render={({ name, className, ref }) => (
                            <input ref={ref} name={name} className={className} placeholder="dd/mm/yyyy" autoFocus />
                        )}
                    />
                    <FormInput
                        className="w-full md:w-1/2 p-2"
                        label="Gender"
                        name="gender"
                        form={form}
                        errors={errors}
                        validation={{
                            required: { value: true, message: 'You must select your gender' }
                        }}
                        render={({ name, className, ref }) => (
                            <select ref={ref} name={name} className={className}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        )}
                    />
                    <FormInput
                        className="w-full md:w-1/2 p-2"
                        label="Purpose of use"
                        name="purposeOfUse"
                        form={form}
                        errors={errors}
                        validation={{
                            required: { value: true, message: 'You must select a purpose of use' }
                        }}
                        render={({ name, className, ref }) => (
                            <select ref={ref} name={name} className={className}>
                                <option value="investment">Investment</option>
                                <option value="other">Other</option>
                            </select>
                        )}
                    />
                    <FormInput
                        className="w-full md:w-1/2 p-2"
                        label="Birth place"
                        name="townOfBirth"
                        form={form}
                        errors={errors}
                        validation={{
                            required: { value: true, message: 'You must enter your birth place' }
                        }}
                        render={({ name, className, ref, label }) => (
                            <input ref={ref} name={name} className={className} placeholder={label} />
                        )}
                    />
                </div>

                <div className="flex flex-wrap mt-6">
                    <button type="submit" className="btn text-white bg-lightblue-100 hover:bg-lightblue-200 px-6">
                        Continue
                    </button>
                </div>
            </fieldset>
        </form>
    );
}