// Adicionar um comentário explicativo no topo do arquivo

"use client"

import Script from "next/script"
import { useEffect, useRef, useState } from "react"

/**
 * Componente Google Tag Manager
 *
 * Para usar:
 * 1. Descomente o componente no app/layout.tsx
 * 2. Adicione seu ID GTM no formato "GTM-XXXXXXX"
 * 3. Opcionalmente, configure auth e preview se necessário
 */
interface TagManagerProps {
  gtmId?: string
  dataLayer?: Record<string, any>[]
  auth?: string
  preview?: string
}

export function TagManager({ gtmId, dataLayer = [], auth, preview }: TagManagerProps) {
  const dataLayerRef = useRef(dataLayer)
  const [enabled, setEnabled] = useState(!!gtmId)

  // Se não houver ID do GTM, não renderize nada
  if (!enabled) return null

  // Inicializar o dataLayer
  useEffect(() => {
    window.dataLayer = window.dataLayer || []
    if (dataLayerRef.current.length) {
      dataLayerRef.current.forEach((data) => {
        window.dataLayer.push(data)
      })
    }
    dataLayerRef.current = [] // Clear the ref after pushing to dataLayer to avoid duplicate pushes
  }, [gtmId, enabled]) // Only run when gtmId changes

  // Construir parâmetros adicionais se fornecidos
  const gtmAuth = auth ? `&gtm_auth=${auth}` : ""
  const gtmPreview = preview ? `&gtm_preview=${preview}` : ""

  return (
    <>
      {/* Script do Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl+'${gtmAuth}${gtmPreview}';f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />
      {/* Noscript fallback para o Google Tag Manager */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}${gtmAuth}${gtmPreview}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="GTM"
        />
      </noscript>
    </>
  )
}
