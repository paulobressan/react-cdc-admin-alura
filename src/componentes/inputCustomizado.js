import React, { Component } from 'react';
import PubSub from 'pubsub-js'

export default class InputCustomizado extends Component {
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
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input id={this.props.id} type={this.props.type} name={this.props.name} value={this.props.value} onChange={this.props.onChange} />
                <span className="error">{this.state.msgError}</span>
            </div>
        );
    }
}