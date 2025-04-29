"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Clipboard,
  Utensils,
  Calendar,
  BarChart,
  BookOpen,
  X,
  User,
  Share2,
  Users,
  Award,
  Download,
  FileText,
  Coffee,
  ShoppingCart,
  CheckCircle,
  PieChart,
  Heart,
  Youtube,
  Instagram,
  Podcast,
  MessageCircle,
  CalendarClock,
  Video,
  Lightbulb,
  Sparkles,
  ArrowRight,
  Star,
  Gift,
  ThumbsUp,
  Phone,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"

interface Phase {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  color: string
  details: string
  links: { text: string; url: string; icon: React.ReactNode }[]
  additionalContent?: React.ReactNode
}

const phases: Phase[] = [
  {
    id: 1,
    title: "Avaliação Inicial",
    description: "Análise completa do seu perfil nutricional",
    icon: <Clipboard className="h-6 w-6" />,
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
    details:
      "Nossa avaliação inicial inclui análise de composição corporal, histórico alimentar, preferências e restrições, além de exames laboratoriais quando necessário. Tudo para criar um plano personalizado para você.",
    links: [
      { text: "Agendar Avaliação", url: "#agendar", icon: <Calendar className="h-4 w-4 mr-2" /> },
      { text: "Preparação para Consulta", url: "#preparacao", icon: <FileText className="h-4 w-4 mr-2" /> },
      { text: "Formulário Pré-Consulta", url: "#formulario", icon: <Download className="h-4 w-4 mr-2" /> },
    ],
    additionalContent: (
      <div className="mt-4 bg-emerald-50 p-4 rounded-lg">
        <h4 className="font-medium text-emerald-700 mb-2">O que incluímos na avaliação:</h4>
        <ul className="space-y-2">
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
            <span>Análise de composição corporal (% de gordura, massa muscular)</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
            <span>Avaliação de hábitos alimentares e estilo de vida</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
            <span>Identificação de alergias e intolerâncias alimentares</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
            <span>Análise de exames laboratoriais (quando disponíveis)</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 2,
    title: "Sobre o Nutricionista",
    description: "Conheça nosso especialista em nutrição",
    icon: <User className="h-6 w-6" />,
    color: "bg-cyan-100 text-cyan-700 border-cyan-200",
    details:
      "Dr. Carlos Silva é nutricionista clínico e esportivo com mais de 10 anos de experiência. Especializado em nutrição funcional e comportamental, ele combina ciência e prática para desenvolver planos alimentares personalizados que se adaptam ao estilo de vida de cada paciente.",
    links: [
      { text: "Formação e Especialidades", url: "#formacao", icon: <Award className="h-4 w-4 mr-2" /> },
      { text: "Artigos Publicados", url: "#artigos", icon: <FileText className="h-4 w-4 mr-2" /> },
      { text: "Agendar Consulta", url: "#consulta", icon: <Calendar className="h-4 w-4 mr-2" /> },
    ],
    additionalContent: (
      <div className="mt-4 flex flex-col space-y-4">
        <div className="bg-cyan-50 p-4 rounded-lg">
          <h4 className="font-medium text-cyan-700 mb-2">Especialidades:</h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center bg-white p-2 rounded border border-cyan-200">
              <Heart className="h-4 w-4 text-cyan-500 mr-2" />
              <span className="text-sm">Nutrição Clínica</span>
            </div>
            <div className="flex items-center bg-white p-2 rounded border border-cyan-200">
              <PieChart className="h-4 w-4 text-cyan-500 mr-2" />
              <span className="text-sm">Nutrição Esportiva</span>
            </div>
            <div className="flex items-center bg-white p-2 rounded border border-cyan-200">
              <Lightbulb className="h-4 w-4 text-cyan-500 mr-2" />
              <span className="text-sm">Nutrição Funcional</span>
            </div>
            <div className="flex items-center bg-white p-2 rounded border border-cyan-200">
              <Coffee className="h-4 w-4 text-cyan-500 mr-2" />
              <span className="text-sm">Reeducação Alimentar</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "Plano Alimentar",
    description: "Desenvolvimento do seu plano nutricional personalizado",
    icon: <Utensils className="h-6 w-6" />,
    color: "bg-blue-100 text-blue-700 border-blue-200",
    details:
      "Com base na sua avaliação, desenvolvemos um plano alimentar personalizado que respeita suas preferências e necessidades. Incluímos receitas, lista de compras e orientações para refeições fora de casa.",
    links: [
      { text: "Exemplo de Plano", url: "#exemplo-plano", icon: <FileText className="h-4 w-4 mr-2" /> },
      { text: "Receitas Recomendadas", url: "#receitas", icon: <Coffee className="h-4 w-4 mr-2" /> },
      { text: "Lista de Compras", url: "#compras", icon: <ShoppingCart className="h-4 w-4 mr-2" /> },
    ],
    additionalContent: (
      <div className="mt-4">
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <h4 className="font-medium text-blue-700 mb-2">Seu plano inclui:</h4>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
              <span>Cardápio personalizado para 14 dias</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
              <span>Receitas detalhadas com valores nutricionais</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
              <span>Lista de compras semanal organizada por seções</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
              <span>Guia para refeições em restaurantes e viagens</span>
            </li>
          </ul>
        </div>
        <div className="bg-white border border-blue-200 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <h5 className="text-sm font-medium">Progresso do Plano</h5>
            <span className="text-xs text-blue-600 font-medium">Dia 5 de 14</span>
          </div>
          <Progress value={35} className="h-2 bg-blue-100" indicatorClassName="bg-blue-500" />
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: "Redes Sociais",
    description: "Acompanhe nosso conteúdo nas redes sociais",
    icon: <Share2 className="h-6 w-6" />,
    color: "bg-indigo-100 text-indigo-700 border-indigo-200",
    details:
      "Siga-nos nas redes sociais para dicas diárias de nutrição, receitas saudáveis, lives com especialistas e muito mais. Nosso conteúdo é desenvolvido para complementar seu plano alimentar e manter você motivado em sua jornada.",
    links: [
      { text: "Instagram", url: "#instagram", icon: <Instagram className="h-4 w-4 mr-2" /> },
      { text: "YouTube", url: "#youtube", icon: <Youtube className="h-4 w-4 mr-2" /> },
      { text: "Podcast", url: "#podcast", icon: <Podcast className="h-4 w-4 mr-2" /> },
      { text: "Newsletter Semanal", url: "#newsletter", icon: <MessageCircle className="h-4 w-4 mr-2" /> },
    ],
    additionalContent: (
      <div className="mt-4 space-y-4">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h4 className="font-medium text-indigo-700 mb-3">Conteúdo em destaque:</h4>
          <div className="space-y-3">
            <div className="bg-white p-3 rounded-lg border border-indigo-200">
              <div className="flex items-center">
                <Youtube className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-sm font-medium">Vídeo novo</span>
              </div>
              <p className="text-xs mt-1 text-gray-600">5 receitas rápidas com proteína vegetal</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-indigo-200">
              <div className="flex items-center">
                <Instagram className="h-5 w-5 text-pink-500 mr-2" />
                <span className="text-sm font-medium">Live hoje</span>
              </div>
              <p className="text-xs mt-1 text-gray-600">Mitos e verdades sobre suplementação</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-indigo-200">
              <div className="flex items-center">
                <Podcast className="h-5 w-5 text-purple-500 mr-2" />
                <span className="text-sm font-medium">Novo episódio</span>
              </div>
              <p className="text-xs mt-1 text-gray-600">Nutrição e saúde mental: a conexão intestino-cérebro</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: "Acompanhamento Semanal",
    description: "Monitoramento contínuo do seu progresso",
    icon: <Calendar className="h-6 w-6" />,
    color: "bg-purple-100 text-purple-700 border-purple-200",
    details:
      "Realizamos acompanhamentos semanais para ajustar seu plano conforme necessário, responder dúvidas e garantir que você esteja no caminho certo. Oferecemos suporte por mensagens entre as consultas.",
    links: [
      { text: "Agendar Consulta", url: "#consulta", icon: <CalendarClock className="h-4 w-4 mr-2" /> },
      { text: "Enviar Dúvidas", url: "#duvidas", icon: <MessageCircle className="h-4 w-4 mr-2" /> },
      { text: "Registrar Medidas", url: "#medidas", icon: <FileText className="h-4 w-4 mr-2" /> },
    ],
    additionalContent: (
      <div className="mt-4">
        <div className="bg-purple-50 p-4 rounded-lg mb-4">
          <h4 className="font-medium text-purple-700 mb-2">Próximas consultas:</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-white p-3 rounded border border-purple-200">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-purple-500 mr-2" />
                <span className="text-sm">Consulta de Acompanhamento</span>
              </div>
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">15/05 - 14:00</span>
            </div>
            <div className="flex items-center justify-between bg-white p-3 rounded border border-purple-200">
              <div className="flex items-center">
                <Video className="h-4 w-4 text-purple-500 mr-2" />
                <span className="text-sm">Workshop Online</span>
              </div>
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">22/05 - 19:00</span>
            </div>
          </div>
        </div>
        <div className="bg-white border border-purple-200 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <h5 className="text-sm font-medium">Progresso Semanal</h5>
            <span className="text-xs text-purple-600 font-medium">3 de 4 metas</span>
          </div>
          <Progress value={75} className="h-2 bg-purple-100" indicatorClassName="bg-purple-500" />
        </div>
      </div>
    ),
  },
  {
    id: 6,
    title: "Workshops e Eventos",
    description: "Participe de nossos eventos educativos",
    icon: <Users className="h-6 w-6" />,
    color: "bg-pink-100 text-pink-700 border-pink-200",
    details:
      "Oferecemos workshops mensais sobre temas variados de nutrição e bem-estar. Nossos eventos incluem aulas de culinária saudável, palestras com especialistas e grupos de apoio para compartilhar experiências.",
    links: [
      { text: "Calendário de Eventos", url: "#eventos", icon: <Calendar className="h-4 w-4 mr-2" /> },
      { text: "Inscrição Workshop", url: "#workshop", icon: <FileText className="h-4 w-4 mr-2" /> },
      { text: "Aulas Gravadas", url: "#aulas", icon: <Video className="h-4 w-4 mr-2" /> },
    ],
    additionalContent: (
      <div className="mt-4">
        <div className="bg-pink-50 p-4 rounded-lg">
          <h4 className="font-medium text-pink-700 mb-3">Próximos eventos:</h4>
          <div className="space-y-3">
            <div className="bg-white p-3 rounded-lg border border-pink-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Coffee className="h-5 w-5 text-pink-500 mr-2" />
                  <span className="text-sm font-medium">Aula de Culinária</span>
                </div>
                <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded">18/05</span>
              </div>
              <p className="text-xs mt-1 text-gray-600">Pratos proteicos vegetarianos</p>
              <div className="mt-2 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 border-pink-200 text-pink-700 hover:bg-pink-50"
                >
                  Inscrever-se
                </Button>
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg border border-pink-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-pink-500 mr-2" />
                  <span className="text-sm font-medium">Palestra</span>
                </div>
                <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded">25/05</span>
              </div>
              <p className="text-xs mt-1 text-gray-600">Nutrição e Longevidade: o que a ciência diz</p>
              <div className="mt-2 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 border-pink-200 text-pink-700 hover:bg-pink-50"
                >
                  Inscrever-se
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 7,
    title: "Resultados Finais",
    description: "Análise dos resultados e ajustes para manutenção",
    icon: <BarChart className="h-6 w-6" />,
    color: "bg-amber-100 text-amber-700 border-amber-200",
    details:
      "Após o período inicial, analisamos os resultados obtidos e desenvolvemos estratégias para manutenção a longo prazo. Celebramos suas conquistas e planejamos os próximos passos da sua jornada nutricional.",
    links: [
      { text: "Histórico de Progresso", url: "#progresso", icon: <BarChart className="h-4 w-4 mr-2" /> },
      { text: "Plano de Manutenção", url: "#manutencao", icon: <FileText className="h-4 w-4 mr-2" /> },
      { text: "Agendar Reavaliação", url: "#reavaliacao", icon: <Calendar className="h-4 w-4 mr-2" /> },
    ],
    additionalContent: (
      <div className="mt-4">
        <div className="bg-amber-50 p-4 rounded-lg mb-4">
          <h4 className="font-medium text-amber-700 mb-3">Seus resultados:</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-3 rounded border border-amber-200">
              <div className="text-center">
                <span className="text-xs text-amber-600">Peso</span>
                <div className="flex items-center justify-center mt-1">
                  <span className="text-lg font-bold text-amber-700">-4.5kg</span>
                  <span className="text-xs text-green-500 ml-1">▼</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-3 rounded border border-amber-200">
              <div className="text-center">
                <span className="text-xs text-amber-600">% Gordura</span>
                <div className="flex items-center justify-center mt-1">
                  <span className="text-lg font-bold text-amber-700">-3.2%</span>
                  <span className="text-xs text-green-500 ml-1">▼</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-3 rounded border border-amber-200">
              <div className="text-center">
                <span className="text-xs text-amber-600">Energia</span>
                <div className="flex items-center justify-center mt-1">
                  <span className="text-lg font-bold text-amber-700">+60%</span>
                  <span className="text-xs text-green-500 ml-1">▲</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-3 rounded border border-amber-200">
              <div className="text-center">
                <span className="text-xs text-amber-600">Qualidade do Sono</span>
                <div className="flex items-center justify-center mt-1">
                  <span className="text-lg font-bold text-amber-700">+45%</span>
                  <span className="text-xs text-green-500 ml-1">▲</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white border border-amber-200 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <h5 className="text-sm font-medium">Progresso Geral</h5>
            <span className="text-xs text-amber-600 font-medium">85% concluído</span>
          </div>
          <Progress value={85} className="h-2 bg-amber-100" indicatorClassName="bg-amber-500" />
        </div>
      </div>
    ),
  },
  {
    id: 8,
    title: "Dicas Extras",
    description: "Conteúdo educativo e recursos complementares",
    icon: <BookOpen className="h-6 w-6" />,
    color: "bg-rose-100 text-rose-700 border-rose-200",
    details:
      "Oferecemos uma biblioteca de recursos educativos, incluindo e-books, vídeos e workshops sobre nutrição, preparação de alimentos e hábitos saudáveis para complementar seu plano alimentar.",
    links: [
      { text: "Biblioteca de Recursos", url: "#recursos", icon: <BookOpen className="h-4 w-4 mr-2" /> },
      { text: "E-books Gratuitos", url: "#ebooks", icon: <Download className="h-4 w-4 mr-2" /> },
      { text: "Inscrever-se na Newsletter", url: "#newsletter", icon: <MessageCircle className="h-4 w-4 mr-2" /> },
    ],
    additionalContent: (
      <div className="mt-4">
        <div className="bg-rose-50 p-4 rounded-lg">
          <h4 className="font-medium text-rose-700 mb-3">Recursos em destaque:</h4>
          <div className="space-y-3">
            <div className="bg-white p-3 rounded-lg border border-rose-200">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-rose-500 mr-2" />
                <span className="text-sm font-medium">E-book</span>
              </div>
              <p className="text-xs mt-1 text-gray-600">Guia Completo de Alimentação Anti-inflamatória</p>
              <div className="mt-2 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 border-rose-200 text-rose-700 hover:bg-rose-50"
                >
                  Download
                </Button>
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg border border-rose-200">
              <div className="flex items-center">
                <Video className="h-5 w-5 text-rose-500 mr-2" />
                <span className="text-sm font-medium">Vídeo Tutorial</span>
              </div>
              <p className="text-xs mt-1 text-gray-600">Como preparar marmitas saudáveis para a semana</p>
              <div className="mt-2 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 border-rose-200 text-rose-700 hover:bg-rose-50"
                >
                  Assistir
                </Button>
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg border border-rose-200">
              <div className="flex items-center">
                <Coffee className="h-5 w-5 text-rose-500 mr-2" />
                <span className="text-sm font-medium">Receitas</span>
              </div>
              <p className="text-xs mt-1 text-gray-600">Coletânea de 30 receitas low-carb</p>
              <div className="mt-2 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 border-rose-200 text-rose-700 hover:bg-rose-50"
                >
                  Acessar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 9,
    title: "Jornada Completa",
    description: "Parabéns por completar sua jornada nutricional!",
    icon: <Award className="h-6 w-6" />,
    color: "bg-green-100 text-green-700 border-green-200",
    details:
      "Você chegou ao final da sua jornada inicial com o NutriTime! Mas lembre-se: a nutrição saudável é um compromisso para a vida toda. Continue aplicando o que aprendeu e mantenha contato para atualizações periódicas do seu plano.",
    links: [
      { text: "Depoimento", url: "#depoimento", icon: <MessageCircle className="h-4 w-4 mr-2" /> },
      { text: "Programa de Fidelidade", url: "#fidelidade", icon: <Award className="h-4 w-4 mr-2" /> },
      { text: "Indicar um Amigo", url: "#indicacao", icon: <User className="h-4 w-4 mr-2" /> },
    ],
    additionalContent: (
      <div className="mt-4">
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <Sparkles className="h-10 w-10 text-green-500 mx-auto mb-2" />
          <h4 className="font-bold text-green-700 mb-2">Parabéns!</h4>
          <p className="text-sm text-green-600 mb-4">
            Você completou sua jornada nutricional inicial com sucesso! Estamos orgulhosos do seu progresso e
            comprometimento.
          </p>
          <div className="bg-white border border-green-200 rounded-lg p-3 mb-4">
            <div className="flex justify-between items-center mb-2">
              <h5 className="text-sm font-medium">Jornada Completa</h5>
              <span className="text-xs text-green-600 font-medium">100%</span>
            </div>
            <Progress value={100} className="h-2 bg-green-100" indicatorClassName="bg-green-500" />
          </div>

          {/* CTA para WhatsApp - Botão chamativo */}
          <a
            href="https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta%20gratuita%20com%20o%20NutriTime."
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 opacity-75 blur-lg rounded-lg transform transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"></div>
              <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-lg p-4 flex items-center justify-center space-x-2 transform transition-all duration-300 group-hover:scale-105">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span className="text-white font-bold text-lg">Agendar Consulta Gratuita</span>
                <ArrowRight className="text-white ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </a>
        </div>
      </div>
    ),
  },
  {
    id: 10,
    title: "Programa de Fidelidade",
    description: "Recompensas exclusivas para clientes fiéis",
    icon: <Star className="h-6 w-6" />,
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
    details:
      "Nosso programa de fidelidade recompensa seu compromisso com a saúde. Ganhe pontos a cada consulta, indicação de amigos e metas alcançadas. Troque seus pontos por consultas gratuitas, produtos parceiros e muito mais.",
    links: [
      { text: "Como Funciona", url: "#como-funciona", icon: <Lightbulb className="h-4 w-4 mr-2" /> },
      { text: "Meus Pontos", url: "#meus-pontos", icon: <Star className="h-4 w-4 mr-2" /> },
      { text: "Resgatar Recompensas", url: "#recompensas", icon: <Gift className="h-4 w-4 mr-2" /> },
    ],
    additionalContent: (
      <div className="mt-4">
        <div className="bg-yellow-50 p-4 rounded-lg mb-4">
          <h4 className="font-medium text-yellow-700 mb-3">Seus benefícios:</h4>
          <div className="space-y-3">
            <div className="flex items-start">
              <ThumbsUp className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-sm font-medium">Consultas Bônus</span>
                <p className="text-xs text-gray-600 mt-1">
                  A cada 5 consultas, ganhe 1 consulta de acompanhamento gratuita
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Gift className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-sm font-medium">Descontos Exclusivos</span>
                <p className="text-xs text-gray-600 mt-1">
                  Acesso a descontos especiais em produtos e serviços parceiros
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Star className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-sm font-medium">Acesso VIP</span>
                <p className="text-xs text-gray-600 mt-1">
                  Prioridade no agendamento e acesso antecipado a novos programas
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white border border-yellow-200 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <h5 className="text-sm font-medium">Seus Pontos</h5>
            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-medium">750 pts</span>
          </div>
          <Progress value={75} className="h-2 bg-yellow-100" indicatorClassName="bg-yellow-500" />
        </div>
      </div>
    ),
  },
  {
    id: 11,
    title: "Suporte Contínuo",
    description: "Estamos sempre aqui para ajudar você",
    icon: <Phone className="h-6 w-6" />,
    color: "bg-teal-100 text-teal-700 border-teal-200",
    details:
      "Nossa equipe está disponível para ajudar você em cada etapa da sua jornada nutricional. Oferecemos diversos canais de suporte para garantir que você nunca se sinta sozinho em sua busca por uma vida mais saudável.",
    links: [
      { text: "Fale Conosco", url: "#contato", icon: <Phone className="h-4 w-4 mr-2" /> },
      { text: "Perguntas Frequentes", url: "#faq", icon: <MessageCircle className="h-4 w-4 mr-2" /> },
      { text: "Agendar Consulta", url: "#agendar", icon: <Calendar className="h-4 w-4 mr-2" /> },
    ],
    additionalContent: (
      <div className="mt-4">
        <div className="bg-teal-50 p-4 rounded-lg">
          <h4 className="font-medium text-teal-700 mb-3">Canais de atendimento:</h4>
          <div className="space-y-3">
            <div className="bg-white p-3 rounded-lg border border-teal-200">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-teal-500 mr-2" />
                <span className="text-sm font-medium">WhatsApp</span>
              </div>
              <p className="text-xs mt-1 text-gray-600">Atendimento rápido para dúvidas e agendamentos</p>
              <div className="mt-2 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 border-teal-200 text-teal-700 hover:bg-teal-50"
                >
                  Conversar
                </Button>
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg border border-teal-200">
              <div className="flex items-center">
                <MessageCircle className="h-5 w-5 text-teal-500 mr-2" />
                <span className="text-sm font-medium">E-mail</span>
              </div>
              <p className="text-xs mt-1 text-gray-600">Para dúvidas mais detalhadas e envio de documentos</p>
              <div className="mt-2 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 border-teal-200 text-teal-700 hover:bg-teal-50"
                >
                  Enviar E-mail
                </Button>
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg border border-teal-200">
              <div className="flex items-center">
                <Video className="h-5 w-5 text-teal-500 mr-2" />
                <span className="text-sm font-medium">Consulta Online</span>
              </div>
              <p className="text-xs mt-1 text-gray-600">Atendimento remoto com a mesma qualidade do presencial</p>
              <div className="mt-2 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 border-teal-200 text-teal-700 hover:bg-teal-50"
                >
                  Agendar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
]

export default function Timeline() {
  const [activePhase, setActivePhase] = useState<Phase | null>(null)
  const [lineProgress, setLineProgress] = useState(0)
  const timelineRef = useRef<HTMLDivElement>(null)
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([])
  const { toast } = useToast()
  const [reachedBottom, setReachedBottom] = useState(false)
  const [visiblePhases, setVisiblePhases] = useState<number[]>([])

  // Inicializar os refs para cada fase
  useEffect(() => {
    phaseRefs.current = Array(phases.length).fill(null)
  }, [])

  // Função para verificar se um elemento está visível na tela
  const isElementInView = (element: HTMLElement | null, offset = 0): boolean => {
    if (!element) return false

    const rect = element.getBoundingClientRect()
    return rect.top <= window.innerHeight - offset && rect.bottom >= 0 + offset
  }

  // Efeito para controlar o progresso da linha e a ativação das fases
  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        // Calcular o progresso da linha com base na posição da timeline
        const { top, height } = timelineRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const documentHeight = document.documentElement.scrollHeight
        const scrollPosition = window.scrollY

        // Verificar se chegamos ao final da página
        const isAtBottom = window.innerHeight + window.scrollY >= documentHeight - 100
        setReachedBottom(isAtBottom)

        // Começar do zero e aumentar gradualmente
        if (top < windowHeight) {
          // Ajuste para tornar a animação mais suave e gradual
          const scrollPosition = windowHeight - top
          const totalScrollDistance = windowHeight + height
          let scrollPercentage = Math.min(Math.max(scrollPosition / totalScrollDistance, 0), 1)

          // Se chegou ao final da página, garantir que a linha chegue até o final
          if (isAtBottom) {
            scrollPercentage = 1
          } else {
            // Calcular progresso baseado na posição de scroll relativa ao documento
            const timelineTop = timelineRef.current.offsetTop
            const timelineHeight = timelineRef.current.offsetHeight
            const scrollPositionRelative = window.scrollY - timelineTop + windowHeight / 2
            scrollPercentage = Math.min(Math.max(scrollPositionRelative / timelineHeight, 0), 1)
          }

          // Aplicar uma curva mais suave para a animação da linha
          setLineProgress(scrollPercentage * 100)

          // Atualizar fases visíveis
          const newVisiblePhases = phaseRefs.current
            .map((ref, index) => ({ ref, index }))
            .filter(({ ref }) => isElementInView(ref, windowHeight * 0.3))
            .map(({ index }) => index)

          setVisiblePhases(newVisiblePhases)
        } else {
          setLineProgress(0) // Resetar quando estiver fora da tela
          setVisiblePhases([])
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Cálculo inicial

    return () => window.removeEventListener("scroll", handleScroll)
  }, [reachedBottom])

  const handlePhaseClick = (phase: Phase) => {
    setActivePhase(phase)
  }

  const handleCloseModal = () => {
    setActivePhase(null)
  }

  const handleLinkClick = (text: string) => {
    toast({
      title: "Link clicado",
      description: `Você clicou em "${text}". Esta funcionalidade estará disponível em breve.`,
      duration: 3000,
    })
  }

  // Verificar se uma fase está ativa com base na sua visibilidade
  const isPhaseActive = (index: number): boolean => {
    // Uma fase está ativa se seu índice é menor ou igual ao progresso da linha
    const phaseThreshold = (index / (phases.length - 1)) * 100
    return lineProgress >= phaseThreshold
  }

  // Calcular a opacidade de uma fase com base no progresso
  const getPhaseOpacity = (index: number): number => {
    const phaseThreshold = (index / (phases.length - 1)) * 100
    const opacityDelta = lineProgress - phaseThreshold

    // Se a fase ainda não foi alcançada, opacidade mínima
    if (opacityDelta < -20) return 0.3
    // Se a fase foi alcançada há muito tempo, opacidade total
    if (opacityDelta > 20) return 1
    // Transição suave entre opacidade mínima e total
    return 0.3 + (0.7 * (opacityDelta + 20)) / 40
  }

  return (
    <div className="relative py-10" ref={timelineRef}>
      {/* Progress bar */}
      <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform md:-translate-x-1/2 rounded-full">
        <motion.div
          className="w-full bg-gradient-to-b from-teal-400 to-green-500 rounded-full"
          style={{ height: `${lineProgress}%` }}
          initial={{ height: 0 }}
          animate={{ height: `${lineProgress}%` }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </div>

      {/* Timeline items */}
      <div className="relative z-10">
        {phases.map((phase, index) => {
          // Calcular quando esta fase deve começar a aparecer
          const phaseActivationThreshold = (index / phases.length) * 100
          const isActive = lineProgress > phaseActivationThreshold
          const opacity = getPhaseOpacity(index)
          const isLastPhase = index === phases.length - 1
          const isSecondLastPhase = index === phases.length - 2

          return (
            <motion.div
              key={phase.id}
              ref={(el) => (phaseRefs.current[index] = el)}
              className={cn(
                "relative mb-16 md:mb-24",
                // No mobile: adicionar padding à esquerda para acomodar os ícones
                "pl-12 pr-4",
                // No desktop: alternar entre esquerda e direita
                index % 2 === 0 ? "md:ml-auto md:mr-[50%] md:pr-12 md:pl-4" : "md:mr-auto md:ml-[50%] md:pl-12 md:pr-4",
              )}
              initial={{ opacity: 0.3, y: 50 }}
              animate={{
                opacity: opacity,
                y: isActive ? 0 : 20,
              }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {/* Timeline node */}
              <div
                className={cn(
                  "absolute top-0 transform",
                  // Mobile: posicionar à esquerda da linha
                  "left-0 translate-x-[-50%]",
                  // Desktop: alternar entre esquerda e direita
                  index % 2 === 0 ? "md:left-auto md:right-0 md:translate-x-0" : "md:left-0 md:translate-x-0",
                )}
              >
                <motion.div
                  className={cn(
                    "rounded-full flex items-center justify-center border-2",
                    // Aumentar tamanho no mobile para melhor visibilidade
                    "w-10 h-10 md:w-12 md:h-12",
                    // Adicionar fundo branco para destacar do fundo
                    "bg-white",
                    phase.color,
                    isActive ? "scale-110" : "scale-100",
                    // Adicionar z-index para garantir que fique acima da linha
                    "z-10",
                  )}
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{
                    scale: isActive ? 1.1 : 0.8,
                    opacity: isActive ? 1 : 0.5,
                  }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  }}
                  whileHover={{ scale: 1.2 }}
                >
                  {phase.icon}
                </motion.div>
              </div>

              {/* Content card */}
              <motion.div
                className="ml-0 md:ml-6 bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-all duration-300 hover:shadow-xl"
                whileHover={{ scale: 1.03 }}
                onClick={() => handlePhaseClick(phase)}
              >
                <h3 className={cn("text-xl font-bold mb-2", phase.color.split(" ")[1])}>{phase.title}</h3>
                <p className="text-gray-600">{phase.description}</p>
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activePhase && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative overflow-y-auto max-h-[90vh]"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800" onClick={handleCloseModal}>
                <X className="h-6 w-6" />
              </button>

              <div className="flex items-center mb-4">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center mr-3", activePhase.color)}>
                  {activePhase.icon}
                </div>
                <h2 className="text-2xl font-bold">{activePhase.title}</h2>
              </div>

              <p className="text-gray-700 mb-6">{activePhase.details}</p>

              {activePhase.additionalContent}

              <div className="space-y-3 mt-6">
                {activePhase.links.map((link, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left"
                    onClick={() => handleLinkClick(link.text)}
                  >
                    {link.icon}
                    {link.text}
                  </Button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
