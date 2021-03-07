module.exports = (req, res, next) => {
    const { role } = req.user;
  
    if (role !== "ADMIN") {
      res.status(401).json({
        message: "No eres administrador",
        code: "NO_ADMIN"
      });
    } else {
      next();
    }
  }