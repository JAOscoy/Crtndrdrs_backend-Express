const express = require('express');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { body } = req;
    const user = await sequelize.models.users.findOne({ where: {
      email: body.email,
    }});
    // Verify if user exists
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // Verify password
    if (!user.validPassword(body.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  
    // Generate a token
    const token = jwt.sign({ userId: user.id }, 'secretkey', {
      expiresIn: 36000,
    });
    
    // 
    return res.json({
      message: 'Authenticated sucessfully',
      token,
    });
  });

router.post('/signup', (req, res) => {
  // TODO: Add logic for register a new user
});

module.exports = router;