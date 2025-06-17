const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET = 'segredo-super-seguro'; // você pode usar process.env depois

class LoginUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error('Usuário não encontrado');

    const senhaValida = await bcrypt.compare(password, user.password);
    if (!senhaValida) throw new Error('Senha incorreta');

    const token = jwt.sign(
      { id: user.id, role: user.role },
      SECRET,
      { expiresIn: '1h' }
    );

    return { token, user: { id: user.id, name: user.name, role: user.role } };
  }
}

module.exports = LoginUser;
