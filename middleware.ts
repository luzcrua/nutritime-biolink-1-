import { NextResponse, type NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Obter a resposta
  const response = NextResponse.next()

  // Adicionar headers de segurança

  // Content-Security-Policy - Restringe quais recursos podem ser carregados
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; connect-src 'self' https://api.groq.com https://www.google-analytics.com; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; font-src 'self' data:; frame-src 'self';",
  )

  // X-XSS-Protection - Proteção contra XSS em navegadores mais antigos
  response.headers.set("X-XSS-Protection", "1; mode=block")

  // X-Frame-Options - Previne clickjacking
  response.headers.set("X-Frame-Options", "SAMEORIGIN")

  // X-Content-Type-Options - Previne MIME type sniffing
  response.headers.set("X-Content-Type-Options", "nosniff")

  // Referrer-Policy - Controla quanta informação de referência é incluída
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")

  // Permissions-Policy - Controla quais recursos o navegador pode usar
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()")

  // Strict-Transport-Security - Força HTTPS
  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload")

  return response
}

// Configurar quais caminhos devem passar pelo middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (arquivos estáticos)
     * - _next/image (otimização de imagens)
     * - favicon.ico (favicon)
     * - images/ (imagens)
     */
    "/((?!_next/static|_next/image|favicon.ico|images/).*)",
  ],
}
