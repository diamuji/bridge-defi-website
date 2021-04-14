import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FormInput } from '../../utils/FormInput';
import { UserContext } from '../../utils/UserProvider';
import { http } from '../../utils/utils';

export default function PersonalData() {
    const userContext = useContext(UserContext);
    const document = userContext.me?.verification?.document || {};
    const form = useForm({ defaultValues: document });
    const { formState, handleSubmit, errors } = form;

    const onSubmit = async (document) => {
        try {
            let res2 = {}, res3 = {};
            const res1 = await http({
                method: 'POST',
                url: '/verification/document',
                form: {
                    document: {
                        documentType: document.documentType
                    }
                }
            });
            if (document.frontUpload.length > 0) {
                const frontFormData = new FormData();
                frontFormData.append('front', document.frontUpload[0]);
                res2 = await http({
                    method: 'POST',
                    url: '/verification/document/front',
                    form: frontFormData,
                });
            }
            if (document.retroUpload.length > 0) {
                const retroFormData = new FormData();
                retroFormData.append('retro', document.retroUpload[0]);
                res3 = await http({
                    method: 'POST',
                    url: '/verification/document/retro',
                    form: retroFormData,
                });
            }
            const me = { ...document, ...res1, ...res2, ...res3 };
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
                    <h2 className="h4 mb-4">Document</h2>
                </div>

                <div className="flex flex-wrap -m-2">
                    <FormInput
                        className="w-full md:w-1/2 p-2"
                        label="Document type"
                        name="documentType"
                        form={form}
                        errors={errors}
                        validation={{
                            required: { value: true, message: 'You must select a document type' }
                        }}
                        render={({ name, className, ref }) => (
                            <select ref={ref} name={name} className={className} autoFocus>
                                <option value="drivingLicense">Driving license</option>
                                <option value="passport">Passport</option>
                                <option value="identityCard">Identity card</option>
                            </select>
                        )}
                    />
                </div>

                <div className="flex flex-wrap -m-2">
                    <FormInput
                        className="w-full md:w-1/2 p-2"
                        label="Front"
                        name="frontUpload"
                        form={form}
                        errors={errors}
                        validation={{
                            required: { value: true, message: 'You must upload a document' }
                        }}
                        render={({ name, className, ref, label }) => (
                            <>
                                <input type="file" ref={ref} name={name} className={className} />
                                {document.front && (
                                    <img src={`data:image;base64,${document.front}`} className="mt-3 w-full" alt={label} />
                                )}
                            </>
                        )}
                    />
                    <FormInput
                        className="w-full md:w-1/2 p-2"
                        label="Back"
                        name="retroUpload"
                        form={form}
                        errors={errors}
                        validation={{
                            required: { value: true, message: 'You must upload a document' }
                        }}
                        render={({ name, className, ref, label }) => (
                            <>
                                <input type="file" ref={ref} name={name} className={className} />
                                {document.retro && (
                                    <img src={`data:image;base64,${document.retro}`} className="mt-3 w-full" alt={label} />
                                )}
                            </>
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