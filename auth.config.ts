import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect('http://localhost:3001/dashboard');
      }
      return true;
    },
  },
  providers: [Credentials({})], // Add providers with an empty array for now
} satisfies NextAuthConfig;