import Cookies from 'universal-cookie';
import { http } from './utils';
import toast from 'react-hot-toast';

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
            if (!this.me) this.logout();
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
        return this.me;
    }

    logout() {
        this.me = undefined;
        this.cookies.remove(AUTH_COOKIE_VAR);
    }

    async confirm(id) {
        await http({
            method: 'POST',
            url: `/users/confirm/${id}`,
        });
        toast.success('E-mail address confirmed successfully');
    }

    update(me) {
        this.me = me;
    }
}

export default new User();