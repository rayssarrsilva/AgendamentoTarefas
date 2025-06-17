const express = require('express');
const cors = require('cors');
const userRoutes = require('./presentation/userRoutes.js');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use(userRoutes); // ← Ativa as rotas POST /users e POST /login

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
