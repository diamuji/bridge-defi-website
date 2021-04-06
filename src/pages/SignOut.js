import { useContext, useEffect } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { UserContext } from '../utils/UserProvider';

function SignOut() {
    const history = useHistory();
    const userContext = useContext(UserContext);

    useEffect(() => {
        userContext.logout();
        history.replace('/');
    }, [userContext, history]);

    return null;
}

export default withRouter(SignOut);
