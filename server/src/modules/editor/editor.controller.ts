import * as Router from 'koa-router';
import { RouterContext } from 'koa-router';
import hasRole from '../../common/middleware/hasRole';
import { UserRole } from '../devwars/devwars.service';
import editorService from './editor.service';
import { validatePatchEditorDto } from './dto/patchEditor.dto';
import { validateEditorPlayerDto } from './dto/editorPlayer.dto';

const router = new Router();

router.get('/:id', async (ctx: RouterContext) => {
    const id = Number(ctx.params.id);
    ctx.body = await editorService.getById(id);
});

router.patch('/:id', hasRole(UserRole.MODERATOR), async (ctx: RouterContext) => {
    const id = Number(ctx.params.id);
    const patchDto = validatePatchEditorDto(ctx.request.body);
    ctx.body = await editorService.patch(id, patchDto);
});

router.post('/:id/reset', hasRole(UserRole.MODERATOR), async (ctx: RouterContext) => {
    const id = Number(ctx.params.id);
    ctx.body = await editorService.reset(id);
});

router.post('/:id/player', hasRole(UserRole.MODERATOR), async (ctx: RouterContext) => {
    const id = Number(ctx.params.id);
    const { playerId } = validateEditorPlayerDto(ctx.request.body);
    ctx.body = await editorService.setPlayer(id, playerId);
});

router.delete('/:id/player', hasRole(UserRole.MODERATOR), async (ctx: RouterContext) => {
    const id = Number(ctx.params.id);
    await editorService.deletePlayer(id);
    ctx.status = 204;
});

export default router;
