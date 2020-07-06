import io from 'socket.io-client';
import store from '../store';

const ws = io('http://localhost:8000', { transports: ['websocket'] });

ws.on('connect', () => {
    store.commit('user/WS_CONNECT', { id: ws.id, user: null });
    ws.emit('game.refresh');
    ws.emit('admin.refresh');
});

ws.on('disconnect', () => {
    store.commit('user/WS_DISCONNECT');
});

ws.on('game.state', (state) => {
    store.commit('game/SET_STATE', state);
});

ws.on('admin.state', (state) => {
    store.commit('admin/SET_STATE', state);
});

export default ws;
