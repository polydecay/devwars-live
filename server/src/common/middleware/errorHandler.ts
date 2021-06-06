import { Context, Next } from 'koa';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import config from '../../config';

export default function errorHandler() {
    return async (ctx: Context, next: Next) => {
        try {
            await next();
        } catch (error) {
            let status = error.status ?? error.statusCode ?? 500;
            let message = error.message ?? 'Internal server error';
            let stack = undefined;

            if (error instanceof EntityNotFoundError) {
                status = 404;
                message = 'Not Found';
            }

            // Mask internal server errors in production.
            if (config.env === 'production' && status === 500) {
                message = 'Internal server error';
            }

            // Include stack trace in development.
            if (config.env === 'development' && error.stack) {
                stack = error.stack;
            }

            ctx.status = status;
            ctx.body = { error: { status, message, stack } };
        }
    };
}
