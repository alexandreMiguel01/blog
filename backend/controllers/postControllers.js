const postModel = require(`../models/postModels`)

async function createPost(req, res) {
    try {
        const userId = req.userId;
        const {title, content} = req.body;

        if(!userId || isNaN(userId)) {
            return res.status(400).json({error: `Dados invalidos`})
        }
        if(!title || !content) {
            return res.status(400).json({error: `Preencha todos os campos`})
        }

        const insertId = await postModel.createPost(userId, title, content)

        return res.status(201).json({message: `Post criado`, id: insertId})
    }catch(error) {
        console.error(error)
        return res.status(500).json({error: `Erro ao tentar criar o post`})
    }
}

async function getPosts(req, res) {
    try {
        const posts = await postModel.getPosts()

        return res.status(200).json(posts)
    }catch(error) {
        console.error(error)
        return res.status(500).json({error: `Erro ao tentar buscar posts`})
    }
}


async function getPostsByUser(req, res) {
    try {
        const {userId} = req.params;
        if(!userId || isNaN(userId)) {
            return res.status(400).json({error: `Dados invalidos`})
        }

        const posts = await postModel.getPostsByUser(userId)

        if(posts.length === 0) {
            return res.status(404).json({error: `Nenhum post foi encontrado`})
        }

        return res.status(200).json(posts)
    }catch(error) {
        console.error(error)
        return res.status(500).json({error: `Erro ao buscar posts deste usuario`})
    } 
}

async function updatePost(req, res) {
    try {
        const {id} = req.params;
        const {title, content} = req.body;
        
        if(!id || isNaN(id)) {
            return res.status(400).json({error: `Dados invalidos`})
        }
        if(!title || !content) {
            return res.status(400).json({error: `Preencha todos os campos`})
        }

        const post = await postModel.getPostById(id)
        if(!post) {
            return res.status(404).json({error: `Nenhum post foi encontrado!`})
        }

        if(post.userId !== req.userId) {
            return res.status(403).json({error: `Não tem permissão`})
        }

        const affectedRows = await postModel.updatePost(id, title, content)
        
        if(!affectedRows) {
            return res.status(404).json({error: `Nenhum post foi encontrado`})
        }

        return res.status(200).json({message:`Post atualizdo`})
    }catch(error) {
        console.error(error)
        return res.status(500).json({error: `Erro ao tentar atualizar o post`})
    }
}

async function deletePost(req, res) {
    try {
        const userId = req.userId;
        const {id} = req.params;
        if(!id || isNaN(id)) {
            return res.status(400).json({error: `Dados invalidos`})
        }

        const post = await postModel.getPostById(id)

        if(!post) {
            return res.status(404).json({error: `Nenhum post foi encontrado`})
        }

        if(post.userId !== req.userId) {
            return res.status(403).json({error: `Não tem permissão`})
        }

        const affectedRows = await postModel.deletePost(id)
        if(!affectedRows) {
            return res.status(404).json({error: `Nenhum post foi encontrado`})
        }

        return res.status(204).json({message: `Post removido com sucesso`})
    }catch(error) {
        console.error(error)
        return res.status(500).json({error: `Erro ao tentar remover o post`})
    }
}

module.exports = {
    createPost,
    getPosts,
    getPostsByUser,
    updatePost,
    deletePost
}