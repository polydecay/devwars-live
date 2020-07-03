import * as api from './api';

export async function createGame(createDto) {
    return api.post('game', createDto);
}

export async function patchGame(patchDto) {
    return api.patch('game', patchDto);
}

export async function destroyGame() {
    return api.del('game');
}

export async function gameNextStage() {
    return api.post('game/nextStage');
}

export async function gamePrevStage() {
    return api.post('game/prevStage');
}
