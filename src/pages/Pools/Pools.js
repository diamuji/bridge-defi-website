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
        <LoggedPage title={(
            <>
                <span className="flex-grow">
                    Pools
                </span>
                {isAdmin && (
                    <button
                        type="submit"
                        className="btn text-white bg-lightblue-100 hover:bg-lightblue-200 px-3 py-2 text-sm"
                        onClick={() => history.push('/pools/create')}
                    >
                        Create new
                    </button>
                )}
            </>
        )}>

            <PoolList />

        </LoggedPage>
    );
}

export default withRouter(Pools);
