import * as Router from 'koa-router';
import { RouterContext } from 'koa-router';
import hasRole from '../../common/middleware/hasRole';
import { UserRole } from '../devwars/devwars.service';
import voteService from './vote.service';
import { validateCreateVoteDto } from './dto/createVote.dto';

const router = new Router();

router.get('/', hasRole(UserRole.MODERATOR), async (ctx: RouterContext) => {
    ctx.body = await voteService.getAll();
    ctx.status = 201;
});

router.post('/', hasRole(UserRole.MODERATOR), async (ctx: RouterContext) => {
    const createDto = validateCreateVoteDto(ctx.request.body);
    ctx.body = await voteService.createOrUpdate(createDto);
});

router.delete('/', hasRole(UserRole.MODERATOR), async (ctx: RouterContext) => {
    await voteService.deleteAll();
    ctx.status = 204;
});

router.get('/teamResults', async (ctx: RouterContext) => {
    ctx.body = await voteService.getTeamResults();
});

export default router;
