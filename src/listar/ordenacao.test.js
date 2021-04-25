import { render, screen } from '@testing-library/react'
import React from 'react'
import { Ordenacao } from './ordenacao'


const makeSut = (ordenarAsc, ordenarDesc ) => {
  render(
   <Ordenacao
    ordenarAsc={ ordenarAsc }
    ordenarDesc={ ordenarDesc }
  
   />
  )
}

describe('Ordenacao', () => {


 it('deve exibir a ordenação padrão', () => {
  makeSut(false, false)
  expect(screen.getByTestId('faSort')).toBeInTheDocument()
  expect(screen.getByTestId('faSortUp')).toBeInTheDocument()
  expect(screen.getByTestId('faSortDown')).toBeInTheDocument()
 })

 it('deve exibir a ordenação ascendente', () => {
  makeSut(true, false)
  expect(screen.getByTestId('faSort')).toHaveClass('hidden')
  expect(screen.getByTestId('faSortUp')).not.toHaveClass('hidden')
  expect(screen.getByTestId('faSortDown')).toHaveClass('hidden')
 })

 it('deve exibir a ordenação descendente', () => {
  makeSut(false, true)
  expect(screen.getByTestId('faSort')).toHaveClass('hidden')
  expect(screen.getByTestId('faSortUp')).toHaveClass('hidden')
  expect(screen.getByTestId('faSortDown')).not.toHaveClass('hidden')
 })



})
