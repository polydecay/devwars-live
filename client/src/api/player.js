import * as api from './api';

export async function addPlayer(createDto) {
    return api.post('players', createDto)
}
