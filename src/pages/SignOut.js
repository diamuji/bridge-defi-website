import { useContext, useEffect } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { PathContext } from '../utils/PathProvider';
import { UserContext } from '../utils/UserProvider';

function SignOut() {
    const history = useHistory();
    const userContext = useContext(UserContext);
    const pathContext = useContext(PathContext);

    useEffect(() => {
        userContext.logout();
        history.replace(pathContext.current ?? '/');
    }, [userContext, history, pathContext]);

    return null;
}

export default withRouter(SignOut);
