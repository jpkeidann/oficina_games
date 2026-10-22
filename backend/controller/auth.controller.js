const Agendamento = require("../models/Agendamento");
const Cliente = require("../models/Cliente");
const Console = require("../models/Console");

const login = async (req ,res) => {
    const valores = req.body
    if(!email || !senha){
        return res.status(422).json({ message: 'Preencha todos os campos!'})
    }
    
    try {
        const cliente = await Cliente.findOne({where: {email: valores.email}}) 
        
        if(!cliente){
            return res.status(400).json({ message: 'Email ou senha incorreto!'})
        }

        
    } catch (error) {
        
    }
}