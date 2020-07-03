import { createValidator } from '../../../common/createValidator';

export interface PatchTeamDto {
    disabled?: boolean;
    completeObjectives?: number[];
}

export const validatePatchTeamDto = createValidator<PatchTeamDto>({
    properties: {
        disabled: { type: 'boolean' },
        completeObjectives: {
            type: 'array',
            items: { type: 'integer' },
        },
    },
    required: [],
    additionalProperties: false,
});
