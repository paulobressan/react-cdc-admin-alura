// Core do react, permite criar novos elementos html, usando jsx
import React from 'react';
// O react dom é responsavel pela manipulação de paginas html, exemplo a renderização de paginas html
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AutorBox from './Autor';
import Home from './Home';

// Renderizando o componente App para a lacuna no arquivo index.html
ReactDOM.render(
    //Criando roteamento da aplicação com o pacote react-router-dom
    <BrowserRouter>
        <App>
            <Switch>
                {/* Definindo rotas */}
                <Route exact path="/" component={Home} />
                <Route path="/autor" component={AutorBox} />
                <Route path="/livro" />
            </Switch>
        </App>
    </BrowserRouter>,
    document.getElementById('root'));

// O trabalho do jsx é retirar o dev o trabalho de criar elementos atraves de funções e sim com tags xml.
//ReactDOM.render(React.createElement(App), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
