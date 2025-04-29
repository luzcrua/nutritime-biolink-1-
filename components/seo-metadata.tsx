"use client"

import Head from "next/head"
import { useRouter } from "next/router"

interface SEOProps {
  title?: string
  description?: string
  canonicalUrl?: string
  ogType?: string
  ogImage?: string
  twitterCard?: string
  twitterCreator?: string
  jsonLd?: Record<string, any>
}

export default function SEOMetadata({
  title = "NutriTime - Cronograma Nutricional Interativo",
  description = "Acompanhe sua jornada nutricional com o NutriTime. Planos alimentares personalizados, acompanhamento profissional e resultados reais.",
  canonicalUrl,
  ogType = "website",
  ogImage = "/images/nutritime-og-image.jpg",
  twitterCard = "summary_large_image",
  twitterCreator = "@nutritime",
  jsonLd,
}: SEOProps) {
  const router = useRouter()
  const fullUrl = canonicalUrl || `https://nutritime.com.br${router.asPath}`

  // Schema.org JSON-LD para melhor SEO
  const defaultJsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: "NutriTime",
    description: description,
    image: ogImage,
    url: "https://nutritime.com.br",
    telephone: "+5511999999999",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Paulista, 1000",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      postalCode: "01310-100",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -23.5505,
      longitude: -46.6333,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/nutritime",
      "https://www.instagram.com/nutritime",
      "https://www.youtube.com/nutritime",
    ],
  }

  const finalJsonLd = jsonLd || defaultJsonLd

  return (
    <Head>
      {/* Metadados básicos */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="NutriTime" />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:creator" content={twitterCreator} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Metadados adicionais */}
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="theme-color" content="#10b981" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* Preconnect para domínios externos */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* JSON-LD para Rich Snippets */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(finalJsonLd) }} />
    </Head>
  )
}
