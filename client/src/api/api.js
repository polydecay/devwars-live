export async function request(url, options) {
    const { body } = options;
    if (body && typeof body === 'object') {
        options.body = JSON.stringify(body);
        options.headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };
    }

    const res = await fetch(`/api/${url}`, options);
    return await parseResponse(res);
}

async function parseResponse(res) {
    const { ok, status, statusText } = res;

    const body = res.headers.get('Content-Type')?.includes('json')
        ? await res.json()
        : await res.text();

    const error = ok
        ? undefined
        : (body?.message ?? statusText);

    return { ok, status, statusText, body, error };
}

export async function get(url, options) {
    return request(url, { method: 'GET', ...options });
}

export async function post(url, body, options) {
    return request(url, { method: 'POST', body, ...options });
}

export async function put(url, body, options) {
    return request(url, { method: 'PUT', body, ...options });
}

export async function patch(url, body, options) {
    return request(url, { method: 'PATCH', body, ...options });
}

export async function del(url, options) {
    return request(url, { method: 'DELETE', ...options });
}
