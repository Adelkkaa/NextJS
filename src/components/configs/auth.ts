import { NextAuthOptions, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import axios from 'axios';

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    Credentials({
      credentials: {
        email: { label: 'email', type: 'email', required: true },
        password: { label: 'password', type: 'password', required: true },
        name: { label: 'name', type: 'text', required: false },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        let users = [];
        try {
          const res = await axios.get('http://localhost:4000/users');
          users = res.data;
        } catch (e) {
          console.error(e);
        }
        const currentUser = users.find(
          (user: { id: number; email: string; password: string; name: string }) =>
            user.email === credentials.email,
        );
        if (currentUser && currentUser.password === credentials.password) {
          const { password, ...userWithoutPass } = currentUser;

          return userWithoutPass as User;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
};
