import './gerenciador-tarefas.css';
import React from "react";
import { ListarTarefas } from './listar/listar-tarefas'
import { AtualizarTarefa } from './atualizar/atualiza-tarefa'
import { CadastrarTarefa } from './cadastrar/cadastrar-tarefa'
import {
  Switch,
  Route,
  Link
} from "react-router-dom";


function GerenciadorTarefas() {
  return (
    <>
    <div style={{display: 'none'}}>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
      </div>
    <Switch>
      <Route exact path='/'><ListarTarefas/></Route>
      <Route path='/cadastrar'><CadastrarTarefa/></Route>
      <Route path='/atualizar/:id'><AtualizarTarefa/></Route>
    </Switch>
    </>
)
}

export default GerenciadorTarefas;
