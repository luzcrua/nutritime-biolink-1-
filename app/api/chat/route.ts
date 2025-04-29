import { type NextRequest, NextResponse } from "next/server"

// Configuração do modelo Groq
const GROQ_API_KEY = meta.env.GROQ_API_KEY || ""
const GROQ_MODEL = "compound-beta-mini" // Modelo mais recente e capaz do Groq

// Prompts internos para melhorar as respostas
const SYSTEM_PROMPT = `
Você é um assistente virtual especializado em nutrição chamado NutriBot, trabalhando para o NutriTime.

DIRETRIZES DE RESPOSTA:
- Forneça informações precisas e baseadas em evidências científicas sobre nutrição.
- Mantenha um tom conversacional, natural e humano.
- NUNCA use asteriscos (*) ou formatações especiais em suas respostas.
- NUNCA use emojis.
- Personalize suas respostas com base no contexto da conversa.
- Seja conciso e direto.
- Limite caracteres por respostas a no máximo 200 caracteres, mas finalizando o raciocínio da resposta.
- Caso seja uma pergunta técnica que exige mais caracteres, aí você pode usar até 300 caracteres pra finalizar o raciocício da resposta.
- Não deixe resposta faltando sem finalizar corretamente o raciocício da resposta.
- Use frases curtas e diretas, como um nutricionista falando com um cliente.
- Use parágrafos curtos com espaçamento adequado para facilitar a leitura.
- Quando apropriado, sugira próximos passos práticos.
- Nunca invente informações médicas ou nutricionais.
- Qualquer uma das respostas sempre faça um CTA pra ele fazer um agendamento para ter um atendimento mais personalizado, por isso você pode indicar https://wa.me/5582987125315.
- Não mencione que você é uma IA ou um modelo de linguagem.

CONHECIMENTO ESPECIALIZADO:
- Planos alimentares personalizados
- Nutrição clínica e esportiva
- Alergias e intolerâncias alimentares
- Dietas específicas (vegetariana, vegana, cetogênica, etc.)
- Suplementação nutricional
- Comportamento alimentar
- Transtornos alimentares (apenas para reconhecimento e encaminhamento)
- Nutrição para condições específicas (diabetes, hipertensão, etc.)
- Hábitos alimentares saudáveis
- Preparação de alimentos e receitas saudáveis

LIMITAÇÕES:
- Não forneça diagnósticos médicos.
- Recomende consulta com profissional de saúde para questões médicas específicas.
- Não prescreva medicamentos ou tratamentos.
- Não substitua o aconselhamento profissional personalizado.

Responda como um nutricionista experiente e atencioso, focado em ajudar o usuário a alcançar seus objetivos de saúde através da alimentação adequada.
`

export async function POST(request: NextRequest) {
  try {
    const { message, isReturningUser } = await request.json()

    // Verificar se a mensagem está presente
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Mensagem inválida" }, { status: 400 })
    }

    // Se não houver API key configurada, retorne um erro claro
    if (!GROQ_API_KEY) {
      console.error("Chave de API não configurada.")
      return NextResponse.json(
        {
          error: "Configuração de API ausente. Por favor, configure a variável de ambiente GROQ_API_KEY.",
        },
        { status: 500 },
      )
    }

    try {
      console.log("Enviando requisição para a API do Groq...")

      // Implementação da chamada para a API do Groq
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: `${isReturningUser ? "[Usuário retornando hoje] " : ""}${message}` },
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`Erro na API do Groq: ${response.status}`, errorText)
        throw new Error(`Erro na API do Groq: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      console.log("Resposta recebida da API do Groq")

      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        console.error("Formato de resposta inesperado da API do Groq:", data)
        throw new Error("Formato de resposta inesperado da API do Groq")
      }

      return NextResponse.json({
        response: data.choices[0].message.content,
      })
    } catch (error) {
      console.error("Erro ao chamar a API:", error)
      return NextResponse.json(
        {
          error: "Erro ao processar a solicitação na API. Por favor, tente novamente mais tarde.",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Erro ao processar a requisição:", error)
    return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 400 })
  }
}
