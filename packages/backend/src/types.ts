import { Context as KoaContext } from 'koa';
import { User } from './entities/User';

export type Session = {
    userId: string;
};
export type Cookies = KoaContext['cookies'];

export type Context = {
    user: User;
    session: Session;
    cookies: Cookies;
    destroy(): void;
};