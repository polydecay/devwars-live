import { createValidator } from '../../../common/createValidator';

export interface PatchTeamDto {
    enabled?: boolean;
    completeObjectives?: number[];
}

export const validatePatchTeamDto = createValidator<PatchTeamDto>({
    properties: {
        enabled: { type: 'boolean' },
        completeObjectives: {
            type: 'array',
            items: { type: 'integer' },
        },
    },
    required: [],
    additionalProperties: false,
});
