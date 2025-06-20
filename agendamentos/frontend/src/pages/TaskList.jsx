import { useState, useEffect } from 'react';
import axios from 'axios';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState('');
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [token] = useState(localStorage.getItem('token'));

  const TASK_API = 'http://localhost:3001/api/tasks';
  const PROJECT_API = 'http://localhost:3001/api/projects';

  const fetchTasks = async () => {
    try {
      const response = await axios.get(TASK_API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error.response?.data || error.message);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get(PROJECT_API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(response.data);
    } catch (error) {
      console.error('Erro ao buscar projetos:', error.response?.data || error.message);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        TASK_API,
        { description, project_id: projectId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDescription('');
      setProjectId('');
      fetchTasks();
    } catch (error) {
      console.error('Erro ao criar tarefa:', error.response?.data || error.message);
    }
  };

  const handleEdit = async (id) => {
    const task = tasks.find((t) => t.id === id);
    setDescription(task.description);
    setProjectId(task.project_id);
    setEditingId(id);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${TASK_API}/${editingId}`,
        { description, project_id: projectId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDescription('');
      setProjectId('');
      setEditingId(null);
      fetchTasks();
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${TASK_API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Tarefas</h1>

      <form onSubmit={editingId ? handleUpdate : handleCreate} className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-2">
        <input
          type="text"
          placeholder="Descrição da tarefa"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border border-gray-300 rounded"
          required
        />
        <select
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          className="p-2 border border-gray-300 rounded"
          required
        >
          <option value="">Selecione o projeto</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {editingId ? 'Atualizar' : 'Criar'}
        </button>
      </form>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="p-3 bg-white rounded shadow flex justify-between items-center">
            <div>
              <strong>Projeto:</strong> {task.project_name || 'N/A'}<br />
              <strong>Tarefa:</strong> {task.description}
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(task.id)}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
