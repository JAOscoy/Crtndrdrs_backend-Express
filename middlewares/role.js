// Verify administrator credentials to access specific functionalities

module.exports = (req, res, next) => {
    const { nivelAcceso } = req.user;
  
    if (nivelAcceso !== "ADMIN") {
      res.status(401).json({
        message: "No eres administrador",
        code: "NO_ADMIN"
      });
    } else {
      next();
    }
  }