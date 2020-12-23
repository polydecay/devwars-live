import { createValidator } from '../../../common/createValidator';

export interface CreateGameDto {
    mode: string;
    title: string;
    runtime: number;
    objectives?: Array<{
        id: number;
        description: string;
        bonus: boolean;
    }>;
    htmlTemplate?: string;
}

export const validateCreateGameDto = createValidator<CreateGameDto>({
    type: 'object',
    properties: {
        mode: { type: 'string', enum: ['classic', 'duel', 'zen'] },
        title: { type: 'string' },
        runtime: { type: 'integer' },
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
        htmlTemplate: { type: 'string', nullable: true },
    },
    required: ['mode', 'title', 'runtime'],
    additionalProperties: false,
});
