import { createValidator } from '../../../common/createValidator';

export interface CreatePlayerDto {
    id: number;
    username: string;
    role: string;
    avatarUrl?: string;
    ready?: boolean;
    teamId: number;
}

export const validateCreatePlayerDto = createValidator<CreatePlayerDto>({
    type: 'object',
    properties: {
        id: { type: 'integer' },
        username: { type: 'string' },
        role: { type: 'string' },
        avatarUrl: { type: 'string', nullable: true },
        ready: { type: 'boolean', nullable: true },
        teamId: { type: 'integer' },
    },
    required: ['id', 'username', 'role', 'teamId'],
    additionalProperties: false,
});
