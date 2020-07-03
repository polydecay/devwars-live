import * as api from './api';

export async function patchEditor(id, patchDto) {
    return api.patch(`editors/${id}`, patchDto);
}

export async function resetEditor(id) {
    return api.post(`editors/${id}/reset`);
}

export async function setEditorPlayer(id, playerId) {
    return api.post(`editors/${id}/player`, { playerId });
}

export async function deleteEditorPlayer(id) {
    return api.del(`editors/${id}/player`);
}
