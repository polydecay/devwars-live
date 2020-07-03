import * as Ajv from 'ajv';

const ajv = new Ajv({
    coerceTypes: true,
    nullable: true,
    removeAdditional: true,
});

class ValidationError extends Error {
    readonly status = 400;
}

export function createValidator<T>(schema: object): (data: any) => T {
    const validate = ajv.compile(schema);
    return (data: any) => {
        if (!validate(data)) {
            throw new ValidationError(ajv.errorsText(validate.errors));
        }

        return data;
    }
}
