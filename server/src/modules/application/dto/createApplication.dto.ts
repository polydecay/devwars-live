import { createValidator } from '../../../common/createValidator';

export interface CreateApplicationDto {
    id: number;
    username: string;
    message: string;
    preferences: { html: string, css: string, js: string };
}

export const validateCreateApplicationDto = createValidator<CreateApplicationDto>({
    type: 'object',
    properties: {
        id: { type: 'integer' },
        username: { type: 'string' },
        message: { type: 'string' },
        preferences: {
            type: 'object',
            properties: {
                html: { type:'string', enum: ['never', 'bad', 'good', 'best'] },
                css: { type:'string', enum: ['never', 'bad', 'good', 'best'] },
                js: { type:'string', enum: ['never', 'bad', 'good', 'best'] },
            },
            required: ['html', 'css', 'js'],
            additionalProperties: false,
        },
    },
    required: ['id', 'username', 'message', 'preferences'],
    additionalProperties: false,
});
