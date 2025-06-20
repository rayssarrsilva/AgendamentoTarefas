import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-blue-600 text-white p-4 shadow flex justify-between items-center">
      <h1 className="text-xl font-bold">Sistema de Agendamento</h1>
      {token && (
        <nav className="flex items-center space-x-4">
          <Link to="/projetos" className="hover:underline">
            Projetos
          </Link>
          <Link to="/tarefas" className="hover:underline">
            Tarefas
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white"
          >
            Logout
          </button>
        </nav>
      )}
    </header>
  );
}
