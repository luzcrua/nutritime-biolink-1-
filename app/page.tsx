import type { Metadata } from "next"
import Timeline from "@/components/timeline"
import ChatBot from "@/components/chat-bot"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "NutriTime - Cronograma Nutricional Interativo",
  description: "Acompanhe sua jornada nutricional com o NutriTime",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-green-300 to-teal-300 opacity-75 blur"></div>
              <div className="relative bg-white rounded-full p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-teal-600"
                >
                  <path d="M6.13 1L6 16a2 2 0 0 0 2 2h15" />
                  <path d="M1 6.13L16 6a2 2 0 0 1 2 2v15" />
                </svg>
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-teal-800 mb-2">NutriTime</h1>
          <p className="text-lg text-teal-600 max-w-2xl mx-auto">
            Sua jornada para uma vida mais saudável começa aqui. Explore nosso cronograma nutricional interativo e
            descubra como podemos te ajudar.
          </p>
        </header>

        <Timeline />

        <footer className="mt-20 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} NutriTime. Todos os direitos reservados.</p>
          <p className="mt-2">
            <a href="#termos" className="text-teal-600 hover:underline mx-2">
              Termos de Uso
            </a>
            <a href="#privacidade" className="text-teal-600 hover:underline mx-2">
              Política de Privacidade
            </a>
            <a href="#contato" className="text-teal-600 hover:underline mx-2">
              Contato
            </a>
          </p>
        </footer>
      </div>

      <ChatBot />
      <Toaster />
    </main>
  )
}
