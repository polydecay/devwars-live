import { createValidator } from '../../../common/createValidator';

export interface PatchPlayerDto {
    ready?: boolean;
}

export const validatePatchPlayerDto = createValidator<PatchPlayerDto>({
    properties: {
        ready: { type: 'boolean' },
    },
    required: [],
    additionalProperties: false,
});
