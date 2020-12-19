import * as Router from 'koa-router';
import { RouterContext } from 'koa-router';
import { moderatorGuard } from '../../common/middleware/roleGuards';
import devwarsService from './devwars.service';
const router = new Router();

router.get('/users/:id', moderatorGuard(), async (ctx: RouterContext) => {
    const id = Number(ctx.params.id);
    ctx.body = await devwarsService.getUserById(id);
});

router.post('/users/search', moderatorGuard(), async (ctx: RouterContext) => {
    const { search } = ctx.request.body;
    ctx.body = await devwarsService.searchUsersByName(String(search));
});

export default router;
