import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { 
   Link, 
   BrowserRouter, 
   Switch, 
   Route, 
   useHistory } from 'react-router-dom'
import { AtualizarTarefa } from './atualiza-tarefa'
import Tarefa from '../models/tarefa.model'

function Teste () {
   return (
      <div>
         <Link 
         data-testid='btn-abrir-atualizar'
         to={ `/atualizar/1`}>Link</Link>
      </div>
   )
}


function makeSut(){
   render(
      <BrowserRouter>
         <Switch>
            <Route exact path='/'><Teste/></Route>
            <Route path='/atualizar/:id'><AtualizarTarefa/></Route>
         </Switch>
      </BrowserRouter>
      
      )
}

describe('Atualizar tarefa', () => {
   const tarefa1 = 'Primeira tarefa'
   const tarefa2 = 'Segunda tarefa'
  afterEach(() => {
   fireEvent.click(screen.getByTestId('voltar'))
   delete localStorage['tarefas']
  })
  beforeEach(() => {
   localStorage['tarefas'] = JSON.stringify([
     new Tarefa(1, tarefa1, false),
     new Tarefa(2, tarefa2, false),
   ])
   
   makeSut()
   })

   it('deve renderizar o componente sem erros', () => {
   fireEvent.click(screen.getByTestId('btn-abrir-atualizar'))
   expect(screen.getByTestId('atualizar-tarefa')).toBeInTheDocument()
   })

   it('deve tentar atualizar um texto menor que 5 caracteres', () => {
      fireEvent.click(screen.getByTestId('btn-abrir-atualizar'))
      const txtTarefa = screen.getByTestId('txt-tarefa')
      expect(txtTarefa).toBeInTheDocument()
      fireEvent.change(txtTarefa, {
         target: { value: 'Out'}
      })
      fireEvent.click(screen.getByTestId('btn-atualizar'))
      expect(screen.getByTestId('form')).toHaveTextContent('A tarefa deve conter ao menos 5 caracteres.')
   })

   it('deve  atualizar com sucesso', () => {
      fireEvent.click(screen.getByTestId('btn-abrir-atualizar'))
      const txtTarefa = screen.getByTestId('txt-tarefa')
      expect(txtTarefa).toBeInTheDocument()
      fireEvent.change(txtTarefa, {
         target: { value: 'tarefa modificada'}
      })
      fireEvent.click(screen.getByTestId('btn-atualizar'))
      expect(screen.getByTestId('modal')).toBeInTheDocument()
      expect(screen.getByTestId('modal')).toHaveTextContent('Sucesso')
      const tarefasDb = JSON.parse(localStorage['tarefas'])
      expect(tarefasDb[0].nome).toBe('tarefa modificada')
   })

})