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
                <select id="autorId" name="autorId" onChange={this.props.onChange}>
                    {
                        this.props.lista.map(autor => {
                            if(autor.id ===this.props.autorId)
                                return <option key={autor.id} selected value={autor.id}>{autor.nome}</option>
                            return <option key={autor.id} value={autor.id}>{autor.nome}</option>
                        })
                    }
                </select>
                <span className="error">{this.state.msgError}</span>
            </div>
        )
    }
}