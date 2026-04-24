const userModel = require(`../models/userModels`)
const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);

async function userRegister(req, res) {
    try {
        const {name, email, password, age} = req.body;
        if(!name || !email || !password || age == null) {
            return res.status(400).json({error: `Preencha todos os campos`})
        }

        const existingUser = await userModel.findUserByEmail(email)
        
        if(existingUser) {
            return res.status(400).json({error: `Usuário já existe`})
        }

        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)

        const insertId = await userModel.createUser(name, age, email, passwordHash)

        return res.status(201).json({message: `Usuário criado`, id: insertId})
    }catch(error) {
        console.error(error)
        return res.status(500).json({error: `Erro ao tentar criar usuário`})
    }
}

async function userlogin(req, res) {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({error: `Preencha todos os campos`})
        }
        const user = await userModel.findUserByEmail(email)
        console.log(user)
        if(!user) {
            return res.status(404).json({error: `Usuário não econtrado`})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({error: `Email ou senha invalidos`})
        }

        const token = jwt.sign(
            {id: user.id},
            `Senha_secreta1001`,
            {expiresIn: `1h`}
        );

        return res.status(200).json({token, userId: user.id})
    }catch(error) {
        console.error(error)
        return res.status(500).json({error: `Erro ao tentar fazer login tente novamente`})
    }
}

async function getUsers(req, res) {
    try {
        const users = await userModel.getUsers()

        return res.status(200).json(users)
    }catch(error) {
        console.error(error)
        return res.status(500).json({error: `Erro ao buscar usuários`})
    }
}

async function getUserById(req, res) {
    try {
        const {id} = req.params;

        if(!id || isNaN(id)) {
            return res.status(400).json({error: `Dados invalidos`})
        }

        const user = await userModel.getUserById(id)
        if(!user) {
            return res.status(404).json({error: `Nenhum usuário foi encontrado`})
        }
        return res.status(200).json(user)
    }catch(error) {
        console.error(error)
        return res.status(500).json({error: `Erro ao buscar usuários`})
    }
}

async function updateUser(req, res) {
    try {
        const {id} = req.params;
        const {name, email, age} = req.body;

        if(!id || isNaN(id)) {
            return res.status(400).json({error: `Dados invalidos`})
        }
        if(!name || !email || age == null) {
            return res.status(400).json({error: `Preencha todos os campos`})
        }

        const affectedRows = await userModel.updateUser(id, name, email, age)

        if(affectedRows === 0) {
            return res.status(404).json({error: `Nenhum usuario foi encontrado`})
        }

        return res.status(200).json({message: `Usuário atualizado!`})
    }catch(error) {
        console.error(error)
        return res.status(500).json({error: `Erro ao tentar atualizar usuário`})
    }
}

async function deleteUser(req, res) {
    try {
        const {id} = req.params;
        if(!id || isNaN(id)) {
            return res.status(400).json({error: `Dados invalidos`})
        }

        const affectedRows = await userModel.deleteUser(id)
        if(affectedRows === 0) {
            return res.status(404).json({error: `Nenhum usuário foi encontrado`})
        }
        return res.status(200).json({message: `Usuário removido`})
    }catch(error) {
        console.error(error)
        return res.status(500).json({error: `Erro ao tentar remover usuario`})
    }
}

module.exports = {
    userRegister,
    userlogin,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}