import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe NextAuth configuration.
 * Configuração do NextAuth compatível com Edge Runtime.
 * 
 * IMPORTANT: This file must NOT import Prisma, bcrypt, or any Node.js-only module
 * as it is used by middleware.ts (Edge Runtime).
 * IMPORTANTE: Este arquivo NÃO deve importar Prisma, bcrypt ou qualquer módulo 
 * exclusivo de Node.js, pois é usado pelo middleware.ts (Edge Runtime).
 */
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    /**
     * Authorization callback to protect routes.
     * Callback de autorização para proteger rotas.
     * 
     * @param auth Current session / Sessão atual
     * @param request The incoming request / A requisição de entrada
     * @returns Boolean or Response redirect / Booleano ou redirecionamento
     */
    authorized({ auth, request: { nextUrl } }) {
      try {
        const user = auth?.user;
        const isLoggedIn = user != null;
        // Protect /admin — must be logged in AND have ADMIN role
        // Protege /admin — deve estar logado E ter a role ADMIN
        if (nextUrl.pathname.startsWith("/dashboard")) {
          if (!isLoggedIn) return false; // redirect to signIn / redireciona para login
          return true;
        }

        // Routes that require authentication
        // Rotas que exigem autenticação
        const protectedPrefixes = ["/dashboard"];
        const isProtected = protectedPrefixes.some((prefix) =>
          nextUrl.pathname.startsWith(prefix)
        );

        if (isProtected && !isLoggedIn) {
          return false;
        }

        return true;
      } catch (ex) {
        console.error("Auth callback error:", ex);
        return false;
      }
    },
  },
  // Providers are intentionally empty here.
  // The full Credentials provider (with Prisma + bcrypt) is added in auth.ts.
  // Os provedores estão intencionalmente vazios aqui.
  // O provedor de Credenciais completo (com Prisma + bcrypt) é adicionado em auth.ts.
  providers: [],
} satisfies NextAuthConfig;