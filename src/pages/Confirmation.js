import { useContext, useEffect } from 'react';
import { useHistory, useParams, withRouter } from 'react-router-dom';
import { UserContext } from '../utils/UserProvider';

function Confirmation() {
    const history = useHistory();
    const userContext = useContext(UserContext);
    const { id } = useParams();
    
    useEffect(() => {
        const confirm = async () => {
            try {
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
