import React from 'react';
import LogoETH from './LogoETH';
import LogoEUR from './LogoEUR';

export const CRYPTO_CURRENCIES = [
    {
        image: () => <LogoETH className="mr-4" width="2.5rem" />,
        name: 'Ethereum',
        symbol: 'ETH',
    }
];
export const REGULAR_CURRENCIES = [
    {
        image: () => <LogoEUR className="mr-4" width="2.5rem" />,
        name: 'Euro',
        symbol: 'EUR',
    }
];