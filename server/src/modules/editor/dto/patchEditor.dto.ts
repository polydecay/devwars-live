import { createValidator } from '../../../common/createValidator';

export interface PatchEditorDto {
    fileName?: string;
    template?: string;
    locked?: boolean;
    hidden?: boolean;
    fileText?: string;
}

export const validatePatchEditorDto = createValidator<PatchEditorDto>({
    type: 'object',
    properties: {
        fileName: { type: 'string', nullable: true },
        template: { type: 'string', nullable: true },
        locked: { type: 'boolean', nullable: true },
        hidden: { type: 'boolean', nullable: true },
        fileText: { type: 'string', nullable: true },
    },
    required: [],
    additionalProperties: false,
});
