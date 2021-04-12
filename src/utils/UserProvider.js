import React from 'react';
import user from './user';
import { http } from './utils';
import countries from '../refdata/countries.json';

export const UserContext = React.createContext();

export class UserProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            me: null,
            fetching: true,
            country: null,
        };
        this.fetchingCountry = false;
    }

    async componentDidMount() {
        this.setState({ fetching: true });
        const me = await user.getInfo();
        if (me) this.setState({ me });
        this.setState({ fetching: false });
    }

    login = async (email, password) => {
        const me = await user.login(email, password);
        this.setState({ me });
    }

    logout = () => {
        this.setState({ me: undefined });
        user.logout();
    }

    update = (me) => {
        user.update(me);
        this.setState({ me: { ...this.state.me, ...me } });
    }

    getCountry = () => {
        if (this.state.country) return this.state.country;

        if (!this.fetchingCountry) {
            const fetchCountry = async () => {
                this.fetchingCountry = true;
                const res = await http({
                    text: true,
                    url: 'https://www.cloudflare.com/cdn-cgi/trace',
                });
                const countryCode = res.split('\n').map(line => line.split('=')).filter(item => item[0] === 'loc')[0][1];
                const country = countries.filter(country => country.code === countryCode)[0];
                this.fetchingCountry = false;
                this.setState({ country });
            };
            fetchCountry();
        }
        return {};
    }

    render() {
        return (
            <UserContext.Provider
                value={{
                    me: this.state.me,
                    country: this.state.country,
                    fetching: this.state.fetching,
                    confirm: user.confirm.bind(user),
                    update: this.update,
                    login: this.login,
                    logout: this.logout,
                    getCountry: this.getCountry,
                }}
            >
                {this.props.children}
            </UserContext.Provider>
        );
    }
}
