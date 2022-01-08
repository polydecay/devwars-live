import io from 'socket.io-client';
import store from '../store';
import eventBus from './eventBus';

const socket = io({ transports: ['websocket'] });

socket.install = (app) => app.config.globalProperties.$socket = socket;

socket.on('connect', () => {
    store.commit('app/WS_CONNECT', { id: socket.id });
    socket.emit('game.refresh');
});

socket.on('disconnect', () => {
    store.commit('app/WS_DISCONNECT');
});

socket.on('init', (user) => {
    store.commit('app/WS_INIT', user);
    socket.emit('admin.refresh');
});

socket.on('game.state', (state) => {
    store.commit('game/SET_STATE', state);
});

socket.on('admin.state', (state) => {
    store.commit('admin/SET_STATE', state);
});

socket.on('e.text', ({ id, text }) => {
    eventBus.emit(`editor.${id}.text`, text);
});

socket.on('e.o', ({ id, o: operationDto }) => {
    eventBus.emit(`editor.${id}.o`, operationDto);
});

socket.on('e.s', ({ id, s: cursorSelections }) => {
    eventBus.emit(`editor.${id}.s`, cursorSelections);
});

socket.on('e.save', ({ id }) => {
    eventBus.emit(`editor.save`, id);
});

export default socket;
