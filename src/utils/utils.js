const BASE_URL = process.env.API_URL || '';

export async function http({ method, url, form }) {
    const res = await fetch(BASE_URL + url, {
        method: method || 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
    });
    return res.json();
}

export function redirect(url) {
    this.props.history.push(url);
}

export const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;