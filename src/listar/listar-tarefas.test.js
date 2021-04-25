import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { ListarTarefas } from './listar-tarefas'
import { BrowserRouter } from 'react-router-dom'
import Tarefa from '../models/tarefa.model'

const makeSut = () => {
  render(
  <BrowserRouter>
    <ListarTarefas/>  
  </BrowserRouter>
  )
}

describe('Listar Tarefas', () => {
  const tarefa1 = 'Primeira tarefa'
  const tarefa2 = 'Segunda tarefa'
  const tarefa3 = 'Terceira tarefa'
 afterEach(() => {
   delete localStorage['tarefas']
 })
 beforeEach(() => {
  localStorage['tarefas'] = JSON.stringify([
    new Tarefa(1, tarefa1, false),
    new Tarefa(2, tarefa2, false),
    new Tarefa(3, tarefa3, false)
  ])
  makeSut()
 })

 it('deve renderizar o componente sem erros', () => {
  expect(screen.getByTestId('tabela')).toBeInTheDocument()
 })

 it('deve exibir uma tabela contendo 3 tarefas', () => {
  const tab =screen.getByTestId('tabela')
  expect(tab).toHaveTextContent('Primeira tarefa')
  expect(tab).toHaveTextContent('Segunda tarefa')
  expect(tab).toHaveTextContent('Terceira tarefa')
 })

 it('deve filtrar os dados da tabela de tarefas', () => {
  const tab = screen.getByTestId('tabela')
  fireEvent.change(screen.getByTestId('txt-tarefa'), {
    target: { value: tarefa1 }
  })
  expect(tab).toHaveTextContent(tarefa1)
  expect(tab).not.toHaveTextContent(tarefa2)
  expect(tab).not.toHaveTextContent(tarefa3)
 })

})