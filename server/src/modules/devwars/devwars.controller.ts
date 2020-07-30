import * as Router from 'koa-router';
import { RouterContext } from 'koa-router';
import hasRole from '../../common/middleware/hasRole';
import devwarsService, { UserRole } from './devwars.service';
const router = new Router();

router.get('/users/:id', hasRole(UserRole.MODERATOR), async (ctx: RouterContext) => {
    const id = Number(ctx.params.id);
    ctx.body = await devwarsService.getUserById(id);
});

router.post('/users/search', hasRole(UserRole.MODERATOR), async (ctx: RouterContext) => {
    const { search } = ctx.request.body;
    ctx.body = await devwarsService.searchUsersByName(String(search));
});

export default router;
