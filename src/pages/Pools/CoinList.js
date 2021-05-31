import React from 'react';
import { CRYPTO_CURRENCIES } from '../../partials/currencies/cryptoCurrencies';

export function CoinList(props) {
    if (typeof props.content !== 'string') {
        return props.children;
    }

    const list = (props.content || '').split(',').map(coin => coin.trim());
    const firstCoin = CRYPTO_CURRENCIES.filter(currency => (
        currency.name.toUpperCase() === list[0].toUpperCase() || currency.symbol === list[0].toUpperCase()
    ))[0];

    if (firstCoin) {
        return list.map((coin, index) => {
            const cryptoCurrency = CRYPTO_CURRENCIES.filter(currency => (
                currency.name.toUpperCase() === coin.toUpperCase() || currency.symbol === coin.toUpperCase()
            ))[0];
            return (
                <div key={index} className="inline-block mr-2 my-1">
                    {cryptoCurrency ? cryptoCurrency.image() : coin}
                </div>
            );
        });
    } else {
        return props.children;
    }
}