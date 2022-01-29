import Router, { RouterContext } from 'koa-router';
import { moderatorGuard, userGuard } from '../../common/middleware/roleGuards';
import { isModerator } from '../devwars/devwarsUser';
import playerService from './player.service';
import { validateCreatePlayerDto } from './dto/createPlayer.dto';
import { validatePatchPlayerDto } from './dto/patchPlayer.dto';
import { validatePatchPlayerReadyDto } from './dto/patchPlayerReady.dto';

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

router.patch('/:id', moderatorGuard(), async (ctx: RouterContext) => {
    const id = Number(ctx.params.id);
    const patchDto = validatePatchPlayerDto(ctx.request.body);
    ctx.body = await playerService.patch(id, patchDto);
});

router.delete('/:id', moderatorGuard(), async (ctx: RouterContext) => {
    const id = Number(ctx.params.id);
    await playerService.delete(id);
    ctx.status = 204;
});

router.patch('/:id/ready', userGuard(), async (ctx: RouterContext) => {
    const { user } = ctx.state;
    const id = Number(ctx.params.id);

    // Users are only allowed to update their own ready state.
    if (!isModerator(user) && user.id !== id) {
        ctx.throw(403);
    }

    const patchReadyDto = validatePatchPlayerReadyDto(ctx.request.body);
    ctx.body = await playerService.patch(id, patchReadyDto);
});

export default router;
