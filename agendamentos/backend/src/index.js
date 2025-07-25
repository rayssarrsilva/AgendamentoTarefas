const express = require('express');
const cors = require('cors');
const userRoutes = require('./presentation/userRoutes');
const agendamentoRoutes = require('./presentation/agendamentoRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// use as rotas diretamente
app.use('/api', userRoutes);

app.use('/api', agendamentoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

