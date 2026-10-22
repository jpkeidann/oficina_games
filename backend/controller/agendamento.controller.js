const Agendamento = require('../models/Agendamento')

const cadastrar = async (req, res) => {
    const valores = req.body

    if(!data || !hora || !idConsole || !idCliente){
        return res.status(422).json({ message: 'Preencha todos os campos!'})
    }

    try {
        await Agendamento.create(valores)
        return res.status(201).json({ message: 'Agendamento cadastrado!'})
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao cadastrar agendamento!' })
    }
}

module.exports = { cadastrar }