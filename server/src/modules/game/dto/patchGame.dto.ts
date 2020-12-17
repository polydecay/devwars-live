import { createValidator } from '../../../common/createValidator';

export interface PatchGameDto {
    title?: string;
    runtime?: number;
    stageEndAt?: number;
    objectives?: Array<{
        id: number;
        description: string;
        bonus?: boolean;
    }>
}

export const validatePatchGameDto = createValidator<PatchGameDto>({
    properties: {
        title: { type: 'string' },
        runtime: { type: 'integer' },
        stageEndAt: { type: 'integer' },
        objectives: {
            type: 'array',
            items: {
                properties: {
                    id: { type: 'integer' },
                    description: { type: 'string' },
                    bonus: { type: 'boolean' },
                },
                required: ['id', 'description'],
                additionalProperties: false,
            },
        },
    },
    required: [],
    additionalProperties: false,
});
