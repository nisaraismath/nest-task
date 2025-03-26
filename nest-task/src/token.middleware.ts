// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';

// @Injectable()
// export class TokenLoggerMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     const authHeader = req.headers['authorization']; // ✅ Get Authorization header
//     if (authHeader) {
//       console.log('🔑 Bearer Token:', authHeader.replace('Bearer ', '')); // ✅ Log token without "Bearer" prefix
//     } else {
//       console.log('❌ No Bearer Token Found');
//     }
//     next(); // Move to the next middleware/controller
//   }
// }
