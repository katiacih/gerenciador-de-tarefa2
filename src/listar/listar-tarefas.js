import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { ItemListaTarefa } from './itens-lista-tarefa'
import { Paginacao } from './paginacao'

export function ListarTarefas() {
 const ITENS_POR_PAG = 3

 const [tarefas, setTarefas] = useState([]);
 const [carregarTarefas, setCarregarTarefas] = useState(true);
 const [totalItens, setTotalItens] = useState(0)
 const [paginaAtual, setPaginaAtual] = useState(1)
 const [ordenarAsc, setOrdenarAsc] = useState(false)
 const [ordenarDesc, setOrdenarDesc] = useState(false)
 const [filtroTarefa, setFiltroTarefa] = useState('');

 useEffect(() => {
  function obterTarefas() {
   const tarefasDb = localStorage['tarefas'];
   let listaTarefas = tarefasDb ? JSON.parse(tarefasDb)
    : [];

    //filtrar
    listaTarefas = listaTarefas.filter(
    t => t.nome.toLowerCase().indexOf(filtroTarefa.toLowerCase()) === 0
    );
   // ordenar
   if (ordenarAsc) {
    listaTarefas.sort((t1, t2) => (t1.nome.toLowerCase() > t2.nome.toLowerCase()) ? 1 : -1);
  } else if (ordenarDesc) {
    listaTarefas.sort((t1, t2) => (t1.nome.toLowerCase() < t2.nome.toLowerCase()) ? 1 : -1);
  }
   
   // paginar
   setTotalItens(listaTarefas.length)
   setTarefas(listaTarefas.slice((paginaAtual - 1) * ITENS_POR_PAG, ITENS_POR_PAG )) 
  }
  if(carregarTarefas){
   obterTarefas();
   setCarregarTarefas(false);
  }
 }, [carregarTarefas, paginaAtual, ordenarAsc, ordenarDesc, filtroTarefa])

 function handleMudarPagina(pagina) {
   setPaginaAtual(pagina)
   setCarregarTarefas(true)
 }

 function handleOrdenar(event){
   event.preventDefault()
   if(!ordenarAsc && !ordenarDesc){
     setOrdenarAsc(true)
     setOrdenarDesc(false)
   } else if( ordenarAsc) {
     setOrdenarAsc(false)
     setOrdenarDesc(true)
   }else{
    setOrdenarAsc(false)
    setOrdenarDesc(false)
   }
   setCarregarTarefas(true);
 }

 function handleFiltrar(event) {
  setFiltroTarefa(event.target.value);
  setCarregarTarefas(true);
}

 return (
  <div className='text-center'>
   <h3>Tarefas a fazer</h3>
   <Table striped bordered hover responsive data-testid='tabela'>
    <thead>
     <tr>
      <th><a
        href='/'
        onClick={handleOrdenar}
      >Tarefa</a></th>
      <th>
        {/* <Router> */}
      <Link 
        data-testid='btn-nova-tarefa'
        to="/cadastrar" 
        className="btn btn-success btn-sm">
          <FontAwesomeIcon icon={faPlus}/>
          &nbsp;
          Nova Tarefa</Link>

        {/* </Router> */}
      </th>
     </tr>
     <tr>
       <th>
         <Form.Control 
          type='text'
          value={filtroTarefa}
          onChange={handleFiltrar}
          data-testid='txt-tarefa'
          className='filtro-tarefa'
         />
       </th>
     </tr>
    </thead>
    <tbody>
     <ItemListaTarefa 
      tarefas={tarefas}
      recarregarTarefas={setCarregarTarefas}/>
    </tbody>
   </Table>
    
   <Paginacao
    totalItens={totalItens}
    itemsPorPagina={ITENS_POR_PAG}
    paginaAtual = {paginaAtual}
    mudarPagina = {handleMudarPagina}
   />

  </div>
     // <A href="/cadastrar" className="btn btn-success btn-sm">Nova Tarefa</A>
 )
}