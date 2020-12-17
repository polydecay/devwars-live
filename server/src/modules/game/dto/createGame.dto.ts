import { createValidator } from '../../../common/createValidator';

export interface CreateGameDto {
    mode: string;
    title: string;
    runtime: number;
    objectives?: Array<{
        id: number,
        description: string,
        bonus: boolean,
    }>;
    htmlTemplate?: string;
}

export const validateCreateGameDto = createValidator<CreateGameDto>({
    properties: {
        mode: { enum: ['classic', 'duel', 'zen'] },
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
        htmlTemplate: { type: 'string' },
    },
    required: ['mode', 'title', 'runtime'],
    additionalProperties: false,
});
