import user from "./user";

const BASE_URL = process.env.REACT_APP_API_URL || '';

export async function http({ method, url, form, json }) {
    const fullUrl = url.indexOf('http') === 0 ? url : BASE_URL + url;
    const contentTypeHeader = json !== false ? { 'Content-Type': 'application/json' } : {};
    const authHeader = user.getAuthHeader();
    const res = await fetch(fullUrl, {
        method: method || 'GET',
        headers: {
            ...contentTypeHeader,
            ...authHeader,
        },
        body: !form ? undefined : (
            form instanceof FormData ? form : JSON.stringify(form)
        )
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