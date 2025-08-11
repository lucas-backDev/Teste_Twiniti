"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, AlertCircle, BarChart3 } from "lucide-react"
import type { Estatisticas } from "@/app/page"

/**
 * COMMIT 10: Componente de estatísticas
 *
 * Exibe cards com estatísticas das tarefas
 * Mostra contadores por status e total geral
 */

interface TarefaStatsProps {
  estatisticas: Estatisticas
}

export function TarefaStats({ estatisticas }: TarefaStatsProps) {
  /**
   * Configuração dos cards de estatísticas
   */
  const statsConfig = [
    {
      title: "Total de Tarefas",
      value: estatisticas.total,
      icon: BarChart3,
      color: "text-gray-600",
      bgColor: "bg-gray-100",
      description: "Todas as tarefas",
    },
    {
      title: "Pendentes",
      value: estatisticas.pendentes,
      icon: AlertCircle,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      description: "Aguardando início",
    },
    {
      title: "Em Andamento",
      value: estatisticas.emAndamento,
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      description: "Sendo executadas",
    },
    {
      title: "Concluídas",
      value: estatisticas.concluidas,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
      description: "Finalizadas",
    },
  ]

  /**
   * Calcula a porcentagem de conclusão
   */
  const calcularPorcentagemConclusao = () => {
    if (estatisticas.total === 0) return 0
    return Math.round((estatisticas.concluidas / estatisticas.total) * 100)
  }

  return (
    <div className="mb-8">
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statsConfig.map((stat, index) => {
          const IconComponent = stat.icon

          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <IconComponent className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Barra de Progresso */}
      {estatisticas.total > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Progresso Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {estatisticas.concluidas} de {estatisticas.total} tarefas concluídas
                </span>
                <span className="font-medium text-gray-900">{calcularPorcentagemConclusao()}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${calcularPorcentagemConclusao()}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
