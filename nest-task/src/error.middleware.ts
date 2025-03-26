// import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
// import { Request, Response } from 'express';
// @Catch()
// export class GlobalErrorFilter implements ExceptionFilter {
//   catch(exception: unknown, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();
//     let status = HttpStatus.INTERNAL_SERVER_ERROR;
//     let message = 'Internal server error';
//     let error = 'Internal Server Error';
//     if (exception instanceof HttpException) {
//       status = exception.getStatus();
//       const response = exception.getResponse();
//       message = typeof response === 'string' ? response : (response as any).message;
//       error = (response as any).error || exception.name;
//     } else if (exception instanceof Error) {
//       message = exception.message;
//     }
//     response.status(status).json({
//       statusCode: status,
//       timestamp: new Date().toISOString(),
//       path: request.url,
//       message,
//       error,
//     });
//   }
// }