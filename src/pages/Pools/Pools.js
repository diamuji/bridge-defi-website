import React from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import LoggedPage from '../../partials/LoggedPage';
import PoolList from './PoolList';

function Pools() {
    const history = useHistory();

    return (
        <LoggedPage>
            <div className="mb-4 sm:mb-0 flex flex-row mb-8">
                <h1 className="text-2xl text-gray-800 font-bold flex-grow">
                    Pools
                </h1>
                <button
                    type="submit"
                    className="btn text-white bg-teal-500 hover:bg-teal-600 px-10 mb-5"
                    onClick={() => history.push('/pools/create')}
                >
                    Create new
                </button>
            </div>

            <PoolList />

        </LoggedPage>
    );
}

export default withRouter(Pools);
