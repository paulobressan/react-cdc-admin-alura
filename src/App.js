import React, { Component } from 'react';

//Em nenhum codigo js comum tem a possibilidade de realizar imports de css, para que isso seja possivel,
//o react utiliza o webpack que transforma tudo em um unico js
//Importando os css que vai ser utilizado para o layout da aplicação
import './css/pure-min.css';
import './css/side-menu.css';
// Pacote responsavel por criar Link SPA
import { Link } from 'react-router-dom'

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
            <Link className="pure-menu-heading" to="/">Company</Link>

            <ul className="pure-menu-list">
              <li className="pure-menu-item">
                <Link to="/" className="pure-menu-link">Home</Link>
              </li>
              <li className="pure-menu-item">
                <Link to="/autor" className="pure-menu-link">Autor</Link>
              </li>
              <li className="pure-menu-item">
                <Link to="/livros" className="pure-menu-link">Livro</Link>
              </li>
            </ul>
          </div>
        </div>

        <div id="main">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
