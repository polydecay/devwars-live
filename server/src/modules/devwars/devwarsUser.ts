import { createValidator } from '../../common/createValidator';

export interface User {
    id: number;
    role: UserRole;
    username: string;
    avatarUrl: string | null;
}

export enum UserRole {
    BANNED = 'BANNED',
    PENDING = 'PENDING',
    USER = 'USER',
    MODERATOR = 'MODERATOR',
    ADMIN = 'ADMIN',
}

enum UserRoleRank {
    'BANNED' = -1,
    'PENDING' = 0,
    'USER' = 1,
    'MODERATOR' = 2,
    'ADMIN' = 3,
}

export const validateUser = createValidator<User>({
    type: 'object',
    properties: {
        id: { type: 'integer' },
        role: {
            type: 'string',
            enum: [
                UserRole.BANNED,
                UserRole.PENDING,
                UserRole.USER,
                UserRole.MODERATOR,
                UserRole.ADMIN,
            ],
        },
        username: { type: 'string' },
        avatarUrl: { type: 'string' },
    },
    required: ['id', 'role', 'username'],
    additionalProperties: false,
});

export function hasRole(user: User, role: UserRole): boolean {
    return UserRoleRank[user.role] >= UserRoleRank[role];
}

export function isModerator(user: User): boolean {
    return UserRoleRank[user.role] >= UserRoleRank.MODERATOR;
}
