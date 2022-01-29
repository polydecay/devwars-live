import _ from 'lodash';
import { IncomingHttpHeaders } from 'http';
import fetch, { RequestInit } from 'node-fetch';
import createError, { HttpError } from 'http-errors';
import cookie from 'cookie';
import config from '../../config';
import { Game } from '../game/game.model';
import { User, UserRole, validateUser } from './devwarsUser';

class DevwarsService {
    private async request(url: string, options?: RequestInit): Promise<any> {
        const res = await fetch(`${config.devwarsApi.url}/${url}`, options);
        if (!res.ok) {
            const body = await res.json();
            throw createError(res.status, `DevWars API: ${body?.error}`);
        }

        return res.json();
    }

    private async apiRequest(url: string, options?: RequestInit) {
        return this.request(url, _.merge({ headers: { apikey: config.devwarsApi.apiKey } }, options));
    }

    async getUserById(id: number): Promise<User | null> {
        try {
            const user = await this.apiRequest(`users/${id}`);
            return validateUser(user);
        } catch (error) {
            if (error instanceof HttpError && error.status === 404) {
                return null;
            }

            throw error;
        }
    }

    async getUserFromToken(token: string): Promise<User | null> {
        if (!token) return null;

        try {
            const user = await this.request('auth/user', { headers: { cookie: `token=${token}` } });
            return validateUser(_.pick(user, ['id', 'role', 'username', 'avatarUrl']));
        } catch (error) {
            console.error('DevWars API:', error);
            return null;
        }
    }

    getTokenFromHeaders(headers: IncomingHttpHeaders): string {
        const token = headers.token ?? cookie.parse(headers.cookie ?? '').token;
        return typeof token !== 'string' ? '' : token;
    }

    async searchUsersByName(search: string): Promise<Pick<User, 'id' | 'username'>[]> {
        if (!search) return [];

        try {
            const users: any[] = await this.apiRequest(`search/users?username=${encodeURIComponent(search)}&limit=5`);
            return users.map(user => ({ id: user.id, username: user.username }));
        } catch (error) {
            console.error('DevWars API:', error);
            throw error;
        }
    }

    async archiveGame(game: Game): Promise<any> {
        try {
            return await this.apiRequest(`games/archive`, {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify(game),
            });
        } catch (error) {
            console.error('DevWars API:', error);
            throw error;
        }
    }
}

class DevwarsServiceMock extends DevwarsService {
    private readonly users: User[] = [
        { id: 1, username: 'Admin', role: UserRole.ADMIN, avatarUrl: null },
        { id: 2, username: 'Moderator', role: UserRole.MODERATOR, avatarUrl: null },
        { id: 3, username: 'User', role: UserRole.USER, avatarUrl: '/logo.svg' },
    ];

    async getUserById(id: number): Promise<User | null> {
        return this.users.find(user => user.id === id) ?? null;
    }

    async getUserFromToken(token: string): Promise<User | null> {
        return this.users.find(user => user.role === token) ?? null;
    }

    async searchUsersByName(search: string): Promise<User[]> {
        const searchLower = search.toLowerCase();
        return this.users.filter(user => user.username.toLowerCase().search(searchLower) >= 0);
    }

    async archiveGame(game: Game): Promise<any> {
        return game;
    }
}

export default (config.env === 'development' && !config.devwarsApi.apiKey)
    ? new DevwarsServiceMock()
    : new DevwarsService();
