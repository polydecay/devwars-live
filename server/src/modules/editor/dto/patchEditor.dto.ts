import { createValidator } from '../../../common/createValidator';

export interface PatchEditorDto {
    template?: string;
    locked?: boolean;
    fileText?: string;
}

export const validatePatchEditorDto = createValidator<PatchEditorDto>({
    properties: {
        template: { type: 'string' },
        locked: { type: 'boolean' },
        fileText: { type: 'string' },
    },
    required: [],
    additionalProperties: false,
});
