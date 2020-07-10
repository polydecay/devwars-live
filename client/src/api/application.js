import * as api from './api';

export async function createApplication(createDto) {
    return api.post(`applications`, createDto);
}

export async function getApplication(id) {
    return api.get(`applications/${id}`);
}

export async function deleteApplication(id) {
    return api.del(`applications/${id}`);
}
