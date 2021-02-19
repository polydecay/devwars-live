import * as http from './http';

export { http };

// ---------------------------------------------------------
// Game

export async function createGame(createDto) {
    return http.post('game', createDto);
}

export async function patchGame(patchDto) {
    return http.patch('game', patchDto);
}

export async function destroyGame() {
    return http.del('game');
}

export async function archiveGame() {
    return http.post('game/archive');
}

export async function gameNextStage() {
    return http.post('game/nextStage');
}

export async function gamePrevStage() {
    return http.post('game/prevStage');
}

// ---------------------------------------------------------
// Team

export async function patchTeam(id, patchDto) {
    return http.patch(`teams/${id}`, patchDto);
}

// ---------------------------------------------------------
// Player

export async function createPlayer(createDto) {
    return http.post('players', createDto)
}

export async function setPlayerReady(id, ready) {
    return http.patch(`players/${id}/ready`, { ready });
}

// ---------------------------------------------------------
// Editor

export async function patchEditor(id, patchDto) {
    return http.patch(`editors/${id}`, patchDto);
}

export async function resetEditor(id) {
    return http.post(`editors/${id}/reset`);
}

export async function setEditorPlayer(id, playerId) {
    return http.post(`editors/${id}/player`, { playerId });
}

export async function deleteEditorPlayer(id) {
    return http.del(`editors/${id}/player`);
}

// ---------------------------------------------------------
// Application

export async function createApplication(createDto) {
    return http.post(`applications`, createDto);
}

export async function getApplication(id) {
    return http.get(`applications/${id}`);
}

export async function deleteApplication(id) {
    return http.del(`applications/${id}`);
}

// ---------------------------------------------------------
// DevWars Service

export async function getUserById(id) {
    return http.get(`devwars/users/${id}`);
}

export async function searchUsers(search) {
    return http.post(`devwars/users/search`, { search });
}
