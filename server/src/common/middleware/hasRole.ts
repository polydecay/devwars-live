import { Context, Next } from 'koa';
import { UserRole } from '../../modules/devwars/devwars.service';

const getRoleRank = (role: UserRole): number => {
    switch (role) {
        case UserRole.BANNED: return -1;
        case UserRole.PENDING: return 0;
        case UserRole.USER: return 1;
        case UserRole.MODERATOR: return 2;
        case UserRole.ADMIN: return 2;
        default:
            console.error(`Unknown user role "${role}"`);
            return -2;
    }
}

export default function hasRole(role: UserRole) {
    const minRank = getRoleRank(role);

    return async (ctx: Context, next: Next) => {
        const { user } = ctx.state;
        if (!user || getRoleRank(user.role) < minRank) {
            ctx.throw(403);
        }

        await next();
    };
}
