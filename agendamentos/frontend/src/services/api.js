import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api', // Ajuste se seu backend tiver outra porta ou prefixo
});

export default api;
