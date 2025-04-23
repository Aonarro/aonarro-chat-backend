import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
import { BadRequestException } from '@nestjs/common';
import { ValidationErrorResponse } from 'src/utils/types/types';

@Catch(BadRequestException)
export class WsValidationFilter extends BaseWsExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ws = host.switchToWs();
    const client = ws.getClient();
    const data = ws.getData();

    const response = exception.getResponse() as
      | string
      | { message: string[]; error: string; statusCode: number };

    let errors: string[] = [];

    if (typeof response === 'string') {
      errors = [response];
    } else if (
      typeof response === 'object' &&
      Array.isArray(response['message'])
    ) {
      errors = response['message'];
    }

    const errorResponse: ValidationErrorResponse = {
      errors,
      originalData: data,
    };

    client.emit('validation_error', errorResponse);
  }
}
