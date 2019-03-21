import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './componentes/inputCustomizado';
import PubSub from 'pubsub-js'

import TratadorErrors from './TratadorErrors'

class FormularioAutor extends Component {
    constructor() {
        super();
        this.state = { nome: '', email: '', senha: '' };

        // Atribuindo ao enviaForm o contexto do react, ou seja da nossa classe, porque esses metodos são chamados no html e o contexto é outro. 
        this.enviaForm = this.enviaForm.bind(this);
    }

    enviaForm(evento) {
        evento.preventDefault();

        $.ajax({
            url: "http://localhost:8080/api/autores",
            contentType: 'application/json',
            dataType: 'json',
            method: 'POST',
            data: JSON.stringify({ nome: this.state.nome, email: this.state.email, senha: this.state.senha }),
            success: (resposta) => {
                // Executando callback para atualizar a lista do componente AutorBox que une os dois componentes, lista e formulario.
                // Quando adicionar um novo registro, vamos atualizar a listagem do estado do componente AutorBox que vai atualizar a tabela
                // Porque passamos para a tabela o estado da lista.
                this.props.callbackAtualizaListagem(resposta)


                // Publish subscriber com pubsub-js, após cadastrar um autor, vamos disparar um aviso geral para quem esta escutando atualizar a lista
                // Publicar no canal atualiza-lista-autores a resposta, assim quem estiver escutando esse canal vai atualizar a lista de autores
                // PubSub.publish('atualiza-lista-autores', resposta)
                this.limparFormulario();
            },
            error: (err) => {
                if (err.status === 400) {
                    new TratadorErrors().publicaErrors(err.responseJSON)
                }
            },
            beforeSend: () => {
                PubSub.publish('limpa-erros', {})
            }
        });
    }

    salvaAlteracao(nomeInput, e) {
        let campo = {};

        campo[nomeInput] = e.target.value;
        console.log(campo);
        this.setState(campo);
        console.log(this.state)
    }

    limparFormulario() {
        this.setState({ nome: '', email: '', senha: '' });
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm}>
                    <InputCustomizado type="text" id="nome" name="nome" value={this.state.nome} onChange={this.salvaAlteracao.bind(this, 'nome')} label="Nome"></InputCustomizado>
                    <InputCustomizado type="email" id="email" name="email" value={this.state.email} onChange={this.salvaAlteracao.bind(this, 'email')} label="Email"></InputCustomizado>
                    <InputCustomizado type="password" id="senha" name="senha" value={this.state.senha} onChange={this.salvaAlteracao.bind(this, 'senha')} label="Senha"></InputCustomizado>
                    <div className="pure-control-group">
                        <label></label>
                        <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                    </div>
                </form>

            </div>
        );
    }
}

class TabelaAutores extends Component {
    render() {
        return (
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
                            this.props.lista.map(autor => {
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
        );
    }
}

// Componente responsavel encapsular um estado utilizado por 2 componentes.
// Higher-order components
export default class AutorBox extends Component {
    constructor() {
        super();
        // iniciando o estado do component
        this.state = { lista: [] };
        this.atualizaListagem = this.atualizaListagem.bind(this);
    }

    //Ciclos de vida, o willmount executa antes de renderizar o componente
    componentDidMount() {
        $.ajax({
            url: "http://localhost:8080/api/autores",
            dataType: 'json',
            success: (resposta) => {
                // Alterando o estado do componente
                this.setState({ lista: resposta });
            }
        });
    }

    atualizaListagem(novaLista) {
        // Alterando o estado do componente atraves de um callback chamado pelo componente de formulario. Quando alguem adicionar um novo registro, vai ser
        // chamado o atualizaLIstagem atraves de props
        this.setState({ lista: novaLista });
    }

    render() {
        return (
            <div>
                <div className="header">
                    <h1>CADASTRO DE AUTORES</h1>
                </div>
                <div className="content" id="content">
                    <FormularioAutor callbackAtualizaListagem={this.atualizaListagem}></FormularioAutor>
                    <TabelaAutores lista={this.state.lista}></TabelaAutores>
                </div>
            </div>
        );
    }
}