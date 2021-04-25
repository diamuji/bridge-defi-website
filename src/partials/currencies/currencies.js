import React from 'react';
import LogoETH from './LogoETH';
import LogoEUR from './LogoEUR';
import LogoUSDC from './LogoUSDC';

export const CURRENCIES = [
    {
        image: () => <LogoEUR className="mr-4" width="2.5rem" />,
        name: 'Euro',
        symbol: 'EUR',
        isCrypto: false,
    },
    {
        image: () => <LogoETH className="mr-4" width="2.5rem" />,
        name: 'Ethereum',
        symbol: 'ETH',
        isCrypto: true,
    },
    {
        image: () => <LogoUSDC className="mr-4" width="2.5rem" />,
        name: 'USD Coin',
        symbol: 'USDC',
        isCrypto: true,
    },
];