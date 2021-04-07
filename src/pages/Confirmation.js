import { useContext, useEffect } from 'react';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
import { UserContext } from '../utils/UserProvider';

function Confirmation() {
    const history = useHistory();
    const userContext = useContext(UserContext);
    const location = useLocation();
    
    useEffect(() => {
        const confirm = async () => {
            try {
                const query = new URLSearchParams(location.search);
                const id = query.get('id');
                await userContext.confirm(id);
                history.replace('/signin');
            } catch (e) {
                console.error(e);
                history.replace('/');
            }
        };
        confirm();
        // eslint-disable-next-line
    }, []);

    return null;
}

export default withRouter(Confirmation);
