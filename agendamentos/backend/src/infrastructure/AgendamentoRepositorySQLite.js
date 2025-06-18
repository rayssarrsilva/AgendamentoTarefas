const sqlite3 = require('sqlite3').verbose();
const Agendamento = require('../domain/Agendamento');

class AgendamentoRepositorySQLite {
  constructor() {
    this.db = new sqlite3.Database('./agendamentos.db');

    this.db.run(`
      CREATE TABLE IF NOT EXISTS agendamentos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT,
        descricao TEXT,
        dataHora TEXT,
        userId INTEGER,
        status TEXT
      )
    `);
  }

  async create({ titulo, descricao, dataHora, userId, status }) {
    return new Promise((resolve, reject) => {
      this.db.run(
        `INSERT INTO agendamentos (titulo, descricao, dataHora, userId, status) VALUES (?, ?, ?, ?, ?)`,
        [titulo, descricao, dataHora, userId, status],
        function (err) {
          if (err) reject(err);
          else resolve(new Agendamento(this.lastID, titulo, descricao, dataHora, userId, status));
        }
      );
    });
  }

  async findAll() {
    return new Promise((resolve, reject) => {
      this.db.all(`SELECT * FROM agendamentos`, [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  async findByUserId(userId) {
    return new Promise((resolve, reject) => {
      this.db.all(`SELECT * FROM agendamentos WHERE userId = ?`, [userId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  async updateStatus(id, status) {
    return new Promise((resolve, reject) => {
      this.db.run(`UPDATE agendamentos SET status = ? WHERE id = ?`, [status, id], function (err) {
        if (err) reject(err);
        else resolve({ updated: this.changes > 0 });
      });
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      this.db.run(`DELETE FROM agendamentos WHERE id = ?`, [id], function (err) {
        if (err) reject(err);
        else resolve({ deleted: this.changes > 0 });
      });
    });
  }
}

module.exports = AgendamentoRepositorySQLite;
