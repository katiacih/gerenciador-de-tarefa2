import React from 'react';
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { Link }  from 'react-router-dom' 
import { ConcluirTarefa } from './concluir-tarefa'
import { RemoverTarefa } from './remover-tarefa'

export function ItemListaTarefa (props) {
 function marcarConcluida(tarefa) {
  return tarefa.concluida ? 'line-through' : 'none';
 }


 return (
  props.tarefas.map( tarefa => 
   <tr key={tarefa.id} data-testid='tarefa'>
     <td 
      width='75%' 
      style={{ textDecoration: marcarConcluida(tarefa)}}
      data-testid='nome-tarefa'>{tarefa.nome}</td>
     <td className='text-right'>
      <ConcluirTarefa
        tarefa={tarefa}
        className={ tarefa.concluida ? 'hidden' : null }
        recarregarTarefas={props.recarregarTarefas}
      />
      &nbsp;
      {/* <BrowserRouter> */}
       <Link 
        className={tarefa.concluida ? 'hidden' : 'btn btn-warning btn-sm'}
        to={ `/atualizar/${tarefa.id}`}><FontAwesomeIcon icon={faEdit}/></Link>
      {/* </BrowserRouter> */}
      &nbsp;
      <RemoverTarefa
        tarefa={tarefa}
        recarregarTarefas={props.recarregarTarefas}
      />
     </td>
   </tr>
   )

 );
}
ItemListaTarefa.propTypes = {
 tarefas: PropTypes.array.isRequired,
 recarregarTarefas: PropTypes.func.isRequired
}
