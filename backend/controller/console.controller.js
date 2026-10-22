const Console = require('../models/Console')
const CryptoJS = require("crypto-js");
const CHAVE_SECRETA = 'LOW_KEY'

const cadastrar= async (req, res) => {
    const valores = req.body

    if(!modelo || !marca || !numSerie || !tipo || !idCliente){
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
        return res.status(500).json({ message: 'Erro ao cadastrar console!' })
    }
}

const consultar = async (req, res) => {
    const id = req.params.id
    try {
        const console = await Console.findByPk(id)
        if(!console){
            return res.status(404).json({ message: 'não foi possível encontrar o console!' })
        }
        return res.status(201).json(console)
        
    } catch (err) {
        return res.status(500).json({ message: 'houve um problema ao consultar o console!' })
    }
}

module.exports = { cadastrar , consultar }