interface ApiResponse {
    ok: boolean;
    status: number;
    statusText: string;
    body: any;
    error?: string;
}

export async function request(url: string, options: any): Promise<ApiResponse> {
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

async function parseResponse(res: Response): Promise<ApiResponse> {
    const { ok, status, statusText } = res;

    const body = res.headers.get('Content-Type')?.includes('json')
        ? await res.json()
        : await res.text();

    const error = ok
        ? undefined
        : (body?.message ?? statusText);

    return { ok, status, statusText, body, error };
}

export async function get(url: string, options: any): Promise<ApiResponse> {
    return request(url, { method: 'GET', ...options });
}

export async function post(url: string, body: any, options: any): Promise<ApiResponse> {
    return request(url, { method: 'POST', body, ...options });
}

export async function put(url: string, body: any, options: any): Promise<ApiResponse> {
    return request(url, { method: 'PUT', body, ...options });
}

export async function patch(url: string, body: any, options: any): Promise<ApiResponse> {
    return request(url, { method: 'PATCH', body, ...options });
}

export async function del(url: string, options: any): Promise<ApiResponse> {
    return request(url, { method: 'DELETE', ...options });
}
