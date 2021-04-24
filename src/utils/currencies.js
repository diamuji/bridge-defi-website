import React from 'react';
import LogoETH from '../partials/currencies/LogoETH';

export const CURRENCIES = [
    {
        image: () => <LogoETH className="mr-4" width="2.5rem" />,
        name: 'Ethereum',
        symbol: 'ETH',
    }
];