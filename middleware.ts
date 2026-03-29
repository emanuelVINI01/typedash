// middleware.ts
import NextAuth from "next-auth";
import { authConfig } from "@/src/auth.config";

// Inicializa o NextAuth com o config compatível com Edge
const { auth } = NextAuth(authConfig);

// Exporta a função 'auth' como default. 
// O Next.js reconhece o export default como a função de middleware.
export default auth;

export const config = {
  // Garante que o middleware rode apenas nestas rotas
  matcher: ["/dashboard/:path*"],
};