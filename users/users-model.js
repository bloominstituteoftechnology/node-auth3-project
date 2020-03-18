const bcrypt = require("bcryptjs")
const db = require("../database/config")

async function add(user) {
    user.password = await bcrypt.hash(user.password, 4)

    const [id] = await db("users").insert(user)
    return findById(id)
}

function find() {
    return db("users").select("id", "username", "department")
}

function findBy(filter) {
    return db("users")
        .select("id", "username", "password", "department")
        .where(filter)
}

function findById(id) {
    return db("users")
        .select("id", "username", "department")
        .where({ id })
        .first()
}

module.exports = {
    add,
    find,
    findBy,
    findById
}