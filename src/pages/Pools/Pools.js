import React, { useContext } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import LoggedPage from '../../partials/LoggedPage';
import { UserContext } from '../../utils/UserProvider';
import PoolList from './PoolList';

function Pools() {
    const history = useHistory();
    const userContext = useContext(UserContext);
    const isAdmin = userContext.me?.isAdmin;

    return (
        <LoggedPage>
            <div className={`flex flex-row mb-8`}>
                <h1 className="text-2xl text-gray-800 font-bold flex-grow">
                    Pools
                </h1>

                {isAdmin && (
                    <button
                        type="submit"
                        className="btn text-white bg-teal-500 hover:bg-teal-600 px-10"
                        onClick={() => history.push('/pools/create')}
                    >
                        Create new
                    </button>
                )}
            </div>

            <PoolList />

        </LoggedPage>
    );
}

export default withRouter(Pools);
