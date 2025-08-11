"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { TarefaForm } from "@/components/tarefa-form"
import { TarefaList } from "@/components/tarefa-list"
import { TarefaFilter } from "@/components/tarefa-filter"
import { TarefaStats } from "@/components/tarefa-stats"

/**
 * COMMIT 6: Página principal do frontend
 *
 * Componente principal que gerencia o estado da aplicação
 * Integra todos os componentes de tarefas
 */

export interface Tarefa {
  id?: number
  titulo: string
  descricao: string
  status: "PENDENTE" | "EM_ANDAMENTO" | "CONCLUIDA"
  dataCriacao?: string
  dataAtualizacao?: string
}

export interface Estatisticas {
  pendentes: number
  emAndamento: number
  concluidas: number
  total: number
}

const API_BASE_URL = "http://localhost:8080/api/tarefas"

export default function TodoApp() {
  // Estados da aplicação
  const [tarefas, setTarefas] = useState<Tarefa[]>([])
  const [estatisticas, setEstatisticas] = useState<Estatisticas>({
    pendentes: 0,
    emAndamento: 0,
    concluidas: 0,
    total: 0,
  })
  const [filtroStatus, setFiltroStatus] = useState<string>("TODAS")
  const [termoBusca, setTermoBusca] = useState<string>("")
  const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(false)
  const [tarefaEditando, setTarefaEditando] = useState<Tarefa | null>(null)
  const [carregando, setCarregando] = useState<boolean>(true)

  // Carrega dados iniciais
  useEffect(() => {
    carregarTarefas()
    carregarEstatisticas()
  }, [])

  // Recarrega dados quando filtros mudam
  useEffect(() => {
    carregarTarefas()
  }, [filtroStatus, termoBusca])

  /**
   * Carrega a lista de tarefas do backend
   */
  const carregarTarefas = async () => {
    try {
      setCarregando(true)
      let url = API_BASE_URL
      const params = new URLSearchParams()

      if (filtroStatus !== "TODAS") {
        params.append("status", filtroStatus)
      }

      if (termoBusca.trim()) {
        params.append("titulo", termoBusca)
      }

      if (params.toString()) {
        url += `?${params.toString()}`
      }

      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setTarefas(data)
      } else {
        console.error("Erro ao carregar tarefas")
      }
    } catch (error) {
      console.error("Erro na requisição:", error)
    } finally {
      setCarregando(false)
    }
  }

  /**
   * Carrega as estatísticas das tarefas
   */
  const carregarEstatisticas = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/estatisticas`)
      if (response.ok) {
        const data = await response.json()
        setEstatisticas(data)
      }
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error)
    }
  }

  /**
   * Cria uma nova tarefa
   */
  const criarTarefa = async (tarefa: Tarefa) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tarefa),
      })

      if (response.ok) {
        await carregarTarefas()
        await carregarEstatisticas()
        setMostrarFormulario(false)
      } else {
        console.error("Erro ao criar tarefa")
      }
    } catch (error) {
      console.error("Erro na requisição:", error)
    }
  }

  /**
   * Atualiza uma tarefa existente
   */
  const atualizarTarefa = async (id: number, tarefa: Tarefa) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tarefa),
      })

      if (response.ok) {
        await carregarTarefas()
        await carregarEstatisticas()
        setTarefaEditando(null)
        setMostrarFormulario(false)
      } else {
        console.error("Erro ao atualizar tarefa")
      }
    } catch (error) {
      console.error("Erro na requisição:", error)
    }
  }

  /**
   * Exclui uma tarefa
   */
  const excluirTarefa = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir esta tarefa?")) {
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await carregarTarefas()
        await carregarEstatisticas()
      } else {
        console.error("Erro ao excluir tarefa")
      }
    } catch (error) {
      console.error("Erro na requisição:", error)
    }
  }

  /**
   * Inicia a edição de uma tarefa
   */
  const iniciarEdicao = (tarefa: Tarefa) => {
    setTarefaEditando(tarefa)
    setMostrarFormulario(true)
  }

  /**
   * Cancela a edição/criação
   */
  const cancelarFormulario = () => {
    setMostrarFormulario(false)
    setTarefaEditando(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Cabeçalho */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gerenciador de Tarefas</h1>
          <p className="text-gray-600">Organize suas tarefas de forma eficiente</p>
        </div>

        {/* Estatísticas */}
        <TarefaStats estatisticas={estatisticas} />

        {/* Controles */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <TarefaFilter
              filtroStatus={filtroStatus}
              onFiltroChange={setFiltroStatus}
              termoBusca={termoBusca}
              onBuscaChange={setTermoBusca}
            />
          </div>

          <Button onClick={() => setMostrarFormulario(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Nova Tarefa
          </Button>
        </div>

        {/* Formulário de Tarefa */}
        {mostrarFormulario && (
          <div className="mb-6">
            <TarefaForm
              tarefa={tarefaEditando}
              onSubmit={tarefaEditando ? (tarefa) => atualizarTarefa(tarefaEditando.id!, tarefa) : criarTarefa}
              onCancel={cancelarFormulario}
            />
          </div>
        )}

        {/* Lista de Tarefas */}
        <TarefaList tarefas={tarefas} carregando={carregando} onEdit={iniciarEdicao} onDelete={excluirTarefa} />
      </div>
    </div>
  )
}
