import React, { useState } from 'react';
import { Button, Form, Jumbotron, Modal } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import Tarefa from '../models/tarefa.model'

export function CadastrarTarefa () {
 const history = useHistory()
 const [state, setState] = useState({
  isShowModal: false,
  tarefa: '',
  formValidado: false
 })

 function cadastrar (event) {
  event.preventDefault()
  setState({
   ...state,
   formValidado: true
  })
  if(event.currentTarget.checkValidity() === true){
   const tarefasDb = localStorage['tarefas'];
   const tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];
   tarefas.push(new Tarefa(new Date().getTime(), state.tarefa, false))
   localStorage['tarefas'] = JSON.stringify(tarefas)
   setState({
    ...state,
    isShowModal: true
   })
  }

 }

 function handleTxtTarefa (event) {
  setState({
   ...state,
   tarefa: event.target.value
  })
 }
 function handleFecharModal () {
  setState({
   ...state,
   isShowModal: false
  })
  history.push('/')
 }

 return (
  <div data-testid='cadastrar'>
    <h3 className="text-center">Cadastrar</h3>
    <Jumbotron>
     <Form 
       onSubmit={cadastrar}
       noValidate
       role='form'
       validated={state.formValidado}>
      <Form.Group>
       <Form.Label>Tarefa</Form.Label>
       <Form.Control 
         type='text' 
         placeholder="Digite a tarefa"
         minLength="5"
         maxLength="100"
         required
         data-testid='txt-tarefa'
         onChange={handleTxtTarefa}
       />
       <Form.Control.Feedback type='invalid' >
        A tarefa deve conter ao menos 5 caracteres
       </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className='text-center'>
       <Button 
        variant='success' 
        type='submit'>Cadastrar</Button>
        &nbsp;
        {/* <BrowserRouter> */}
          <Link to="/" 
          className="btn btn-light">Voltar</Link>
        {/* </BrowserRouter> */}

      </Form.Group>
     </Form>
     <Modal
      data-testid='modal' 
      show={state.isShowModal} onHide={handleFecharModal}>
      <Modal.Header closeButton>
       <Modal.Title>Sucesso</Modal.Title>
      </Modal.Header>
      <Modal.Body>Tarefa adicionada com sucesso!</Modal.Body>
      <Modal.Footer>
       <Button variant='success' onClick={handleFecharModal}>Continuar</Button>
      </Modal.Footer>
     </Modal>
    </Jumbotron>
  </div>
 );
}