const Cliente = require('../models/Cliente')
const CryptoJS = require("crypto-js");
const CHAVE_SECRETA = 'LOW_KEY'

const cadastrar = async (req, res) => {
    const valores = req.body

    if(!nome || !email || !senha || !cpf || !telefone){
        return res.status(422).json({ message: 'Preencha todos os campos!'})
    }
    
    try {
        const senha = CryptoJS.AES.encrypt(valores.senha,CHAVE_SECRETA).toString();
        const cpf = CryptoJS.AES.encrypt(valores.cpf,CHAVE_SECRETA).toString();

        await Cliente.create({
            nome: valores.nome,
            email: valores.email,
            senha: senha,
            cpf: cpf,
            telefone: valores.telefone
        })
        return res.status(201).json({ message: 'Cliente cadastrado com sucesso!' })
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao cadastrar cliente!' })
    }
}

const listar = async (req, res) => {
    try {
        const clientes = await Cliente.findAll()
        let resultado = []
        let cpfDescriptografado = ''
        clientes.forEach(el => {
            const bytes  = CryptoJS.AES.decrypt(el.cpf, CHAVE_SECRETA);
            cpfDescriptografado = bytes.toString(CryptoJS.enc.Utf8);
            resultado.push({
                nome: el.nome,
                email: el.email,
                cpf: cpfDescriptografado,
                telefone: el.telefone
            })
        });
        return res.status(201).json(resultado)
    } catch (err) {
        return res.status(500).json({ message: 'houve um problema ao listar os clientes!' })
    }
}

module.exports = { cadastrar , listar }