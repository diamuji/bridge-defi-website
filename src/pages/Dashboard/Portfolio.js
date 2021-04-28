import React, { useContext, useEffect, useState } from 'react';
import { CURRENCIES } from '../../partials/currencies/currencies';
import Loading from '../../partials/Loading';
import { UserContext } from '../../utils/UserProvider';
import { http } from '../../utils/utils';

export default function Portfolio(props) {
    const userId = props.user;
    const [portfolio, setPortfolio] = useState();
    const myPortfolio = portfolio?.portfolio || {};
    const userContext = useContext(UserContext);
    const isAdmin = userContext.me?.isAdmin;

    useEffect(() => {
        const fetchData = async () => {
            const result = await http({
                method: 'GET',
                url: isAdmin && userId
                    ? `/admin/portfolio/${userId}`
                    : '/portfolio/me'
            });
            setPortfolio(result);
        };
        fetchData();
    }, [isAdmin, userId]);

    return (
        <div className={`w-full ${props.className}`} style={{ maxWidth: 300 }}>
            <div className="mb-3">
                <h1 className="text-2xl text-gray-800 font-bold">Portfolio</h1>
            </div>

            <Loading if={!portfolio} className="py-5">
                {portfolio && CURRENCIES.map(currency => (
                    <div key={currency.symbol} className="flex flex-row items-center py-2 border-b border-gray-200 last:border-b-0">
                        {currency.image()}
                        <div className="ml-3 leading-4">
                            {myPortfolio[currency.symbol.toLowerCase()] || 0}
                            <div className="text-gray-500 text-xs">{currency.symbol}</div>
                        </div>
                    </div>
                ))}
            </Loading>
        </div>
    );
}