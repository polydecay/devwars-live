import * as api from './api';

export async function patchTeam(id, patchDto) {
    return api.patch(`teams/${id}`, patchDto);
}
