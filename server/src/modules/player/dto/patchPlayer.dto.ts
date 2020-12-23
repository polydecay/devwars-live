import { createValidator } from '../../../common/createValidator';

export interface PatchPlayerDto {
    ready?: boolean;
}

export const validatePatchPlayerDto = createValidator<PatchPlayerDto>({
    type: 'object',
    properties: {
        ready: { type: 'boolean', nullable: true },
    },
    required: [],
    additionalProperties: false,
});
