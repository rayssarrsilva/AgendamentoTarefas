const sqlite3 = require('sqlite3').verbose();
const User = require('../domain/User');

class UserRepositorySQLite {
  constructor() {
    this.db = new sqlite3.Database('./agendamentos.db');
    this.db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT,
        role TEXT
      )
    `);
  }

  async create({ name, email, password, role }) {
    return new Promise((resolve, reject) => {
      this.db.run(
        `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
        [name, email, password, role],
        function (err) {
          if (err) reject(err);
          else resolve(new User(this.lastID, name, email, password, role));
        }
      );
    });
  }

  async findByEmail(email) {
    return new Promise((resolve, reject) => {
      this.db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
        if (err) reject(err);
        else resolve(row ? new User(row.id, row.name, row.email, row.password, row.role) : null);
      });
    });
  }

  async findById(id) {
    return new Promise((resolve, reject) => {
      this.db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row ? new User(row.id, row.name, row.email, row.password, row.role) : null);
      });
    });
  }
}

module.exports = UserRepositorySQLite;
