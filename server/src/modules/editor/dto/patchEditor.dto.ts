import { createValidator } from '../../../common/createValidator';

export interface PatchEditorDto {
    fileName?: string;
    template?: string;
    locked?: boolean;
    hidden?: boolean;
    fileText?: string;
}

export const validatePatchEditorDto = createValidator<PatchEditorDto>({
    properties: {
        fileName: { type: 'string' },
        template: { type: 'string' },
        locked: { type: 'boolean' },
        hidden: { type: 'boolean' },
        fileText: { type: 'string' },
    },
    required: [],
    additionalProperties: false,
});
