import { render, screen } from '@testing-library/react'
import React from 'react'
import { Paginacao } from './paginacao'


const makeSut = (totalItens, ItensPorPagina, paginaAtual ) => {
  render(
   <Paginacao
    totalItens={totalItens}
    itemsPorPagina={ItensPorPagina}
    paginaAtual = {paginaAtual}
    mudarPagina = {() => {}}
   />
  )
}

describe('Paginacao', () => {
 beforeEach(() => {
  makeSut(15, 5, 1)
 })

 it('deve renderizar o componente sem erros', () => {
  expect(screen.getByTestId('paginacao')).toBeInTheDocument()
 })

 it('deve exibir a paginacao contendo 3 paginas', () => {
   const pag = screen.getByTestId('paginacao')
   expect(pag).toHaveTextContent('1')
   expect(pag).toHaveTextContent('2')
   expect(pag).toHaveTextContent('3')
 })

})
