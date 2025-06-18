function checkRole(requiredRole) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({ error: 'Acesso não autorizado' });
    }
    next();
  };
}

module.exports = checkRole;
