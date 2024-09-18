import './App.css';
import { useState } from 'react';

function App() {
  const [endereco, setEndereco] = useState({});

  function manipularEndereco(evento) {
    const cep = evento.target.value;
    setEndereco({ cep });

    if (cep && cep.length === 8) {
      // Obter endereço
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((resposta) => resposta.json())
        .then((dados) => {
          setEndereco((enderecoAntigo) => ({
            ...enderecoAntigo,
            rua: dados.logradouro,
            bairro: dados.bairro,
            cidade: dados.localidade,
            estado: dados.uf
          }));
        });
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <label>Digite o cep:</label>
          <input placeholder="00000000" onChange={(evento) => manipularEndereco(evento)}/>
        </div>
        <ul>
          <li>CEP: {endereco.cep}</li>
          <li>Rua: {endereco.rua}</li>
          <li>Bairro: {endereco.bairro}</li>
          <li>Cidade: {endereco.cidade}</li>
          <li>Estado: {endereco.estado}</li>
        </ul>
      </header>
    </div>
  );
}

export default App;
