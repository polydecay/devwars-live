import { createValidator } from '../../../common/createValidator';
import { TextOperationDto } from '../../document/TextOperation';

export interface DocumentTextOpDto {
    id: number;
    o: TextOperationDto;
}

export const validateDocumentTextOpDto = createValidator<DocumentTextOpDto>({
    properties: {
        id: { type: 'integer' },
        o: {
            type: 'array',
            items: [
                { type: 'string' },
                { type: 'integer' },
                { type: 'integer' },
                { type: 'integer' },
                { type: 'integer' },
            ],
        },
    },
    required: ['id', 'o'],
    additionalProperties: false,
});
