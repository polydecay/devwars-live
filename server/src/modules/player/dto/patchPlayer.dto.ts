import { createValidator } from '../../../common/createValidator';

export interface PatchPlayerDto {
    username?: string;
    avatarUrl?: string;
    ready?: boolean;
}

export const validatePatchPlayerDto = createValidator<PatchPlayerDto>({
    type: 'object',
    properties: {
        username: { type: 'string', nullable: true },
        avatarUrl: { type: 'string', nullable: true },
        ready: { type: 'boolean', nullable: true },
    },
    required: [],
    additionalProperties: false,
});
