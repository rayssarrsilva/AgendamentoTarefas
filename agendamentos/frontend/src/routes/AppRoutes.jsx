import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProjectList from '../pages/ProjectList';
import TaskList from '../pages/TaskList';
import Header from '../components/Header';
import PrivateRoute from './PrivateRoute';

export default function AppRoutes() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/projetos"
          element={
            <PrivateRoute>
              <ProjectList />
            </PrivateRoute>
          }
        />
        <Route
          path="/tarefas"
          element={
            <PrivateRoute>
              <TaskList />
            </PrivateRoute>
          }
        />
        
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}
