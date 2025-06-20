import { useState } from 'react';

export default function RegisterForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'colaborador',
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Nome</label>
        <input
          type="text"
          name="name"
          className="w-full border px-3 py-2 rounded"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          className="w-full border px-3 py-2 rounded"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Senha</label>
        <input
          type="password"
          name="password"
          className="w-full border px-3 py-2 rounded"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Tipo de Usuário</label>
        <select
          name="role"
          className="w-full border px-3 py-2 rounded"
          value={form.role}
          onChange={handleChange}
        >
          <option value="colaborador">Colaborador</option>
          <option value="admin">Administrador</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Cadastrar
      </button>
    </form>
  );
}
