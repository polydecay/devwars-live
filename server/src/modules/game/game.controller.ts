import * as Router from 'koa-router';
import { RouterContext } from 'koa-router';
import hasRole from '../../common/middleware/hasRole';
import { UserRole } from '../devwars/devwars.service';
import gameService from './game.service';
import { validateCreateGameDto } from './dto/createGame.dto';
import { validatePatchGameDto } from './dto/patchGame.dto';

const router = new Router();

router.get('/', async (ctx: RouterContext) => {
    ctx.body = await gameService.getGameWithRelations();
});

router.post('/', hasRole(UserRole.ADMIN), async (ctx: RouterContext) => {
    const createDto = validateCreateGameDto(ctx.request.body);
    ctx.body = await gameService.create(createDto);
    ctx.status = 201;
});

router.patch('/', hasRole(UserRole.MODERATOR), async (ctx: RouterContext) => {
    const patchDto = validatePatchGameDto(ctx.request.body);
    ctx.body = await gameService.patch(patchDto);
});

router.delete('/', hasRole(UserRole.ADMIN), async (ctx: RouterContext) => {
    await gameService.delete();
    ctx.status = 204;
});

router.post('/nextStage', hasRole(UserRole.MODERATOR), async (ctx: RouterContext) => {
    ctx.body = await gameService.nextStage();
});

router.post('/prevStage', hasRole(UserRole.MODERATOR), async (ctx: RouterContext) => {
    ctx.body = await gameService.prevStage();
});

export default router;
