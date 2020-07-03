import * as api from './api';

export async function patchEditor(id, patchDto) {
    return api.patch(`editors/${id}`, patchDto);
}

export async function resetEditor(id) {
    return api.post(`editors/${id}/reset`);
}
