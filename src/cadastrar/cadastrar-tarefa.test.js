import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { CadastrarTarefa } from './cadastrar-tarefa'
import { BrowserRouter } from 'react-router-dom'


const makeSut = () => {
   render(
  <BrowserRouter>
    <CadastrarTarefa/>
  </BrowserRouter>
   )
 }

describe('Cadastrar Tarefa', () => {

 beforeEach(() => {
   makeSut()
 })

 it('deve renderizar o componente sem erros', () => {
expect(screen.getByTestId('cadastrar')).toBeInTheDocument()
  expect(screen.getByRole('form')).toBeInTheDocument()
})

it('deve cadastrar uma nova tarefa', () => {
   const txtTarefa = screen.getByTestId('txt-tarefa')
   fireEvent.change(txtTarefa, { target: {value: 'tarefa'}});
   fireEvent.submit(screen.getByRole('form'));
   expect(screen.getByTestId('modal')).toBeInTheDocument();
   expect(screen.getByTestId('modal')).toHaveTextContent('Sucesso');
   expect(screen.getByTestId('modal')).toHaveTextContent('Tarefa adicionada com sucesso!');
})

})