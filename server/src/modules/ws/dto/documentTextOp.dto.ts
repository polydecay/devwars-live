import { createValidator } from '../../../common/createValidator';
import { TextOperationDto } from '../../document/TextOperation';

export interface DocumentTextOpDto {
    id: number;
    o: TextOperationDto;
}

export const validateDocumentTextOpDto = createValidator<DocumentTextOpDto>({
    type: 'object',
    properties: {
        id: { type: 'integer' },
        o: {
            type: 'array',
            items: [
                { type: 'string' },
                { type: 'integer' },
                { type: 'integer' },
                { type: 'integer', nullable: true },
                { type: 'integer', nullable: true },
            ],
            minItems: 3,
            maxItems: 5,
            additionalProperties: false,
        },
    },
    required: ['id', 'o'],
    additionalProperties: false,
});
