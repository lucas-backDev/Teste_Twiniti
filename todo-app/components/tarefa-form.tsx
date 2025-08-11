"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Save, X } from "lucide-react"
import type { Tarefa } from "@/app/page"

/**
 * COMMIT 7: Componente de formulário para tarefas
 *
 * Formulário reutilizável para criar e editar tarefas
 * Inclui validação e feedback visual
 */

interface TarefaFormProps {
  tarefa?: Tarefa | null
  onSubmit: (tarefa: Tarefa) => void
  onCancel: () => void
}

export function TarefaForm({ tarefa, onSubmit, onCancel }: TarefaFormProps) {
  // Estados do formulário
  const [titulo, setTitulo] = useState("")
  const [descricao, setDescricao] = useState("")
  const [status, setStatus] = useState<"PENDENTE" | "EM_ANDAMENTO" | "CONCLUIDA">("PENDENTE")
  const [erros, setErros] = useState<{ [key: string]: string }>({})

  // Preenche o formulário quando está editando
  useEffect(() => {
    if (tarefa) {
      setTitulo(tarefa.titulo || "")
      setDescricao(tarefa.descricao || "")
      setStatus(tarefa.status || "PENDENTE")
    } else {
      // Limpa o formulário para nova tarefa
      setTitulo("")
      setDescricao("")
      setStatus("PENDENTE")
    }
    setErros({})
  }, [tarefa])

  /**
   * Valida os dados do formulário
   */
  const validarFormulario = (): boolean => {
    const novosErros: { [key: string]: string } = {}

    if (!titulo.trim()) {
      novosErros.titulo = "O título é obrigatório"
    } else if (titulo.length > 100) {
      novosErros.titulo = "O título deve ter no máximo 100 caracteres"
    }

    if (descricao.length > 500) {
      novosErros.descricao = "A descrição deve ter no máximo 500 caracteres"
    }

    setErros(novosErros)
    return Object.keys(novosErros).length === 0
  }

  /**
   * Manipula o envio do formulário
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validarFormulario()) {
      return
    }

    const novaTarefa: Tarefa = {
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      status,
    }

    onSubmit(novaTarefa)
  }

  /**
   * Obtém a descrição do status
   */
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "PENDENTE":
        return "Pendente"
      case "EM_ANDAMENTO":
        return "Em Andamento"
      case "CONCLUIDA":
        return "Concluída"
      default:
        return status
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {tarefa ? "Editar Tarefa" : "Nova Tarefa"}
          <Button variant="ghost" size="sm" onClick={onCancel} className="text-gray-500 hover:text-gray-700">
            <X className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo Título */}
          <div className="space-y-2">
            <Label htmlFor="titulo">
              Título <span className="text-red-500">*</span>
            </Label>
            <Input
              id="titulo"
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Digite o título da tarefa"
              className={erros.titulo ? "border-red-500" : ""}
              maxLength={100}
            />
            {erros.titulo && <p className="text-sm text-red-500">{erros.titulo}</p>}
            <p className="text-xs text-gray-500">{titulo.length}/100 caracteres</p>
          </div>

          {/* Campo Descrição */}
          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Digite uma descrição para a tarefa (opcional)"
              className={erros.descricao ? "border-red-500" : ""}
              rows={3}
              maxLength={500}
            />
            {erros.descricao && <p className="text-sm text-red-500">{erros.descricao}</p>}
            <p className="text-xs text-gray-500">{descricao.length}/500 caracteres</p>
          </div>

          {/* Campo Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(value: any) => setStatus(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDENTE">{getStatusLabel("PENDENTE")}</SelectItem>
                <SelectItem value="EM_ANDAMENTO">{getStatusLabel("EM_ANDAMENTO")}</SelectItem>
                <SelectItem value="CONCLUIDA">{getStatusLabel("CONCLUIDA")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Botões de Ação */}
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              {tarefa ? "Atualizar" : "Criar"} Tarefa
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
