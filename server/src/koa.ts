import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as Router from 'koa-router';
import errorHandler from './common/middleware/errorHandler';
import gameController from './modules/game/game.controller';
import teamController from './modules/team/team.controller';
import editorController from './modules/editor/editor.controller';
import playerController from './modules/player/player.controller';

const koa = new Koa();

koa.use(bodyParser({ enableTypes: ['json'] }));
koa.use(errorHandler());
koa.use(new Router()
    .use('/api/game', gameController.routes())
    .use('/api/teams', teamController.routes())
    .use('/api/editors', editorController.routes())
    .use('/api/players', playerController.routes())
    .routes()
);

koa.on('error', (error) => {
    console.log('Koa server error:', error);
});

export default koa;
