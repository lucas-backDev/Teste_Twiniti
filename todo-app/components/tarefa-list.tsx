"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, CheckCircle, Clock, AlertCircle, Calendar } from "lucide-react"
import type { Tarefa } from "@/app/page"

/**
 * COMMIT 8: Componente de listagem de tarefas
 *
 * Exibe a lista de tarefas com opções de edição e exclusão
 * Inclui indicadores visuais de status e formatação de datas
 */

interface TarefaListProps {
  tarefas: Tarefa[]
  carregando: boolean
  onEdit: (tarefa: Tarefa) => void
  onDelete: (id: number) => void
}

export function TarefaList({ tarefas, carregando, onEdit, onDelete }: TarefaListProps) {
  /**
   * Obtém a configuração visual do status
   */
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "PENDENTE":
        return {
          label: "Pendente",
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          icon: AlertCircle,
          iconColor: "text-yellow-600",
        }
      case "EM_ANDAMENTO":
        return {
          label: "Em Andamento",
          color: "bg-blue-100 text-blue-800 border-blue-200",
          icon: Clock,
          iconColor: "text-blue-600",
        }
      case "CONCLUIDA":
        return {
          label: "Concluída",
          color: "bg-green-100 text-green-800 border-green-200",
          icon: CheckCircle,
          iconColor: "text-green-600",
        }
      default:
        return {
          label: status,
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: AlertCircle,
          iconColor: "text-gray-600",
        }
    }
  }

  /**
   * Formata a data para exibição
   */
  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  /**
   * Calcula há quanto tempo a tarefa foi criada
   */
  const calcularTempoDecorrido = (dataString: string) => {
    const agora = new Date()
    const dataTarefa = new Date(dataString)
    const diffMs = agora.getTime() - dataTarefa.getTime()
    const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const diffHoras = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutos = Math.floor(diffMs / (1000 * 60))

    if (diffDias > 0) {
      return `há ${diffDias} dia${diffDias > 1 ? "s" : ""}`
    } else if (diffHoras > 0) {
      return `há ${diffHoras} hora${diffHoras > 1 ? "s" : ""}`
    } else if (diffMinutos > 0) {
      return `há ${diffMinutos} minuto${diffMinutos > 1 ? "s" : ""}`
    } else {
      return "agora mesmo"
    }
  }

  // Estado de carregamento
  if (carregando) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  // Lista vazia
  if (tarefas.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <div className="text-gray-400 mb-4">
            <CheckCircle className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma tarefa encontrada</h3>
          <p className="text-gray-500">Crie sua primeira tarefa ou ajuste os filtros de busca.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {tarefas.map((tarefa) => {
        const statusConfig = getStatusConfig(tarefa.status)
        const StatusIcon = statusConfig.icon

        return (
          <Card key={tarefa.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  {/* Título e Status */}
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{tarefa.titulo}</h3>
                    <Badge className={`${statusConfig.color} border`}>
                      <StatusIcon className={`w-3 h-3 mr-1 ${statusConfig.iconColor}`} />
                      {statusConfig.label}
                    </Badge>
                  </div>

                  {/* Descrição */}
                  {tarefa.descricao && <p className="text-gray-600 mb-3 line-clamp-2">{tarefa.descricao}</p>}

                  {/* Informações de Data */}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Criada {tarefa.dataCriacao && calcularTempoDecorrido(tarefa.dataCriacao)}</span>
                    </div>
                    {tarefa.dataAtualizacao && tarefa.dataAtualizacao !== tarefa.dataCriacao && (
                      <div className="flex items-center gap-1">
                        <span>•</span>
                        <span>Atualizada {calcularTempoDecorrido(tarefa.dataAtualizacao)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(tarefa)}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => tarefa.id && onDelete(tarefa.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
