import React, { Component } from 'react'
import PubSub from 'pubsub-js';

export default class SelectAutoresCustomizado extends Component {
    constructor() {
        super();
        this.state = { msgError: '' };
    }

    componentDidMount() {
        PubSub.subscribe('erro-validacao', (canal, erro) => {
            if (erro.field === this.props.name)
                this.setState({ msgError: erro.defaultMessage })
        })

        PubSub.subscribe('limpa-erros', (canal) => {
            this.setState({ msgError: '' })
        })
    }

    render() {
        return (
            <div className="pure-control-group">
                <label htmlFor="autorId">Autores</label>
                {/* O value no select não existe em um html comum, mas o react disponibiliza para a seleção de uma option */}
                <select value={this.props.autorId} id="autorId" name="autorId" onChange={this.props.onChange}>
                    <option value="">Selecionar</option>
                    {
                        this.props.lista.map(autor => <option key={autor.id} value={autor.id}>{autor.nome}</option>)
                    }
                </select>
                <span className="error">{this.state.msgError}</span>
            </div>
        )
    }
}