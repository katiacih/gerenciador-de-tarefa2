import { render, screen } from '@testing-library/react'
import React from 'react'
import { ItemListaTarefa } from './itens-lista-tarefa'
import { BrowserRouter } from 'react-router-dom'

const mockTarefas = () => {

 const tarefas = [
  {
   id: 1,
   nome: 'tarefa1',
   concluida: false
  },
  {
   id: 2,
   nome: 'tarefa2',
   concluida: true
  }
 ]

 return tarefas
}

const makeSut = () => {
  render(
    <BrowserRouter>
      <table>
        <tbody>
          <ItemListaTarefa 
            tarefas={mockTarefas()} 
            recarregarTarefas={jest.fn()}/>
        </tbody>
      </table>
    </BrowserRouter>
    )
 }

describe('Teste do componente', () => {

 beforeEach(() => {
   makeSut()
 })

  it('deve renderizar o componente sem erros', () => {
    expect(screen.getAllByTestId('tarefa').length).toBe(2)
  })

  it('deve exibir a tarefa', () => {
    const tarefas = screen.getAllByTestId('nome-tarefa')
    expect(tarefas[0]).toHaveTextContent('tarefa1')
    expect(tarefas[1]).toHaveTextContent('tarefa2')
  })
  it('deve exibir uma tarefa concluida', () => {
    const tarefas = screen.getAllByTestId('nome-tarefa')
    expect(tarefas[1]).toHaveStyle('text-decoration: line-through' )
  })

})