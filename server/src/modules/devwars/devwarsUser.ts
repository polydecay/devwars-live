import { createValidator } from '../../common/createValidator';

export interface User {
    id: number;
    role: UserRole;
    username: string;
    avatarUrl: string | null;
}

export const validateUser = createValidator<User>({
    properties: {
        id: { type: 'integer' },
        role: { enum: ['BANNED', 'PENDING', 'USER', 'MODERATOR', 'ADMIN'] },
        username: { type: 'string' },
        avatarUrl: { type: 'string' },
    },
    required: ['id', 'role', 'username'],
    additionalProperties: true,
});

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

export function hasRole(user: User, role: UserRole): boolean {
    return UserRoleRank[user.role] >= UserRoleRank[role];
}

export function isModerator(user: User): boolean {
    return UserRoleRank[user.role] >= UserRoleRank.MODERATOR;
}
