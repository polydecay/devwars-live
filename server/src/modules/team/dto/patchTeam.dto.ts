import { createValidator } from '../../../common/createValidator';

export interface PatchTeamDto {
    enabled?: boolean;
    completeObjectives?: number[];
}

export const validatePatchTeamDto = createValidator<PatchTeamDto>({
    type: 'object',
    properties: {
        enabled: { type: 'boolean', nullable: true },
        completeObjectives: {
            type: 'array',
            nullable: true,
            items: { type: 'integer' },
        },
    },
    required: [],
    additionalProperties: false,
});
