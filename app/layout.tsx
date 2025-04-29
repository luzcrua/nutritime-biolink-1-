import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NutriTime - Cronograma Nutricional Interativo",
  description:
    "Acompanhe sua jornada nutricional com o NutriTime. Planos alimentares personalizados, acompanhamento profissional e resultados reais.",
  keywords: "nutrição, nutricionista, plano alimentar, dieta, saúde, bem-estar, emagrecimento, consulta nutricional",
  authors: [{ name: "NutriTime" }],
  creator: "NutriTime",
  publisher: "NutriTime",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://nutritime.com.br"),
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/",
    },
  },
  openGraph: {
    title: "NutriTime - Cronograma Nutricional Interativo",
    description:
      "Acompanhe sua jornada nutricional com o NutriTime. Planos alimentares personalizados, acompanhamento profissional e resultados reais.",
    url: "https://nutritime.com.br",
    siteName: "NutriTime",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/images/nutritime-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NutriTime - Cronograma Nutricional Interativo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NutriTime - Cronograma Nutricional Interativo",
    description:
      "Acompanhe sua jornada nutricional com o NutriTime. Planos alimentares personalizados, acompanhamento profissional e resultados reais.",
    creator: "@nutritime",
    images: ["/images/nutritime-og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // O GTM ID está comentado para ser ativado no futuro
  // const gtmId = "SEU_GTM_ID_AQUI"; // Descomente esta linha e substitua pelo seu ID GTM quando estiver pronto

  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta name="theme-color" content="#10b981" />
      </head>
      <body className={inter.className}>
        {/* Descomente o código abaixo e adicione seu ID GTM quando estiver pronto */}
        {/* 
        <TagManager gtmId={gtmId} /> 
        */}
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
