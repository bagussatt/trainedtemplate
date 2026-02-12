import { Request } from 'express';

export type ReqUser = Request & {
  user: { sub: string; email: string };
};
