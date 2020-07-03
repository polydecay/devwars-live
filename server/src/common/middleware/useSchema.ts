import { Context, Next } from 'koa';
import * as Ajv from 'ajv';

const ajv = new Ajv({
    $data: true,
    coerceTypes: true,
    nullable: true,
    removeAdditional: true,
});

export default function useSchema(schema: object) {
    const validate = ajv.compile(schema);
    return async (ctx: Context, next: Next) => {
        if (!validate(ctx.request.body)) {
            ctx.throw(400, ajv.errorsText(validate.errors));
        }

        await next();
    };
}
