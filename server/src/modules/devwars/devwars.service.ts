import { IncomingHttpHeaders } from 'http';
import * as cookie from 'cookie';
import config from '../../config';

export interface User {
    id: number;
    username: string;
    role: UserRole;
    // avatarUrl: string;
}

export enum UserRole {
    BANNED = 'BANNED',
    PENDING = 'PENDING',
    USER = 'USER',
    MODERATOR = 'MODERATOR',
    ADMIN = 'ADMIN',
}

const devUsers: { [key: string]: User } = {
    ADMIN: { id: 1, username: 'Admin', role: UserRole.ADMIN },
    MODERATOR: { id: 2, username: 'Moderator', role: UserRole.MODERATOR },
    USER: { id: 3, username: 'User', role: UserRole.USER },
};

class DevwarsService {
    // async getUserById(id: number) {}

    async getUserFromHeaders(headers: IncomingHttpHeaders): Promise<User | null> {
        const token = headers.token ?? cookie.parse(headers.cookie ?? '').token;
        if (typeof token !== 'string') return null;

        if (config.env === 'development' && devUsers[token]) {
            return devUsers[token];
        }

        // TODO: Get user from the DevWars API.
        return null;
    }
}

export default new DevwarsService();
