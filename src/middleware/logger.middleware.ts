import { Injectable, NestMiddleware } from "@nestjs/common";

import { FastifyRequest, FastifyReply } from "fastify";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: FastifyRequest["raw"], res: FastifyReply["raw"], next: () => void) {
    next();
    res.on("finish", () => {
      console.log(
        `Response Status: ${res.statusCode}, URL: ${req.url}, Method: ${req.method}`
      );
    });
  }
}
