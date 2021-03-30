const BASE_URL = process.env.API_URL || '';

export function http({ method, url, form }) {
    return fetch(BASE_URL + url, {
        method: method || 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
    }).then(res => res.json());
}

export function redirect(url) {
    this.props.history.push(url);
}

export const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;