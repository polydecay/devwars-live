import Router, { RouterContext } from 'koa-router';
import { moderatorGuard } from '../../common/middleware/roleGuards';
import voteService from './vote.service';
import { validateCreateVoteDto } from './dto/createVote.dto';

const router = new Router();

router.get('/', moderatorGuard(), async (ctx: RouterContext) => {
    ctx.body = await voteService.getAll();
    ctx.status = 201;
});

router.post('/', moderatorGuard(), async (ctx: RouterContext) => {
    const createDto = validateCreateVoteDto(ctx.request.body);
    ctx.body = await voteService.createOrUpdate(createDto);
});

router.delete('/', moderatorGuard(), async (ctx: RouterContext) => {
    await voteService.deleteAll();
    ctx.status = 204;
});

router.get('/teamResults', async (ctx: RouterContext) => {
    ctx.body = await voteService.getTeamResults();
});

export default router;
