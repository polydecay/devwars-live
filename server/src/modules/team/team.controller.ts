import * as path from 'path';
import * as Router from 'koa-router';
import { RouterContext } from 'koa-router';
import hasRole from '../../common/middleware/hasRole';
import { UserRole } from '../devwars/devwars.service';
import editorService from '../editor/editor.service';
import teamService from './team.service';
import { validatePatchTeamDto } from './dto/patchTeam.dto';

const router = new Router();

router.get('/:id', async (ctx: RouterContext) => {
    const id = Number(ctx.params.id);
    ctx.body = await teamService.getById(id);
});

router.patch('/:id', hasRole(UserRole.MODERATOR), async (ctx: RouterContext) => {
    const id = Number(ctx.params.id);
    const patchDto = validatePatchTeamDto(ctx.request.body);
    ctx.body = await teamService.patch(id, patchDto);
});

router.get('/:id/files/:fileName', async (ctx: RouterContext) => {
    const id = Number(ctx.params.id);
    const fileName = ctx.params.fileName;

    const editor = await editorService.getByName(id, fileName);
    ctx.type = path.extname(editor.fileName);
    ctx.body = editor.fileText;
});

export default router;
