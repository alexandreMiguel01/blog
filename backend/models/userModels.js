const db = require(`../db/connection`)


async function createUser(name, age, email, password) {
    try {
        if(!name || !email || !password || age == null) {
            throw new Error(`Dados invalidos`)
        }

        const [result] = await db.query(
            `INSERT INTO users(name, age, email, password) VALUES(?, ?, ?, ?)`,
            [name, age, email, password]
        )
        return result.insertId
    }catch(error) {
        console.error(error)
        throw error;
    }
}

async function findUserByEmail(email) {
    try {
        if(!email) {
            throw new Error(`Dados invalidos`)
        }

        const [rows] = await db.query(
            `SELECT * FROM users WHERE email = ?`,
            [email]
        )
        return rows[0];
    }catch(error) {
        console.error(error)
        throw error;
    }
}

async function getUsers() {
    try {
        const [rows] = await db.query(
            `SELECT * FROM users`
        )
        return rows;
    }catch(error) {
        console.error(error)
        throw error;
    }
}

async function getUserById(id) {
    try {
        if(!id || isNaN(id)) {
            throw new Error(`Dados invalidos`)
        }

        const [rows] = await db.query(
            `SELECT * FROM users WHERE id = ?`,
            [id]
        )
        return rows[0]
    }catch(error) {
        console.error(error)
        throw error;
    }
}

async function updateUser(id, name, age, email ) {
    try {
        if(!id || isNaN(id)) {
            throw new Error(`Dados invalidos`)
        }
        if(!name || !email || !password || age == null) {
            throw new Error(`Dados invalidos`)
        }
        
        const [result] = await db.query(
            `UPDATE users SET name = ?, email = ?, password = ?, age = ? WHERE id = ?`,
            [name, email, password, age, id]
        )
        return result.affectedRows;
    }catch(error) {
        console.error(error)
        throw error;
    }
}

async function deleteUser(id) {
    try {
        if(!id || isNaN(id)) {
            throw new Error(`Dados invalidos`)
        }

        const [result] = await db.query(
            `DELETE FROM users WHERE id = ?`,
            [id]
        )
        return result.affectedRows;
    }catch(error) {
        console.error(error)
        throw error;
    }
}

module.exports = {
    createUser,
    findUserByEmail,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}