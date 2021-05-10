import React, { useContext } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import Header from '../partials/Header/Header';
import Body from '../partials/Body';
import { FormInput } from '../utils/FormInput';
import { EMAIL_REGEX } from '../utils/utils';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { UserContext } from '../utils/UserProvider';

function SignIn() {
    const form = useForm();
    const { formState, errors, handleSubmit } = form;
    const history = useHistory();
    const userContext = useContext(UserContext);

    const onSubmit = async ({ email, password }) => {
        try {
            await userContext.login(email, password);
            history.push('/dashboard');
        } catch (e) {
            console.error(e);
            toast.error(e?.reason?.error || 'Username or password not correct');
        }
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
                                        <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                                            <h1 className="h3">
                                                Welcome back
                                            </h1>
                                            <p>Enter your credentials</p>
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
                                        <FormInput
                                            label="Password"
                                            name="password"
                                            form={form}
                                            errors={errors}
                                            validation={{
                                                required: { value: true, message: 'You must enter a password' },
                                                minLength: { value: 6, message: 'Password must be at least 6 characters' }
                                            }}
                                            render={({ name, className, ref, label }) => (
                                                <input
                                                    ref={ref}
                                                    name={name}
                                                    className={className}
                                                    placeholder={label}
                                                    type="password"
                                                />
                                            )}
                                        />
                                        <div className="text-right">
                                            <Link to="/forgotPassword" className="text-lightblue-100">
                                                Forgot password?
                                            </Link>
                                        </div>

                                        <div className="flex flex-wrap mt-6">
                                            <button type="submit" className="btn text-white bg-lightblue-100 hover:bg-lightblue-100 w-full">
                                                Login
                                            </button>
                                        </div>
                                    </fieldset>
                                </form>

                                <div className="text-gray-400 text-center mt-6">
                                    Don't have a Bridge DeFi account?&nbsp;
                                    <Link
                                        to="/signup"
                                        className="text-lightblue-100 hover:text-gray-200 transition duration-150 ease-in-out"
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

export default withRouter(SignIn);
