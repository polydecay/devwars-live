import Ajv, { JSONSchemaType } from 'ajv';

const ajv = new Ajv({
    coerceTypes: true,
    removeAdditional: true,
    // HACK: This was disabled becuase of the last two optional items
    // in the DocumentTextOpDto schema.
    strictTuples: false,
});

class ValidationError extends Error {
    readonly status = 400;
}

export function createValidator<T>(schema: JSONSchemaType<T>): (data: any) => T {
    const validate = ajv.compile(schema);

    return (data: any): T => {
        if (!validate(data)) {
            throw new ValidationError(ajv.errorsText(validate.errors));
        }

        return data;
    }
}
