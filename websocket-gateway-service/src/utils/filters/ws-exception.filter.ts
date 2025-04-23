import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';

@Catch(WsException)
export class WsRpcExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: WsException, host: ArgumentsHost) {
    const ws = host.switchToWs();
    const client = ws.getClient();
    const data = ws.getData();

    const error = exception.getError();

    const errorResponse = {
      error: {
        message: error as string, // Так как вы бросаете WsException со строкой
        code: 'WS_ERROR',
        status: 400,
      },
      originalData: data,
    };

    console.log(errorResponse);

    client.emit('validation_error', errorResponse);
  }
}
