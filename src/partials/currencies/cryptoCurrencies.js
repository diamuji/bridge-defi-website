import React from 'react';
import LogoETH from './LogoETH';
import LogoUSDC from './LogoUSDC';
import LogoADAI from './LogoADAI';
import LogoAUSDT from './LogoAUSDT';
import LogoAUSDC from './LogoAUSDC';
import LogoDAI from './LogoDAI';
import LogoSUSD from './LogoSUSD';
import LogoUSDT from './LogoUSDT';
import LogoBUSD from './LogoBUSD';

export const CRYPTO_CURRENCIES = [
    {
        image: () => <LogoETH width="1.8rem" />,
        name: 'Ethereum',
        symbol: 'ETH',
    },
    {
        image: () => <LogoUSDC width="1.8rem" />,
        name: 'USD Coin',
        symbol: 'USDC',
    },
    {
        image: () => <LogoADAI width="1.8rem" />,
        name: 'Aave Dai',
        symbol: 'ADAI',
    },
    {
        image: () => <LogoAUSDT width="1.8rem" />,
        name: 'Aave Tether',
        symbol: 'AUSDT',
    },
    {
        image: () => <LogoAUSDT width="1.8rem" />,
        name: 'aTether',
        symbol: 'AUSDT',
    },
    {
        image: () => <LogoAUSDC width="1.8rem" />,
        name: 'Aave USDC',
        symbol: 'AUSDC',
    },
    {
        image: () => <LogoDAI width="1.8rem" />,
        name: 'Dai',
        symbol: 'DAI',
    },
    {
        image: () => <LogoSUSD width="1.8rem" />,
        name: 'sUSD',
        symbol: 'SUSD',
    },
    {
        image: () => <LogoUSDT width="1.8rem" />,
        name: 'Tether',
        symbol: 'USDT',
    },
    {
        image: () => <LogoBUSD width="1.8rem" />,
        name: 'BinanceUSD',
        symbol: 'BUSD',
    },
];