import React from 'react';
import user from './user';

export const UserContext = React.createContext();

export class UserProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: null,
        };
    }

    async componentDidMount() {
        console.log('componentDidMount:getInfo')
        const userInfo = await user.getInfo();
        if (userInfo) {
            this.setState({ userInfo });
        }
    }

    render() {
        return (
            <UserContext.Provider
                value={{
                    state: this.state,
                    setUserInfo: userInfo => this.setState({ userInfo }),
                }}
            >
                {this.props.children}
            </UserContext.Provider>
        );
    }
}
