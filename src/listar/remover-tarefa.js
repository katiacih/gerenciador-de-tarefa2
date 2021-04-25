import React, { useState }from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons' 


export function RemoverTarefa (props) {

 const [exibirModal, setExibirModal] = useState(false)

 function handleAbrirModal(event) {
  event.preventDefault();
  setExibirModal(true);
 }
 function handleFecharModal(event) {
  setExibirModal(false);
 }

 function handleRemoverTarefa(event){
  event.preventDefault();
  const tarefasDb = localStorage['tarefas'];
  let tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];
  tarefas = tarefas.filter(tarefa => tarefa.id !== props.tarefa.id)
  localStorage['tarefas'] = JSON.stringify(tarefas)
  setExibirModal(false)
  props.recarregarTarefas(true)
 }


 return (
  <span data-testid='remover-tarefa'>
   <Button
    variant='danger'
    className='btn-sm'
    data-testid='btn-abrir-modal'
    onClick={handleAbrirModal}
   >
    <FontAwesomeIcon icon={faTrashAlt}/>

   </Button>
   <Modal data-testid='modal'
    show={exibirModal} 
    onHide={handleFecharModal}>
    <Modal.Header>
     <Modal.Title>Remover tarefa</Modal.Title>
    </Modal.Header>
    <Modal.Body>Deseja realmente remover a seguinte tarefa?
      <br/>
      <strong>{props.tarefa.nome}</strong>
    </Modal.Body>
    <Modal.Footer>
     <Button 
      data-testid='btn-remover'
      variant='primary' 
      onClick={handleRemoverTarefa}>Sim</Button>
      <Button 
      variant='light' 
      onClick={handleFecharModal}>Não</Button>
    </Modal.Footer>
   </Modal>
  </span>
 );
}

RemoverTarefa.propTypes = {
 tarefa: PropTypes.object.isRequired,
 recarregarTarefas: PropTypes.func.isRequired
}