import React from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import Header from '../partials/Header/Header';
import { FormInput } from '../utils/FormInput';
import { EMAIL_REGEX, http } from '../utils/utils';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Body from '../partials/Body';

function ForgotPassword() {
    const form = useForm();
    const { formState, errors, handleSubmit } = form;
    const history = useHistory();

    const onSubmit = async ({ email }) => {
        try {
            await http({
                method: 'POST',
                url: '/users/reset-password',
                form: { email }
            });
        } catch (e) {
            console.error(e);
        }
        toast.success('We have e-mailed your password reset link');
        history.push('/signin');
    };

    return (
        <div className="flex flex-col min-h-screen overflow-hidden">
            {/*  Site header */}
            <Header />

            {/*  Page content */}
            <Body className="flex-grow">
                <section className="relative">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                            <div className="max-w-sm mx-auto">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <fieldset disabled={formState.isSubmitting}>
                                        <div className="max-w-3xl mx-auto pb-10 md:pb-15">
                                            <h1 className="h4 mb-5">
                                                Forgot your password?
                                            </h1>
                                            <p>
                                                Enter the e-mail address associated to your account
                                                and we'll send you a link to reset your password.
                                            </p>
                                        </div>

                                        <FormInput
                                            label="E-mail"
                                            name="email"
                                            form={form}
                                            errors={errors}
                                            validation={{
                                                required: true,
                                                pattern: EMAIL_REGEX
                                            }}
                                            render={({ name, className, ref, label }) => (
                                                <input
                                                    ref={ref}
                                                    name={name}
                                                    className={className}
                                                    placeholder={label}
                                                    type="email"
                                                    autoFocus
                                                />
                                            )}
                                        />

                                        <div className="flex flex-wrap mt-6">
                                            <button type="submit" className="btn text-white bg-lightblue-100 hover:bg-lightblue-200 w-full">
                                                Continue
                                            </button>
                                        </div>
                                    </fieldset>
                                </form>

                                <div className="text-gray-400 text-center mt-6">
                                    Don't have a Bridge DeFi account?&nbsp;
                                    <Link
                                        to="/signup"
                                        className="text-lightblue-200 hover:text-gray-200 transition duration-150 ease-in-out"
                                    >
                                        Sign up
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Body>
        </div>
    );
}

export default withRouter(ForgotPassword);
