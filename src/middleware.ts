import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  console.log("Middleware executado para:", req.nextUrl.pathname);

  // Pegando o token dos cookies
  const token = req.cookies.get("token")?.value;

  console.log("Token recebido no middleware:", token);

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url)); // Redireciona para a home se não houver token
  }

  try {
    // Verifica e decodifica o token
    const decoded = jwt.decode(token) as any;

    if (!decoded || !decoded.roles) {
      throw new Error("Token inválido ou sem roles");
    }

    const userRoles = decoded.roles;
    const pathname = req.nextUrl.pathname;

    // Definição das permissões por role
    const rolePermissions: Record<string, string[]> = {
      institution: ["/institution"],
      student: ["/student"],
      teacher: ["/teacher"],
    };

    // Verifica se o usuário tem alguma role que permite acessar a rota
    const hasAccess = Object.entries(rolePermissions).some(
      ([role, routes]) =>
        userRoles.includes(role) && routes.some((route) => pathname.startsWith(route))
    );

    if (!hasAccess) {
      console.log("Acesso negado para:", pathname);
      return NextResponse.redirect(new URL("/", req.url)); // Redireciona caso não tenha acesso
    }

    return NextResponse.next(); // Permite o acesso
  } catch (error) {
    console.error("Erro ao verificar token:", error);
    return NextResponse.redirect(new URL("/", req.url)); // Token inválido
  }
}

// Define as rotas protegidas
export const config = {
  matcher: ["/institution/:path*", "/student/:path*", "/teacher/:path*"],
};
