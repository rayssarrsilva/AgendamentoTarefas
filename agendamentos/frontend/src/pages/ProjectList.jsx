import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const [token] = useState(localStorage.getItem('token'));

  const API = 'http://localhost:3001/api/projects';

  // Buscar todos os projetos
  const fetchProjects = async () => {
    try {
      const response = await axios.get(API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(response.data);
    } catch (error) {
      console.error('Erro ao buscar projetos:', error.response?.data || error.message);
    }
  };

  // Criar novo projeto
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        API,
        { name },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setName('');
      fetchProjects();
    } catch (error) {
      console.error('Erro ao criar projeto:', error.response?.data || error.message);
    }
  };

  // Deletar projeto
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProjects();
    } catch (error) {
      console.error('Erro ao deletar projeto:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Projetos</h1>

      <form onSubmit={handleCreate} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Nome do projeto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Criar
        </button>
      </form>

      <ul className="space-y-2">
        {projects.map((project) => (
          <li key={project.id} className="p-3 bg-white rounded shadow flex justify-between items-center">
            <span>{project.name}</span>
            <button
              onClick={() => handleDelete(project.id)}
              className="ml-2 px-2 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
