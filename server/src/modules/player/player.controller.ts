import * as Router from 'koa-router';
import { RouterContext } from 'koa-router';
import playerService from './player.service';
import { validatePatchPlayerDto } from './dto/patchPlayer.dto';
import { validateCreatePlayerDto } from './dto/createPlayer.dto';

const router = new Router();

router.post('/', async (ctx: RouterContext) => {
    const createDto = validateCreatePlayerDto(ctx.request.body);
    ctx.body = await playerService.create(createDto);
    ctx.status = 201;
});

router.get('/:id', async (ctx: RouterContext) => {
    const id = Number(ctx.params.id);
    ctx.body = await playerService.getById(id);
});

router.patch('/:id', async (ctx: RouterContext) => {
    const id = Number(ctx.params.id);
    const patchDto = validatePatchPlayerDto(ctx.request.body);
    ctx.body = await playerService.patch(id, patchDto);
});

router.delete('/:id', async (ctx: RouterContext) => {
    const id = Number(ctx.params.id);
    await playerService.delete(id);
    ctx.status = 204;
});

export default router;
