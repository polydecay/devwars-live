import { createValidator } from '../../../common/createValidator';

export interface CreatePlayerDto {
    id: number;
    username: string;
    role: string;
    ready?: boolean;
    teamId: number;
}

export const validateCreatePlayerDto = createValidator<CreatePlayerDto>({
    properties: {
        id: { type: 'integer' },
        username: { type: 'string' },
        role: { type: 'string' },
        ready: { type: 'boolean' },
        teamId: { type: 'integer' },
    },
    required: ['id', 'username', 'role', 'teamId'],
    additionalProperties: false,
});
