class CreateAgendamento {
  constructor(agendamentoRepo) {
    this.agendamentoRepo = agendamentoRepo;
  }

  async execute({ titulo, descricao, dataHora, userId }) {
    const agendamento = {
      titulo,
      descricao,
      dataHora,
      userId,
      status: 'pendente'
    };

    return await this.agendamentoRepo.create(agendamento);
  }
}

module.exports = CreateAgendamento;
