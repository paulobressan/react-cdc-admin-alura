import React, { Component } from 'react';

//Em nenhum codigo js comum tem a possibilidade de realizar imports de css, para que isso seja possivel,
//o react utiliza o webpack que transforma tudo em um unico js
//Importando os css que vai ser utilizado para o layout da aplicação
import './css/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';

// Criando um component
class App extends Component {
  constructor() {
    super();
    // iniciando o estado do component
    this.state = { lista: [] };

    // Atribuindo ao enviaForm o contexto do react, ou seja da nossa classe. 
    this.enviaForm = this.enviaForm.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setSenha = this.setSenha.bind(this);
  }

  //Ciclos de vida, o willmount executa antes de renderizar o componente
  componentDidMount() {
    $.ajax({
      url: "http://localhost:8080/api/autores",
      dataType: 'json',
      success: (data) => {
        // Alterando o estado do componente
        this.setState({ lista: data, nome: '', email: '', senha: '' })
      }
    });
  }

  enviaForm(evento) {
    evento.preventDefault();

    $.ajax({
      url: "http://localhost:8080/api/autores",
      contentType: 'application/json',
      dataType: 'json',
      method: 'POST',
      data: JSON.stringify({ nome: this.state.nome, email: this.state.email, senha: this.state.senha }),
      success: (data) => {
        // Alterando o estado do componente
        console.log('enviado com sucesso');

      },
      error: (err) => {
        console.log('error');
      }
    });
  }

  setNome(evento) {
    //Alterando o estado da propriedade nome
    this.setState({ nome: evento.target.value });
  }

  setEmail(evento) {
    //Alterando o estado da propriedade email
    this.setState({ email: evento.target.value });
  }

  setSenha(evento) {
    //Alterando o estado da propriedade senha
    this.setState({ senha: evento.target.value });
  }

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
          <div className="content" id="content">
            <div className="pure-form pure-form-aligned">
              <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm}>
                <div className="pure-control-group">
                  <label htmlFor="nome">Nome</label>
                  <input id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} />
                </div>
                <div className="pure-control-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} />
                </div>
                <div className="pure-control-group">
                  <label htmlFor="senha">Senha</label>
                  <input id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} />
                </div>
                <div className="pure-control-group">
                  <label></label>
                  <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                </div>
              </form>

            </div>
            <div>
              <table className="pure-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>email</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Abrindo uma lacuna no jsx para implementar códigos dinamico */}
                  {
                    // Percorrendo uma lista e retornando html dinamico
                    this.state.lista.map(autor => {
                      return (
                        // O key é responsavel por manter um identificador a um código dinamico. Ele facilita a renderização. Sem o key,
                        // o react renderiza o dom inteiro, com o key, o react renderiza somente o que é necessario.
                        <tr key={autor.id}>
                          <td>{autor.nome}</td>
                          <td>{autor.email}</td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
