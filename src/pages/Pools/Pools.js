import React from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import LoggedPage from '../../partials/LoggedPage';

function Pools() {
    const history = useHistory();

    return (
        <LoggedPage>
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
                <div className="mb-4 sm:mb-0">
                    <h1 className="text-2xl text-gray-800 font-bold">
                        Pools
                    </h1>
                </div>
            </div>

            <button type="submit" className="btn text-white bg-teal-500 hover:bg-teal-600 px-20" onClick={() => history.push('/pools/create')}>
                Create new
            </button>

        </LoggedPage>
    );
}

export default withRouter(Pools);
