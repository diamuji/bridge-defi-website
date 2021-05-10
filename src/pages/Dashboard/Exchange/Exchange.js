import React, { useState } from 'react';
import ExchangeForm from './ExchangeForm';

export default function Exchange(props) {
    const [verb, setVerb] = useState('deposit');

    const changeVerb = verb => e => {
        e.preventDefault();
        setVerb(verb);
    };

    return (
        <div className={`bg-white rounded-lg shadow-lg p-6 w-full ${props.className}`} style={{ maxWidth: 400 }}>
            <div className="flex flex-row text-center -mt-2 -mx-6 mb-6 shadow-sm">
                <a
                    className={`outline-none flex-grow py-3 cursor-pointer ${verb === 'deposit' && 'border-b-2 border-lightblue-100'}`}
                    href="#0"
                    onClick={changeVerb('deposit')}
                >
                    Deposit
                </a>
                <a
                    className={`outline-none flex-grow py-3 cursor-pointer ${verb === 'withdraw' && 'border-b-2 border-lightblue-100'}`}
                    href="#0"
                    onClick={changeVerb('withdraw')}
                >
                    Withdraw
                </a>
            </div>

            <ExchangeForm type={verb} />
        </div>
    );
}