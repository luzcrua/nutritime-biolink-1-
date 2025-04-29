"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, Loader2, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { useMobile } from "@/hooks/use-mobile"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

interface FrequentQuestion {
  id: string
  question: string
}

// Perguntas frequentes para sugestão
const frequentQuestions: FrequentQuestion[] = [
  { id: "q1", question: "Como funciona o plano alimentar?" },
  { id: "q2", question: "Quais alimentos devo evitar?" },
  { id: "q3", question: "Quantas refeições devo fazer por dia?" },
  { id: "q4", question: "Como agendar uma consulta?" },
]

// Função para gerar ID único
const generateId = () => Math.random().toString(36).substring(2, 9)

// Função para verificar se o usuário já visitou o site hoje
const hasVisitedToday = () => {
  const lastVisit = localStorage.getItem("lastVisit")
  if (!lastVisit) return false

  const lastVisitDate = new Date(lastVisit)
  const today = new Date()

  return (
    lastVisitDate.getDate() === today.getDate() &&
    lastVisitDate.getMonth() === today.getMonth() &&
    lastVisitDate.getFullYear() === today.getFullYear()
  )
}

// Função para gerar resposta usando o modelo Groq via API route
const generateGroqResponse = async (userMessage: string, isReturningUser: boolean): Promise<string> => {
  try {
    // Chamar nossa rota de API
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: userMessage,
        isReturningUser,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error(`Erro na API: ${response.status}`, errorData)
      throw new Error(`Erro na API: ${response.status}`)
    }

    const data = await response.json()
    return data.response
  } catch (error) {
    console.error("Erro ao gerar resposta:", error)
    return "Desculpe, tive um problema ao processar sua pergunta. Poderia tentar novamente?"
  }
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isReturningUser, setIsReturningUser] = useState(false)
  const [showPulse, setShowPulse] = useState(false)
  const [showGlow, setShowGlow] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const isMobile = useMobile()

  // Verificar se é um usuário que retorna no mesmo dia
  useEffect(() => {
    const returning = hasVisitedToday()
    setIsReturningUser(returning)

    // Atualizar a data da última visita
    localStorage.setItem("lastVisit", new Date().toISOString())

    // Mensagem inicial do chatbot
    setTimeout(() => {
      const initialMessage = returning
        ? "Que bom ver você novamente! Como posso ajudar com sua jornada nutricional hoje?"
        : "Olá! Sou o assistente do NutriTime. Como posso ajudar você hoje?"

      setMessages([
        {
          id: generateId(),
          content: initialMessage,
          role: "assistant",
          timestamp: new Date(),
        },
      ])
    }, 1000)

    // Configurar o efeito de pulso após alguns segundos
    const pulseTimer = setTimeout(() => {
      setShowPulse(true)
    }, 5000)

    // Configurar o efeito de brilho após alguns segundos
    const glowTimer = setTimeout(() => {
      setShowGlow(true)
    }, 8000)

    return () => {
      clearTimeout(pulseTimer)
      clearTimeout(glowTimer)
    }
  }, [])

  // Rolar para a mensagem mais recente
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setShowPulse(false)
    setShowGlow(false)
  }

  const handleSendMessage = async (e?: React.FormEvent, questionText?: string) => {
    e?.preventDefault()

    const messageText = questionText || input
    if (!messageText.trim()) return

    // Adicionar mensagem do usuário
    const userMessage: Message = {
      id: generateId(),
      content: messageText,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    try {
      // Simular digitação natural (tempo variável baseado no tamanho da mensagem)
      const typingDelay = Math.min(800 + Math.random() * 800, 2000)
      await new Promise((resolve) => setTimeout(resolve, typingDelay))

      // Gerar resposta usando o modelo Groq
      const response = await generateGroqResponse(messageText, isReturningUser)

      // Formatar a resposta para evitar asteriscos e garantir boa formatação
      const formattedResponse = response
        .replace(/\*/g, "") // Remover asteriscos
        .replace(/\n\n+/g, "\n\n") // Normalizar quebras de linha
        .trim()

      // Limitar o tamanho da resposta se não for uma pergunta técnica
      let finalResponse = formattedResponse
      if (formattedResponse.length > 200 && !isTechnicalQuestion(messageText)) {
        finalResponse = formattedResponse.substring(0, 200)
      }

      // Adicionar resposta do assistente
      const botMessage: Message = {
        id: generateId(),
        content: finalResponse,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Erro ao gerar resposta:", error)

      // Mensagem de erro
      const errorMessage: Message = {
        id: generateId(),
        content: "Desculpe, tive um problema ao processar sua pergunta. Poderia tentar novamente?",
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  // Função para verificar se é uma pergunta técnica
  const isTechnicalQuestion = (question: string): boolean => {
    const technicalKeywords = [
      "proteína",
      "carboidrato",
      "gordura",
      "vitamina",
      "mineral",
      "nutriente",
      "metabolismo",
      "dieta",
      "cetogênica",
      "low-carb",
      "jejum",
      "intermitente",
      "suplemento",
      "intolerância",
      "alergia",
      "celíaco",
      "diabetes",
      "hipertensão",
    ]

    return technicalKeywords.some((keyword) => question.toLowerCase().includes(keyword.toLowerCase()))
  }

  // Função para lidar com o clique em uma pergunta frequente
  const handleQuestionClick = (question: string) => {
    handleSendMessage(undefined, question)
  }

  return (
    <>
      {/* Botão do chat */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <div className="relative">
          {/* Efeito de brilho pulsante */}
          {showGlow && !isOpen && (
            <motion.div
              className="absolute inset-0 rounded-full bg-teal-400 opacity-30"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          )}

          {/* Efeito de pulso */}
          {showPulse && !isOpen && (
            <motion.div
              className="absolute -inset-2 rounded-full bg-teal-300 opacity-0"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            />
          )}

          <Button
            onClick={toggleChat}
            className={cn(
              "w-14 h-14 rounded-full shadow-lg relative z-10",
              isOpen ? "bg-red-500 hover:bg-red-600" : "bg-teal-500 hover:bg-teal-600",
            )}
          >
            {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
          </Button>
        </div>
      </motion.div>

      {/* Janela do chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cn(
              "fixed z-30 bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col",
              isMobile
                ? "inset-x-4 bottom-24 top-20" // Versão mobile: ocupa quase toda a tela
                : "bottom-24 right-6 w-full max-w-sm h-[500px]", // Versão desktop: tamanho fixo
            )}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Cabeçalho */}
            <div className="bg-gradient-to-r from-teal-500 to-green-500 p-4 text-white relative overflow-hidden">
              {/* Efeito de brilho no cabeçalho */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="w-32 h-32 bg-white opacity-10 rounded-full absolute"
                  animate={{
                    x: ["-100%", "200%"],
                    y: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    ease: "linear",
                  }}
                />
              </div>

              <div className="flex items-center relative z-10">
                <div className="bg-white bg-opacity-20 rounded-full p-2 mr-3">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h3 className="font-bold">NutriBot</h3>
                  <p className="text-xs text-teal-100">Assistente Nutricional</p>
                </div>
              </div>
            </div>

            {/* Mensagens - Agora com barra de rolagem visível */}
            <div
              className="flex-1 overflow-y-auto p-4 bg-gray-50 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#d1d5db transparent",
                msOverflowStyle: "auto",
              }}
            >
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={cn("mb-4 max-w-[80%]", message.role === "user" ? "ml-auto" : "mr-auto")}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className={cn(
                        "rounded-2xl p-3",
                        message.role === "user"
                          ? "bg-teal-500 text-white rounded-tr-none"
                          : "bg-white border border-gray-200 text-gray-700 rounded-tl-none",
                      )}
                    >
                      {message.content}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Perguntas frequentes - mostradas apenas no início da conversa */}
              {messages.length <= 1 && !isTyping && (
                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <p className="text-xs text-gray-500 mb-2">Perguntas frequentes:</p>
                  <div className="space-y-2">
                    {frequentQuestions.map((q) => (
                      <motion.div
                        key={q.id}
                        className="bg-white border border-gray-200 rounded-lg p-2 cursor-pointer hover:bg-gray-50 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleQuestionClick(q.question)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">{q.question}</span>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {isTyping && (
                <motion.div
                  className="flex items-center space-x-2 mb-4 max-w-[80%]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none p-3">
                    <div className="flex space-x-1">
                      <motion.div
                        className="w-2 h-2 rounded-full bg-teal-500"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 rounded-full bg-teal-500"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 rounded-full bg-teal-500"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Formulário de entrada */}
            <form onSubmit={handleSendMessage} className="p-3 border-t relative">
              <div className="flex items-center">
                <Input
                  type="text"
                  placeholder="Digite sua mensagem..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 rounded-r-none focus-visible:ring-teal-500"
                  disabled={isTyping}
                />

                <Button
                  type="submit"
                  className="rounded-l-none bg-teal-500 hover:bg-teal-600"
                  disabled={isTyping || !input.trim()}
                >
                  {isTyping ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
