import React from 'react';
import user from './user';

export const UserContext = React.createContext();

export class UserProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            me: null,
        };
    }

    async componentDidMount() {
        const me = await user.getInfo();
        if (me) {
            this.setState({ me });
        }
    }

    login = async (email, password) => {
        const me = await user.login(email, password);
        this.setState({ me });
    }

    logout = () => {
        this.setState({ me: undefined });
        user.logout();
    }

    render() {
        return (
            <UserContext.Provider
                value={{
                    me: this.state.me,
                    login: this.login,
                    logout: this.logout,
                }}
            >
                {this.props.children}
            </UserContext.Provider>
        );
    }
}
