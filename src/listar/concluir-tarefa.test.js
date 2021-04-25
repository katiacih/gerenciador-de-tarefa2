import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { ConcluirTarefa } from './concluir-tarefa'
import Tarefa from '../models/tarefa.model'
const makeSut = () => {
  const nomeTarefa = 'tarefa de teste'
  const tarefa = new Tarefa(1, nomeTarefa, false)
  render(<ConcluirTarefa 
    recarregarTarefas = {() => {}}
    tarefa={ tarefa }/>)
}

describe('Concluir Tarefa', () => {
 beforeEach(() => {
  makeSut()
 })

 it('deve renderizar o componente sem erros', () => {
  expect(screen.getByTestId('concluir-tarefa')).toBeInTheDocument()
 })

 it('deve exibir o modal', () => {
   fireEvent.click(screen.getByTestId('btn-abrir-modal'))
   expect(screen.getByTestId('modal')).toBeInTheDocument()
   expect(screen.getByTestId('modal')).toHaveTextContent('tarefa de teste')
 })

 it('deve concluir uma tarefa', () => {
  const nomeTarefa = 'tarefa de teste'
  const tarefa = new Tarefa(1, nomeTarefa, false)
   localStorage['tarefas'] = JSON.stringify([tarefa])
   fireEvent.click(screen.getByTestId('btn-abrir-modal'))
   fireEvent.click(screen.getByTestId('btn-concluir'))
   const tarefasDb = JSON.parse(localStorage['tarefas']);
   expect(tarefasDb[0].concluida).toBeTruthy()
 })
})
