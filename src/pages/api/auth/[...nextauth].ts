import { authConfig } from 'components/configs/auth';
import NextAuth from 'next-auth';

const handler = NextAuth(authConfig);

export default handler;
