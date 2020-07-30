import { Context, Next } from 'koa';
import devwarsService from '../../modules/devwars/devwars.service';

export default function authenticate() {
    return async (ctx: Context, next: Next) => {
        const token = devwarsService.getTokenFromHeaders(ctx.headers);
        ctx.state.user = await devwarsService.getUserFromToken(token);

        await next();
    };
}
