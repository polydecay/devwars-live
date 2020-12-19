import * as Router from 'koa-router';
import { RouterContext } from 'koa-router';
import { moderatorGuard, userGuard } from '../../common/middleware/roleGuards';
import applicationService from './application.service';
import { validateCreateApplicationDto } from './dto/createApplication.dto';

const router = new Router();

router.get('/', moderatorGuard(), async (ctx: RouterContext) => {
    ctx.body = await applicationService.getAll();
});

router.post('/', userGuard(), async (ctx: RouterContext) => {
    const { user } = ctx.state;
    const createDto = validateCreateApplicationDto(ctx.request.body);

    // Users can only create applications for themselves.
    if (user.role === 'user' && (user.id !== createDto.id || user.username !== createDto.username)) {
        ctx.throw(403);
    }

    ctx.body = await applicationService.create(createDto);
    ctx.status = 201;
});

router.get('/:id', userGuard(), async (ctx: RouterContext) => {
    const { user } = ctx.state;
    const id = Number(ctx.params.id);

    // Users can only access their own applications.
    if (user.role === 'user' && user.id !== id) {
        ctx.throw(403);
    }

    ctx.body = await applicationService.getById(id);
});

router.delete('/:id', userGuard(), async (ctx: RouterContext) => {
    const { user } = ctx.state;
    const id = Number(ctx.params.id);

    // Users can only delete their own applications.
    if (user.role === 'user' && user.id !== id) {
        ctx.throw(403);
    }

    await applicationService.delete(id);
    ctx.status = 204;
});

export default router;
