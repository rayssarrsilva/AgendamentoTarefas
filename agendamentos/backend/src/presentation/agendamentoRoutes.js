const express = require('express');
const authenticateToken = require('../infrastructure/authMiddleware');
const checkRole = require('../infrastructure/checkRole');

const AgendamentoRepositorySQLite = require('../infrastructure/AgendamentoRepositorySQLite');
const CreateAgendamento = require('../application/CreateAgendamento');

const router = express.Router();
const agendamentoRepo = new AgendamentoRepositorySQLite();
const createAgendamento = new CreateAgendamento(agendamentoRepo);

// 🔐 Apenas usuários autenticados podem acessar essas rotas

// 📌 Criar novo agendamento (qualquer usuário)
router.post('/agendamentos', authenticateToken, async (req, res) => {
  try {
    const { titulo, descricao, dataHora } = req.body;
    const userId = req.user.id;

    const novo = await createAgendamento.execute({ titulo, descricao, dataHora, userId });
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📌 Ver todos os agendamentos (apenas admin)
router.get('/agendamentos', authenticateToken, checkRole('admin'), async (req, res) => {
  try {
    const agendamentos = await agendamentoRepo.findAll();
    res.json(agendamentos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Ver apenas os agendamentos do colaborador autenticado
router.get('/agendamentos/meus', authenticateToken, async (req, res) => {
  try {
    const agendamentos = await agendamentoRepo.findByUserId(req.user.id);
    res.json(agendamentos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Atualizar status (apenas admin)
router.put('/agendamentos/:id/status', authenticateToken, checkRole('admin'), async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    const result = await agendamentoRepo.updateStatus(id, status);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📌 Deletar agendamento (apenas admin)
router.delete('/agendamentos/:id', authenticateToken, checkRole('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const result = await agendamentoRepo.delete(id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
