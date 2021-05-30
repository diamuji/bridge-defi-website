import React, { useEffect, useState } from 'react';
import { useHistory, useParams, withRouter } from 'react-router';
import LoggedPage from '../../partials/LoggedPage';
import { http } from '../../utils/utils';
import Portfolio from '../Dashboard/Portfolio';
import TransactionsTable from '../Transactions/TransactionTable';
import Loading from '../../partials/Loading';
import InvestmentList from '../Investments/InvestmentList';
import ConversionList from '../Conversions/ConversionList';
import UserForm from './UserForm';

function User() {
    const { id } = useParams();
    const [user, setUser] = useState();
    const [portfolio, setPortfolio] = useState();
    const history = useHistory();

    useEffect(() => {
        setUser();
        const fetchData = async () => {
            const user = await http({ url: `/admin/users/${id}` });
            setUser(user);
            const portfolio = await http({ url: `/admin/full-portfolio/${id}` });
            setPortfolio(portfolio);
        };
        fetchData();
    }, [id]);

    if (!user) {
        return (
            <LoggedPage admin>
                <div className="m-5">Loading...</div>
            </LoggedPage>
        );
    }

    const back = e => {
        e.preventDefault();
        history.push('/users');
    };

    return (
        <LoggedPage admin title={(
            <>
                <a onClick={back} className="block cursor-pointer mr-3 mt-2" href="#0">
                    <svg height="24" width="24" viewBox="0 0 24 24" fill="#000000">
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                    </svg>
                </a>
                <div className="leading-3">
                    <h1 className="text-2xl text-gray-800 font-bold">
                        {user.firstName} {user.lastName}
                    </h1>
                    <p className="text-gray-400">{user.email}</p>
                </div>
            </>
        )}>
            <div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
                    <Loading if={!portfolio}>
                        <Portfolio
                            userId={id}
                            showConvertLink
                            className="mx-auto"
                            userData={portfolio}
                        />
                    </Loading>

                    <div className="col-span-3">
                        <UserForm user={user} setUser={setUser} />
                    </div>
                </div>
            
                <div className="mb-6">
                    <Loading if={!portfolio?.investment}>
                        <InvestmentList userData={portfolio?.investment} />
                    </Loading>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-6">
                        <Loading if={!portfolio?.deposit}>
                            <TransactionsTable
                                title="Deposits"
                                srcDstLabel="Source"
                                what="deposit"
                                userData={portfolio?.deposit}
                            />
                        </Loading>
                    </div>

                    <div className="mb-6">
                        <Loading if={!portfolio?.withdrawal}>
                            <TransactionsTable
                                title="Withdrawals"
                                srcDstLabel="Destination"
                                what="withdrawal"
                                userData={portfolio?.withdrawal}
                            />
                        </Loading>
                    </div>
                </div>
            
                <div className="mb-5">
                    <Loading if={!portfolio?.investment}>
                        <ConversionList userData={portfolio?.conversion} />
                    </Loading>
                </div>
            </div>
        </LoggedPage>
    );
}

export default withRouter(User);