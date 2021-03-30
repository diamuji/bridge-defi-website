import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Header from '../../partials/Header';
import PageIllustration from '../../partials/PageIllustration';
import { http, redirect } from '../../utils/utils';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { ThankYou } from './ThankYou';

class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = { step: 1 };
        this.handleStepSubmit = this.handleStepSubmit.bind(this);
    }

    handleStepSubmit(data) {
        const step = this.state.step + 1;
        this.setState({ ...data, step });
        if (step > 3) this.submit();
    }

    async submit() {
        const result = await http({
            method: 'POST',
            url: '/users',
            form: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phone: this.state.phone,
                email: this.state.email,
                password: this.state.password,
            }
        });
        console.log(result);
        redirect('/confirmation');
    }

    render() {
        const { step } = this.state;

        return (
            <div className="flex flex-col min-h-screen overflow-hidden">

                {/*  Site header */}
                <Header />

                {/*  Page content */}
                <main className="flex-grow">

                    {/*  Page illustration */}
                    <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
                        <PageIllustration />
                    </div>

                    <section className="relative">
                        <div className="max-w-6xl mx-auto px-4 sm:px-6">
                            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                                {step <= 3 && (
                                    <div className="max-w-sm mx-auto">
                                        {step === 1 && <Step1 onSubmit={this.handleStepSubmit} />}
                                        {step === 2 && <Step2 onSubmit={this.handleStepSubmit} />}
                                        {step === 3 && <Step3 onSubmit={this.handleStepSubmit} />}

                                        <div className="text-gray-400 text-center mt-6">
                                            Already registered to Bridge DeFi?&nbsp;
                                            <Link
                                                to="/signin"
                                                className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out"
                                            >
                                                Sign in
                                            </Link>
                                        </div>
                                    </div>
                                )}

                                {step > 3 && <ThankYou />}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        );
    }
}

export default withRouter(SignUp)
