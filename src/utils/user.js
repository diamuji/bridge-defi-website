import Cookies from 'universal-cookie';
import { http } from './utils';

const AUTH_COOKIE_VAR = 'auth';

class User {
    constructor() {
        this.cookies = new Cookies();
        this.authToken = this.cookies.get(AUTH_COOKIE_VAR);
    }

    async fetchInfo() {
        try {
            this.me = await http({ url: '/users/me' });
        } catch (e) {
            console.error('User::fetchInfo (error)', e);
        }
    }

    async getInfo() {
        if (this.authToken && !this.me) {
            await this.fetchInfo();
            if (!this.me) this.cookies.remove(AUTH_COOKIE_VAR);
        }
        return this.me;
    }

    getAuthHeader() {
        return this.authToken ? { Authorization: `Bearer ${this.authToken}` } : {};
    }

    async login(email, password) {
        const res = await http({
            method: 'POST',
            url: '/users/login',
            form: {
                email,
                password,
            }
        });
        this.me = res.user;
        this.cookies.set(AUTH_COOKIE_VAR, res.token);
    }
}

export default new User();