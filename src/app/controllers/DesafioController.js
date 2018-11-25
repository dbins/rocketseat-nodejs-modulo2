const moment = require('moment')
const { User, Appointment } = require('../models')

class DesafioController {
  async index (req, res) {
    const providers = await Appointment.findAll({
      include: [
        {
          model: User
        }
      ]
    })
    // Apenas para testar o retorno
    // providers.forEach((product, index) => {
    // console.log(index)
    //  console.log(product)
    // console.log(product.User.name)
    // })

    const resultados = providers.map(item => {
      return {
        nome: item.User.name,
        data: moment(item.date).format('DD/MM/YYYY'),
        horario: moment(item.date).format('HH:mm')
      }
    })
    console.log(resultados)

    return res.render('desafio/index', { resultados })
  }

  async index2 (req, res) {
    const providers = await Appointment.findAll({
      where: { provider_id: req.params.usuario },
      include: [
        {
          model: User
        }
      ]
    })
    const resultados = providers.map(item => {
      return {
        nome: item.User.name,
        data: moment(item.date).format('DD/MM/YYYY'),
        horario: moment(item.date).format('HH:mm')
      }
    })
    return res.render('desafio/index2', { resultados })
  }
}

module.exports = new DesafioController()
