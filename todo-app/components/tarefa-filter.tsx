"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Search, Filter } from "lucide-react"

/**
 * COMMIT 9: Componente de filtros
 *
 * Permite filtrar tarefas por status e buscar por título
 * Interface intuitiva com ícones e labels descritivos
 */

interface TarefaFilterProps {
  filtroStatus: string
  onFiltroChange: (status: string) => void
  termoBusca: string
  onBuscaChange: (termo: string) => void
}

export function TarefaFilter({ filtroStatus, onFiltroChange, termoBusca, onBuscaChange }: TarefaFilterProps) {
  /**
   * Opções de filtro por status
   */
  const opcoesStatus = [
    { value: "TODAS", label: "Todas as Tarefas" },
    { value: "PENDENTE", label: "Pendentes" },
    { value: "EM_ANDAMENTO", label: "Em Andamento" },
    { value: "CONCLUIDA", label: "Concluídas" },
  ]

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      {/* Campo de Busca */}
      <div className="flex-1 space-y-2">
        <Label htmlFor="busca" className="text-sm font-medium text-gray-700">
          Buscar Tarefas
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            id="busca"
            type="text"
            placeholder="Digite o título da tarefa..."
            value={termoBusca}
            onChange={(e) => onBuscaChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Filtro por Status */}
      <div className="w-full sm:w-64 space-y-2">
        <Label htmlFor="filtro-status" className="text-sm font-medium text-gray-700">
          Filtrar por Status
        </Label>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
          <Select value={filtroStatus} onValueChange={onFiltroChange}>
            <SelectTrigger className="pl-10">
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              {opcoesStatus.map((opcao) => (
                <SelectItem key={opcao.value} value={opcao.value}>
                  {opcao.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
