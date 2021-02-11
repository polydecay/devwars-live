import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import authenticate from './common/middleware/authenticate';
import errorHandler from './common/middleware/errorHandler';
import gameController from './modules/game/game.controller';
import teamController from './modules/team/team.controller';
import editorController from './modules/editor/editor.controller';
import playerController from './modules/player/player.controller';
import applicationController from './modules/application/application.controller';
import voteController from './modules/vote/vote.controller';
import devwarsController from './modules/devwars/devwars.controller';

const koa = new Koa();

koa.use(bodyParser({ enableTypes: ['json'] }));
koa.use(errorHandler());
koa.use(authenticate());
koa.use(new Router()
    .use('/api/game', gameController.routes())
    .use('/api/teams', teamController.routes())
    .use('/api/editors', editorController.routes())
    .use('/api/players', playerController.routes())
    .use('/api/applications', applicationController.routes())
    .use('/api/votes', voteController.routes())
    .use('/api/devwars', devwarsController.routes())
    .routes()
);

koa.on('error', (error) => {
    console.error('Koa server error:', error);
});

export default koa;
