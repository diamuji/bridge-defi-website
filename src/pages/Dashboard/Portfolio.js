import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CURRENCIES } from '../../partials/currencies/currencies';
import Loading from '../../partials/Loading';
import { UserContext } from '../../utils/UserProvider';
import { http } from '../../utils/utils';

export default function Portfolio(props) {
    const { className, userId, showConvertLink, userData } = props;
    const [portfolio, setPortfolio] = useState(userData);
    const myPortfolio = portfolio?.portfolio || {};
    const userContext = useContext(UserContext);
    const isAdmin = userContext.me?.isAdmin;

    useEffect(() => {
        const fetchData = async () => {
            const result = await http({
                method: 'GET',
                url: isAdmin && userId
                    ? `/admin/full-portfolio/${userId}`
                    : '/portfolio/me'
            });
            setPortfolio(result);
        };
        if (!userData) {
            fetchData();
        }
    }, [userData, isAdmin, userId]);

    return (
        <div className={`w-80 max-w-full ${className}`}>
            <div className="bg-white shadow-lg rounded border border-gray-200 text-gray-600 py-5 px-6">
                <div className="w-full">
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
            </div>

            {showConvertLink && (
                <div className="mt-4 text-right mx-3">
                    <Link to={`/users/${userId}/convert`} className="text-sm text-teal-500">
                        Convert
                        <svg className="ml-2 w-3 h-3 fill-current inline" viewBox="0 0 12 12">
                            <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" />
                        </svg>
                    </Link>
                </div>
            )}
        </div>
    );
}