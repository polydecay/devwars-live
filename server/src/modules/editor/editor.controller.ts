import * as Router from 'koa-router';
import { RouterContext } from 'koa-router';
import editorService from './editor.service';
import { validatePatchEditorDto } from './dto/patchEditor.dto';

const router = new Router();

router.get('/:id', async (ctx: RouterContext) => {
    const id = Number(ctx.params.id);
    ctx.body = await editorService.getById(id);
});

router.patch('/:id', async (ctx: RouterContext) => {
    const id = Number(ctx.params.id);
    const patchDto = validatePatchEditorDto(ctx.request.body);
    ctx.body = await editorService.patch(id, patchDto);
});

export default router;
