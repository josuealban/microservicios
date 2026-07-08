import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

interface RpcError {
  statusCode?: number;
  message?: string;
}

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(RpcExceptionFilter.name);

  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const error = exception.getError() as string | RpcError;

    const status =
      typeof error === 'object' && error?.statusCode
        ? error.statusCode
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      typeof error === 'object' && error?.message
        ? error.message
        : typeof error === 'string'
        ? error
        : 'Internal server error';

    this.logger.error(`RpcException: ${JSON.stringify(error)}`);

    response.status(status).json({
      statusCode: status,
      message,
      error: HttpStatus[status] ?? 'Error',
    });
  }
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // RPC error objects come as plain objects with status/message
    if (exception && typeof exception === 'object') {
      const exc = exception as Record<string, unknown>;
      const status =
        (typeof exc.statusCode === 'number' ? exc.statusCode : null) ||
        (typeof exc.status === 'number' ? exc.status : null) ||
        HttpStatus.INTERNAL_SERVER_ERROR;
      const message = (typeof exc.message === 'string' ? exc.message : null) || 'Internal server error';

      this.logger.error(`Exception caught: ${JSON.stringify(exception)}`);

      return response.status(status).json({
        statusCode: status,
        message,
        error: HttpStatus[status] ?? 'Error',
      });
    }

    this.logger.error(`Unhandled exception: ${exception}`);
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
}
