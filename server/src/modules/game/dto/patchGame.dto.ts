import { createValidator } from '../../../common/createValidator';

export interface PatchGameDto {
    title?: string;
    runtime?: number;
    stageEndAt?: number;
    objectives?: Array<{
        id: number;
        description: string;
        bonus: boolean;
    }>,
}

export const validatePatchGameDto = createValidator<PatchGameDto>({
    type: 'object',
    properties: {
        title: { type: 'string', nullable: true },
        runtime: { type: 'integer', nullable: true },
        stageEndAt: { type: 'integer', nullable: true },
        objectives: {
            type: 'array',
            nullable: true,
            items: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    description: { type: 'string' },
                    bonus: { type: 'boolean' },
                },
                required: ['id', 'description', 'bonus'],
                additionalProperties: false,
            },
        },
    },
    required: [],
    additionalProperties: false,
});
