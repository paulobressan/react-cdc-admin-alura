import React, { Component } from 'react';
import InputCustomizado from './componentes/inputCustomizado';
import $ from 'jquery';
import TratadorErrors from './TratadorErrors';
import PubSub from 'pubsub-js';
import SelectAutoresCustomizado from './componentes/selectAutoresCustomizado';


class FormularioLivro extends Component {
    constructor() {
        super();
        this.state = { autores: [], titulo: '', preco: 0, autorId: 0 };
        this.setTitulo = this.setTitulo.bind(this);
        this.setPreco = this.setPreco.bind(this);
        this.setAutorId = this.setAutorId.bind(this);
        this.enviaForm = this.enviaForm.bind(this);
    }

    componentWillMount() {
        $.ajax({
            url: "http://localhost:8080/api/autores",
            dataType: 'json',
            success: (resposta) => {
                // Alterando o estado do componente
                this.setState({ autores: resposta });
            }
        });
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm}>
                    <InputCustomizado type="text" id="titulo" name="titulo" value={this.state.titulo} onChange={this.setTitulo} label="Titulo"></InputCustomizado>
                    <InputCustomizado type="number" id="preco" name="preco" value={this.state.preco} onChange={this.setPreco} label="Preço"></InputCustomizado>
                    <SelectAutoresCustomizado lista={this.state.autores} onChange={this.setAutorId} autorId={this.state.autorId}></SelectAutoresCustomizado>
                    <div className="pure-control-group">
                        <label></label>
                        <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                    </div>
                </form>

            </div>
        );
    }

    enviaForm(e) {
        e.preventDefault();
        $.ajax({
            url: "http://localhost:8080/api/livros",
            dataType: 'json',
            contentType: 'application/json',
            method: 'POST',
            data: JSON.stringify({ titulo: this.state.titulo, preco: this.state.preco, autorId: this.state.autorId }),
            success: (resposta) => {
                // Executando callback para atualizar a lista do componente AutorBox que une os dois componentes, lista e formulario.
                // Quando adicionar um novo registro, vamos atualizar a listagem do estado do componente AutorBox que vai atualizar a tabela
                // Porque passamos para a tabela o estado da lista.
                this.props.callbackAtualizaListagem(resposta);
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
        })
    }

    setTitulo(e) {
        this.setState({ titulo: e.target.value });
    }

    setPreco(e) {
        this.setState({ preco: e.target.value });
    }

    setAutorId(e) {        
        this.setState({ autorId: e.target.value });
    }

    limparFormulario() {
        this.setState({ titulo: '', preco: 0, autorId: '' });
    }
}


class TabelaLivro extends Component {
    render() {
        return (
            <div>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Preço</th>
                            <th>Autor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Abrindo uma lacuna no jsx para implementar códigos dinamico */}
                        {
                            // Percorrendo uma lista e retornando html dinamico
                            this.props.lista.map(livro => {
                                return (
                                    // O key é responsavel por manter um identificador a um código dinamico. Ele facilita a renderização. Sem o key,
                                    // o react renderiza o dom inteiro, com o key, o react renderiza somente o que é necessario.
                                    <tr key={livro.id}>
                                        <td>{livro.titulo}</td>
                                        <td>{livro.preco}</td>
                                        <td>{livro.autor.nome}</td>
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


export default class LivroBox extends Component {
    constructor() {
        super();
        this.state = { lista: [] };
        this.atualizaListagem = this.atualizaListagem.bind(this);
    }

    //Ciclo de vida react
    componentDidMount() {
        $.ajax({
            url: "http://localhost:8080/api/livros",
            dataType: 'json',
            success: (resposta) => {
                this.setState({ lista: resposta })
            }
        })
    }

    atualizaListagem(novaLista) {
        this.setState({ lista: novaLista })
    }

    render() {
        return (
            <div>
                <div className="header">
                    <h1>CADASTRO DE LIVROS</h1>
                </div>
                <div className="content" id="content">
                    <FormularioLivro callbackAtualizaListagem={this.atualizaListagem}></FormularioLivro>
                    <TabelaLivro lista={this.state.lista}></TabelaLivro>
                </div>
            </div>
        );
    }
}
