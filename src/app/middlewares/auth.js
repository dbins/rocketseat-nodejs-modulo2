module.exports = (req, res, next) => {
  // Middlewares sempre tem req, res, next
  if (req.session && req.session.user) {
    res.locals.user = req.session.user // Nao pode passar sessao para a view, tem que usar locals
    return next()
  }
  return res.redirect('/')
}
