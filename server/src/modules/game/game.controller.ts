import * as Router from 'koa-router';
import { RouterContext } from 'koa-router';
import { adminGuard, moderatorGuard } from '../../common/middleware/roleGuards';
import gameService from './game.service';
import { validateCreateGameDto } from './dto/createGame.dto';
import { validatePatchGameDto } from './dto/patchGame.dto';

const router = new Router();

router.get('/', async (ctx: RouterContext) => {
    ctx.body = await gameService.getGameWithRelations();
});

router.post('/', adminGuard(), async (ctx: RouterContext) => {
    const createDto = validateCreateGameDto(ctx.request.body);
    ctx.body = await gameService.create(createDto);
    ctx.status = 201;
});

router.patch('/', moderatorGuard(), async (ctx: RouterContext) => {
    const patchDto = validatePatchGameDto(ctx.request.body);
    ctx.body = await gameService.patch(patchDto);
});

router.delete('/', adminGuard(), async (ctx: RouterContext) => {
    await gameService.delete();
    ctx.status = 204;
});

router.post('/archive', adminGuard(), async (ctx: RouterContext) => {
    await gameService.archive();
    await gameService.delete();
    ctx.status = 204;
});

router.post('/nextStage', moderatorGuard(), async (ctx: RouterContext) => {
    ctx.body = await gameService.nextStage();
});

router.post('/prevStage', moderatorGuard(), async (ctx: RouterContext) => {
    ctx.body = await gameService.prevStage();
});

export default router;
