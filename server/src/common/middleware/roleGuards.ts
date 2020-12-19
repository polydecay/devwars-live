import { Context, Next } from 'koa';
import { hasRole, UserRole } from '../../modules/devwars/devwarsUser';

export function roleGuard(role: UserRole): (ctx: Context, next: Next) => Promise<void> {
    return async (ctx: Context, next: Next): Promise<void> => {
        if (!ctx.state.user || !hasRole(ctx.state.user, role)) {
            ctx.throw(403);
        }

        await next();
    };
}

export function adminGuard(): (ctx: Context, next: Next) => Promise<void> {
    return roleGuard(UserRole.ADMIN);
}

export function moderatorGuard(): (ctx: Context, next: Next) => Promise<void> {
    return roleGuard(UserRole.MODERATOR);
}

export function userGuard(): (ctx: Context, next: Next) => Promise<void> {
    return roleGuard(UserRole.USER);
}
