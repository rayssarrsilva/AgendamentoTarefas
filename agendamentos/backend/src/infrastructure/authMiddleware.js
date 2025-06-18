const jwt = require('jsonwebtoken');
const SECRET = 'segredo-super-seguro'; // idealmente use process.env

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  // Exemplo: Authorization: Bearer <token>
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token não enviado' });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });

    req.user = user; // injeta os dados do token no req
    next(); // continua para a próxima função
  });
}

module.exports = authenticateToken;
