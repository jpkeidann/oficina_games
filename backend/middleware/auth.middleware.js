const CryptoJS = require("crypto-js");
const CHAVE_SECRETA = 'LOW_KEY'

function authMiddleware( req , res , next ){
    const token = req.headers['authorization']

    if(!token){
        return res.status(403).json('Acesso negado!')
    }
    
    try {
        const bytes  = CryptoJS.AES.decrypt(token, CHAVE_SECRETA);
        const tokenDecript = bytes.toString(CryptoJS.enc.Utf8);
        
        if(!tokenDecript){
            return res.status(403).json('Acesso negado!')
        }
        
        const payload = JSON.parse(tokenDecript)
        
        if(Date.now() > payload.expiraEm){
            return res.status(408).json('Tempo de sessão expirado!')
        }

        req.usuario = payload

        next()
    } catch (err) {
        
    }
}