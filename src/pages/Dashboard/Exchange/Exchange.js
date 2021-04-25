import React, { useState } from 'react';
import Deposit from './Deposit';
import Withdraw from './Withdraw';

export default function Exchange() {
    const [verb, setVerb] = useState('deposit');

    const changeVerb = verb => e => {
        e.preventDefault();
        setVerb(verb);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6" style={{ maxWidth: 400 }}>
            <div className="flex flex-row text-center -mt-2 -mx-6 mb-6">
                <a
                    className={`outline-none flex-grow py-3 cursor-pointer ${verb === 'deposit' && ' border-b-2 border-teal-500'}`}
                    href="#0"
                    onClick={changeVerb('deposit')}
                >
                    Deposit
                </a>
                <a
                    className={`outline-none flex-grow py-3 cursor-pointer ${verb === 'withdraw' && ' border-b-2 border-teal-500'}`}
                    href="#0"
                    onClick={changeVerb('withdraw')}
                >
                    Withdraw
                </a>
            </div>

            {verb === 'deposit' && <Deposit />}
            {verb === 'withdraw' && <Withdraw />}
        </div>
    );
}