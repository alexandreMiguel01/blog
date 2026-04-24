const jwt = require(`jsonwebtoken`)

async function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader) {
            return res.status(401).json({error: `Token não fornecido`})
        }

        const token = authHeader.split(` `)[1];

        jwt.verify(token, `Senha_secreta1001`, (err, decoded) => {
            if(err) {
                return res.status(401).json({error: `Token invalido`})
            }
            
            req.userId = decoded.id

            next();
        });
    }catch(error) {
        console.error(error)
        return res.status(500).json({error: `Erro ao tentar na autenticação`})
    }
}

module.exports = {
    authMiddleware
}