import { Context, Next } from 'koa';
import config from '../../config';
import devwarsService from '../../modules/devwars/devwars.service';
import { UserRole } from '../../modules/devwars/devwarsUser';

export default function authenticate() {
    return async (ctx: Context, next: Next) => {
        if (config.app.apiKey && ctx.header.apikey === config.app.apiKey) {
            ctx.state.user = { id: -1, username: 'API', role: UserRole.ADMIN };
            return await next();
        }

        const token = devwarsService.getTokenFromHeaders(ctx.headers);
        ctx.state.user = await devwarsService.getUserFromToken(token);

        await next();
    };
}
