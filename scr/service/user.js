const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function getAllUser() {
    const connection = await mysql.createConnection(databaseConfig);

    const [rows] = await connection.query("SELECT * FROM user");

    await connection.end();

    return rows;
}

async function createUser(name, password, email) {
    const connection = await mysql.createConnection(databaseConfig);

    const insertUser = "INSERT INTO user(name, password, email) VALUES(?, ?, ?)";

    await connection.query(insertUser, [name, password, email]);

    await connection.end();
}

async function updateUser(id, name, password, email) {
    const connection = await mysql.createConnection(databaseConfig);

    const updateUser = "UPDATE user SET name = ?, password = ?, email = ? WHERE id = ?";

    await connection.query(updateUser, [name, password, email, id]);

    await connection.end();
}

async function deleteUser(id) {
    const connection = await mysql.createConnection(databaseConfig);

    await connection.query("DELETE FROM user WHERE id = ?", [id]);

    await connection.end();
}

async function getUserById(id) {
    const connection = await mysql.createConnection(databaseConfig);

    const [user] = await connection.query("SELECT * FROM user WHERE id = ?", [id]);

    await connection.end();

    return user;
}

module.exports = {
    getAllUser,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
}