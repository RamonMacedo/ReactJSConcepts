import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([]);
  
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [techs, setTechs] = useState([]);
  

  useEffect(()=>{
    api.get('repositories').then(response => {
      setRepository(response.data);
    });
  },[])

  async function handleAddRepository() {
    const repository = {
      title,
      url,
      techs,
  }

  try {
      const response = await api.post('repositories', repository);
      setRepository([...repositories, response.data]);
  } catch (err) {
      console.log('Erro ao cadastar, tente novamente.');
  }
  }

  async function handleRemoveRepository(id) {
    try {
      const response = await api.delete(`repositories/${id}`);

      setRepository(repositories.filter(repository => repository.id !== id));
    } catch (err) {
        console.log('Erro ao deletar repositório, tente novamente.');
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
