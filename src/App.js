import './App.css';
import React, { Component } from 'react';
import Comentario from './components/Comentario';

class App extends Component {

  state = {
    comentarios: [
      {
        nome: 'João',
        email: 'joao@mail.com',
        data: new Date(2020, 3, 19),
        mensagem: 'Olá, tudo bem?'
      },
      {
        nome: 'Maria',
        email: 'maria@mail.com',
        data: new Date(2020, 3, 21),
        mensagem: 'Olá, tudo bem sim.'
      }
    ],
    novoComentario: {
      nome: '',
      email: '',
      comentario: '',
    }
  }
  adicionarComentario = (evento) => {
      evento.preventDefault();
      console.log("Adicionando comentario...")
      const novoComentario = {...this.state.novoComentario, data: new Date() }
    
      this.setState({
        comentarios: [...this.state.comentarios, novoComentario],
        novoComentario: { nome: '', email: '', mensagem: ''}
      })
  }

  removerComentario = comentario => {
    let lista = this.state.comentarios;
    lista = lista.filter(c => c !== comentario)
    this.setState({ comentarios: lista})
  }

  digitacao = evento => {
    const {name, value} = evento.target;
    this.setState({ novoComentario: {...this.state.novoComentario, [name]: value} })
  }

  render(){
    return (
      <div className="App">
        <h1>Meu projeto</h1>
        {this.state.comentarios.map((comentario, indice) => (
          <Comentario 
            key={indice}
            nome={comentario.nome} 
            email={comentario.email} 
            data={comentario.data}
            onRemove={this.removerComentario.bind(this, comentario)}>
            {comentario.mensagem}
          </Comentario>
        ))}

        <form method="post" onSubmit={this.adicionarComentario} className="novo-comentario">
          <h2>Adicionar Comentário</h2>
          <div>
            <input 
            type="text" 
            name="nome" 
            value={this.state.novoComentario.nome}
            onChange={this.digitacao}
            required
            placeholder="Digite seu nome"/>
          </div>

          <div>
            <input 
            type="email" 
            name="email"
            value={this.state.novoComentario.email}
            onChange={this.digitacao} 
            required
            placeholder="Digite seu email"/>
          </div>

          <div>
            <textarea 
            name="mensagem" 
            value={this.state.novoComentario.mensagem}
            rows="4" 
            onChange={this.digitacao}
            required
            placeholder="Comentário..."/>
          </div>

          <button 
          type="submit">Adicionar Comentário
          </button>

        </form>
      </div>
    );
  }
}

export default App;
