import { createValidator } from '../../../common/createValidator';

export interface EditorPlayerDto {
    playerId: number;
}

export const validateEditorPlayerDto = createValidator<EditorPlayerDto>({
    type: 'object',
    properties: {
        playerId: { type: 'integer' },
    },
    required: ['playerId'],
    additionalProperties: false,
});
