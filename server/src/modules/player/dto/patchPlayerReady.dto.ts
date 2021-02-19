import { createValidator } from '../../../common/createValidator';

export interface patchPlayerReadyDto {
    ready: boolean;
}

export const validatePatchPlayerReadyDto = createValidator<patchPlayerReadyDto>({
    type: 'object',
    properties: {
        ready: { type: 'boolean', nullable: true },
    },
    required: ['ready'],
    additionalProperties: false,
});
