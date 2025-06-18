class Agendamento {
  constructor(id, titulo, descricao, dataHora, userId, status) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.dataHora = dataHora;
    this.userId = userId;
    this.status = status; // pendente, confirmado, cancelado
  }
}

module.exports = Agendamento;
