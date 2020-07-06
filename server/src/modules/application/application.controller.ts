import * as Router from 'koa-router';
import { RouterContext } from 'koa-router';
import applicationService from './application.service';
import { validateCreateApplicationDto } from './dto/createApplication.dto';

const router = new Router();

router.get('/', async (ctx: RouterContext) => {
    ctx.body = await applicationService.getAll();
});

router.post('/', async (ctx: RouterContext) => {
    const createDto = validateCreateApplicationDto(ctx.request.body);
    ctx.body = await applicationService.create(createDto);
    ctx.status = 201;
});

router.get('/:id', async (ctx: RouterContext) => {
    const id = Number(ctx.params.id);
    ctx.body = await applicationService.getById(id);
});

router.delete('/:id', async (ctx: RouterContext) => {
    const id = Number(ctx.params.id);
    await applicationService.delete(id);
    ctx.status = 204;
});

export default router;
