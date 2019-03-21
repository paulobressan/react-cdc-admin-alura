import React, { Component } from 'react'
import InputCustomizado from './componentes/inputCustomizado'

class FormularioLivro extends Component {
    constructor() {
        super();
        this.state = { titulo: '', preco: 0, autorId: 0 };
        this.setTitulo = this.setTitulo.bind(this);
        this.setPreco = this.setPreco.bind(this);
        this.setAutorId = this.setAutorId.bind(this);
        this.enviaForm = this.enviaForm.bind(this);
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm}>
                    <InputCustomizado type="text" id="titulo" name="titulo" value={this.state.titulo} onChange={this.setTitulo} label="Titulo"></InputCustomizado>
                    <InputCustomizado type="number" id="preco" name="preco" value={this.state.preco} onChange={this.setPreco} label="Preço"></InputCustomizado>
                    <InputCustomizado type="number" id="autorId" name="autorId" value={this.state.autorId} onChange={this.setAutorId} label="Autor Id"></InputCustomizado>
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
        this.props.lista.push({id:1,titulo:this.state.titulo, preco:this.state.preco, autorId:this.state.autorId})
        this.props.callbackAtualizaListagem(this.props.lista)
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
        this.setState({ titulo: '', preco: 0, autorId: 0 });
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
                            <th>Autor Id</th>
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
                                        <td>{livro.autorId}</td>
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


export default class LivroBox extends Component{
    constructor(){
        super();
        this.state = {lista:[]};
        this.atualizaListagem = this.atualizaListagem.bind(this);
    }

    atualizaListagem(novaLista){
        this.setState({lista:novaLista})
    }

    render(){
        return(
            <div>
                <div className="header">
                    <h1>CADASTRO DE LIVROS</h1>
                </div>
                <div className="content" id="content">
                    <FormularioLivro lista={this.state.lista} callbackAtualizaListagem={this.atualizaListagem}></FormularioLivro>
                    <TabelaLivro lista={this.state.lista}></TabelaLivro>
                </div>
            </div>
        );
    }
}
