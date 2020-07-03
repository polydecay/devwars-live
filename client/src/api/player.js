import * as api from './api';

export async function createPlayer(createDto) {
    return api.post('players', createDto)
}
