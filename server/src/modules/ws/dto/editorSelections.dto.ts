import { createValidator } from '../../../common/createValidator';
import { CursorSelectionDto } from '../../document/CursorSelection';

export interface EditorSelectionsDto {
    id: number;
    s: CursorSelectionDto[];
}

export const validateEditorSelectionsDto = createValidator<EditorSelectionsDto>({
    type: 'object',
    properties: {
        id: { type: 'integer' },
        s: {
            type: 'array',
            items: {
                type: 'array',
                items: [
                    { type: 'integer' },
                    { type: 'integer' },
                    { type: 'integer', nullable: true },
                    { type: 'integer', nullable: true },
                    { type: 'integer', nullable: true },
                ],
                minItems: 2,
                maxItems: 5,
            },
            minItems: 1,
        },
    },
    required: ['id', 's'],
    additionalProperties: false,
});
