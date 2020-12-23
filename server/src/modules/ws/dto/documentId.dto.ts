import { createValidator } from '../../../common/createValidator';

export interface DocumentIdDto {
    id: number;
}

export const validateDocumentIdDto = createValidator<DocumentIdDto>({
    type: 'object',
    properties: {
        id: { type: 'integer' },
    },
    required: ['id'],
    additionalProperties: false,
});
