const Console = require('../models/Console')
const CryptoJS = require("crypto-js");
const CHAVE_SECRETA = 'LOW_KEY'

const cadastrar= async (req, res) => {
    const valores = req.body

    if(!valores.modelo || !valores.marca || !valores.numSerie || !valores.tipo || !valores.idCliente){
        return res.status(422).json({ message: 'Preencha todos os campos!'})
    }

    try {
        const numSerie = CryptoJS.AES.encrypt(valores.numSerie,CHAVE_SECRETA).toString();
        await Console.create({
            modelo: valores.modelo,
            marca: valores.marca,
            numSerie: numSerie,
            tipo: valores.tipo,
            idCliente: valores.idCliente
        })
        return res.status(201).json({ message: 'Console cadastrado!'})
    } catch (err) {
        return res.status(500).json({ message: `Erro ao cadastrar console!` })
    }
}

const consultar = async (req, res) => {
    const serie = req.params.serie

    try {
        const consoles = await Console.findAll()

        const encontrado = consoles.find(c => {
            const bytes = CryptoJS.AES.decrypt(c.numSerie, CHAVE_SECRETA)
            return bytes.toString(CryptoJS.enc.Utf8) === serie
        })

        if (!encontrado) {
            return res.status(404).json({ message: 'Console não encontrado!' })
        }

        return res.status(200).json({
            codConsole: encontrado.codConsole,
            modelo: encontrado.modelo,
            marca: encontrado.marca,
            numSerie: serie,
            tipo: encontrado.tipo,
            idCliente: encontrado.idCliente
        })
    } catch (err) {
        console.error('Erro ao consultar :', err)
        return res.status(500).json({ message: 'Erro ao consultar!' })
    }
}

module.exports = { cadastrar , consultar }