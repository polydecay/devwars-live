import { Context, HttpError, Next } from 'koa';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import config from '../../config';

export default function errorHandler() {
    return async (ctx: Context, next: Next) => {
        try {
            await next();
        } catch (error) {
            let status = 500;
            let message = 'Internal server error';
            let stack: string | undefined;

            if (error instanceof HttpError) {
                if (error.status || error.statusCode) {
                    status = error.status ?? error.statusCode;
                }

                if (error.message) {
                    message = error.message;
                }
            }

            if (error instanceof EntityNotFoundError) {
                status = 404;
                message = 'Not Found';
            }

            // Hide internal server error messages in production.
            if (config.env === 'production' && status === 500) {
                message = 'Internal server error';
            }

            // Include stack trace in development.
            if (config.env === 'development') {
                stack = (error as any)?.stack;
            }

            ctx.status = status;
            ctx.body = { error: { status, message, stack } };
        }
    };
}
