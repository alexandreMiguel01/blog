const db = require(`../db/connection`)

async function createPost(userid, title, content) {
    try {
        if(!userid || isNaN(userid)) {
            throw new Error(`Dados invalidos`)
        }
        if(!title || !content) {
            throw new Error(`Dados invalidos`)
        }

        const [result] = await db.query(
            `INSERT INTO posts(user_id, title, content) VALUES(?, ?, ?)`,
            [userid, title, content]
        )
        return result.insertId
    }catch(error) {
        console.error(error)
        throw error;
    }
}

async function getPosts() {
    try {
        const [rows] = await db.query(
        `SELECT 
        posts.id,
        posts.title,
        posts.content,
        posts.user_id AS userId,
        users.name AS author
        FROM posts
        JOIN users ON posts.user_id = users.id`
        )
        return rows;
    }catch(error) {
        console.error(error)
        throw error;
    }
}

async function getPostById(id) {
    try {
        if(!id || isNaN(id)) {
            throw new Error(`Dados invalidos`)
        }

        const [rows] = await db.query(
            `SELECT id, title, content, user_id AS userId FROM posts WHERE id = ?`,
            [id]
        )
        return rows[0]
    }catch(error) {
        console.error(error)
        throw error;
    }
}

async function getPostsByUser(userId) {
    try {
        if(!userId || isNaN(userId)) {
            throw new Error(`Dados invalidos`)
        }
        const [rows] = await db.query(
            `SELECT * FROM posts WHERE user_id = ?`,
            [userId]
        )
        return rows;
    }catch(error) {
        console.error(error)
        throw error;
    }
}

async function updatePost(id, title, content) {
    try {
        if(!id || isNaN(id)) {
            throw new Error(`Dados invalidos`)
        }

        if(!title || !content) {
            throw new Error(`Dados invalidos`)
        }

        const [result] = await db.query(
            `UPDATE posts SET title = ?, content = ? WHERE id = ?`,
            [title, content, id]
        )
        return result.affectedRows;
    }catch(error) {
        console.error(error)
        throw error;
    }
}

async function deletePost(id) {
    try {
        if(!id || isNaN(id)) {
            throw new Error(`Dados invalidos`)
        }

        const [result] = await db.query(
            `DELETE FROM posts WHERE id = ?`,
            [id]
        )
        return result.affectedRows;
    }catch(error) {
        console.error(error)
        throw error;
    }
}

module.exports = {
    createPost,
    getPosts,
    getPostById,
    getPostsByUser,
    updatePost,
    deletePost
}