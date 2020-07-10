import { Context, Next } from 'koa';
import devwarsService from '../../modules/devwars/devwars.service';

export default function authenticate() {
    return async (ctx: Context, next: Next) => {
        ctx.state.user = await devwarsService.getUserFromHeaders(ctx.headers);
        await next();
    };
}
