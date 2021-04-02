const BASE_URL = process.env.REACT_APP_API_URL || '';

export async function http({ method, url, form }) {
    const fullUrl = url.indexOf('http') === 0 ? url : BASE_URL + url;
    const res = await fetch(fullUrl, {
        method: method || 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
    });
    let jsonRes = {};
    try {
        jsonRes = await res.json();
    } catch (e) {
    }
    if (!res.ok) {
        // eslint-disable-next-line
        throw {
            code: res.status,
            reason: jsonRes?.errmsg || res.statusText || 'Error'
        };
    } else {
        return jsonRes;
    }
}

export const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;