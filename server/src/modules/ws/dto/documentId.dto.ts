import { createValidator } from '../../../common/createValidator';

export interface DocumentIdDto {
    id: number;
}

export const validateDocumentIdDto = createValidator<DocumentIdDto>({
    properties: {
        id: { type: 'integer' },
    },
    required: ['id'],
    additionalProperties: false,
});
