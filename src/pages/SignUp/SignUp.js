import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Header from '../../partials/Header/Header';
import PageIllustration from '../../partials/PageIllustration';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { ThankYou } from './ThankYou';

function SignUp() {
    const [formData, setFormData] = useState();
    const [step, setStep] = useState(1);

    const handleStepSubmit = async (data) => {
        const fullData = { ...formData, ...data };
        setFormData(fullData);
        setStep(step + 1);
    };

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
                                    {step === 1 && <Step1 formData={formData} onSubmit={handleStepSubmit} />}
                                    {step === 2 && <Step2 formData={formData} onSubmit={handleStepSubmit} />}
                                    {step === 3 && <Step3 formData={formData} onSubmit={handleStepSubmit} />}

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

export default withRouter(SignUp);