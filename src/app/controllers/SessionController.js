const { User } = require('../models')

class SessionControler {
  async create (req, res) {
    return res.render('auth/signin')
  }
  async store (req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })

    if (!user) {
      console.log('Usuário não encontrado')
      req.flash('error', 'Usuário não encontrado')
      return res.redirect('/')
    }

    if (!(await user.checkPassword(password))) {
      console.log('Senha incorreta')
      req.flash('error', 'Senha incorreta')
      return res.redirect('/')
    }
    req.session.user = user
    console.log('sessioncontroller')
    console.log(req.session.user)
    // Quando vem de post, salvar a sessao??
    req.session.save(function (err) {
      if (err) {
        console.log(err)
      }
      return res.redirect('/app/dashboard')
    })
  }

  destroy (req, res) {
    req.session.destroy(() => {
      res.clearCookie('root') // Nome da sessao no arquivo server
      return res.redirect('/')
    })
  }
}

module.exports = new SessionControler()
