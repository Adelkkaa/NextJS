export { default } from 'next-auth/middleware';

export const config = { matcher: ['/newPage', '/protected/:path*'] };
