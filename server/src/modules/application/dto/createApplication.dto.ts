import { createValidator } from '../../../common/createValidator';

export interface CreateApplicationDto {
    id: number;
    username: string;
    message: number;
    preferences: { html: string, css: string, js: string };
}

export const validateCreateApplicationDto = createValidator<CreateApplicationDto>({
    properties: {
        id: { type: 'integer' },
        username: { type: 'string' },
        message: { type: 'string' },
        preferences: {
            properties: {
                html: { enum: ['never', 'bad', 'good', 'best'] },
                css: { enum: ['never', 'bad', 'good', 'best'] },
                js: { enum: ['never', 'bad', 'good', 'best'] },
            },
            required: ['html', 'css', 'js'],
            additionalProperties: false,
        },
    },
    required: ['id', 'username', 'message', 'preferences'],
    additionalProperties: false,
});
