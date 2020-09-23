import { createValidator } from '../../../common/createValidator';

export interface CreateVoteDto {
    twitchId: number;
    twitchUsername: string;
    category: string;
    teamId: number;
}

export const validateCreateVoteDto = createValidator<CreateVoteDto>({
    properties: {
        twitchId: { type: 'integer' },
        twitchUsername: { type: 'string' },
        category: { enum: ['design', 'function'] },
        teamId: { type: 'integer' },
    },
    required: ['twitchId', 'twitchUsername', 'category', 'teamId'],
    additionalProperties: false,
});
