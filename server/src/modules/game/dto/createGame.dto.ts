import { createValidator } from '../../../common/createValidator';

export interface CreateGameDto {
    mode: 'classic';
    title: string;
    runtime: number;
    objectives: Array<{
        id: number,
        description: string,
        bonus: boolean,
    }>;
}

export const validateCreateGameDto = createValidator<CreateGameDto>({
    properties: {
        mode: { enum: ['classic'] },
        title: { type: 'string' },
        runtime: { type: 'integer' },
        objectives: {
            type: 'array',
            items: {
                properties: {
                    id: { type: 'integer' },
                    description: { type: 'string' },
                    bonus: { type: 'boolean', default: false },
                },
                required: ['id', 'description'],
                additionalProperties: false,
            },
        },
    },
    required: ['mode', 'title', 'runtime', 'objectives'],
    additionalProperties: false,
});
