const { User } = require('../models')

class UserController {
  create (req, res) {
    return res.render('auth/signup')
  }
  async store (req, res) {
    // req.body.avatar = 'teste.jpg'
    const { filename: avatar } = req.file // Desestruturacao
    await User.create({ ...req.body, avatar }) // Spread operator
    return res.redirect('/')
  }
}

module.exports = new UserController()
