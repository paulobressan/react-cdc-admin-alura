import React, { Component } from 'react';

//Em nenhum codigo js comum tem a possibilidade de realizar imports de css, para que isso seja possivel,
//o react utiliza o webpack que transforma tudo em um unico js
//Importando os css que vai ser utilizado para o layout da aplicação
import './css/pure-min.css';
import './css/side-menu.css';
import AutorBox from './Autor'

// Criando um component
class App extends Component {
  // Quando o component for chamado para ser renderizado, o metodo render tem a responsabilidade de retornar o xml do html.
  render() {
    return (
      <div id="layout">
        <a href="#menu" id="menuLink" className="menu-link">
          <span></span>
        </a>

        <div id="menu">
          <div className="pure-menu">
            <a className="pure-menu-heading" href="#">Company</a>

            <ul className="pure-menu-list">
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livros</a></li>
            </ul>
          </div>
        </div>

        <div id="main">
          <div className="header">
            <h1>Cadastro de Autores</h1>
          </div>
          <AutorBox></AutorBox>
        </div>
      </div>
    );
  }
}

export default App;
