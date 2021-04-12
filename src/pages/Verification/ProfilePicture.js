import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FormInput } from '../../utils/FormInput';
import { UserContext } from '../../utils/UserProvider';
import { http } from '../../utils/utils';

export default function ProfilePicture() {
    const userContext = useContext(UserContext);
    const document = userContext.me?.verification?.document;
    const form = useForm({ defaultValues: document });
    const { formState, handleSubmit, errors } = form;

    const onSubmit = async (document) => {
        try {
            const formData = new FormData();
            formData.append('profile-pic', document.profilePicUpload[0]);
            const res = await http({
                method: 'POST',
                url: '/verification/document/profile-pic',
                form: formData,
                json: false,
            });
            const me = { ...document, ...res };
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
                    <h2 className="h4 mb-4">Profile picture</h2>
                    <p>Take a selfie of you.</p>
                </div>

                <div className="flex flex-wrap -m-2">
                    <FormInput
                        className="w-full md:w-1/2 p-2"
                        label="Profile picture"
                        name="profilePicUpload"
                        form={form}
                        errors={errors}
                        validation={{
                            required: { value: true, message: 'You must upload a photo' }
                        }}
                        render={({ name, className, ref, label }) => (
                            <>
                                <input type="file" ref={ref} name={name} className={className} />
                                {document.profilePic && (
                                    <img src={`data:image;base64,${document.profilePic}`} className="mt-3 w-full" alt={label} />
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