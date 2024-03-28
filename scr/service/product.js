const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function getAllProduct() {
    const connection = await mysql.createConnection(databaseConfig);

    const [rows] = await connection.query("SELECT * FROM product");

    await connection.end();

    return rows;
}

async function createProduct(descricao, quantidadeEstoque, unidadeMedida, valorUnidade) {
    const connection = await mysql.createConnection(databaseConfig);

    const insertProduct = "INSERT INTO product(descricao, quantidadeEstoque, unidadeMedida, valorUnidade) VALUES(?, ?, ?, ?)";

    await connection.query(insertProduct, [descricao, quantidadeEstoque, unidadeMedida, valorUnidade]);

    await connection.end();
}

async function updateProduct(id, descricao, quantidadeEstoque, unidadeMedida, valorUnidade) {
    const connection = await mysql.createConnection(databaseConfig);

    const updateProduct = "UPDATE product SET descricao = ?, quantidadeEstoque = ?, unidadeMedida = ?, valorUnidade = ? WHERE id = ?";

    await connection.query(updateProduct, [descricao, quantidadeEstoque, unidadeMedida, valorUnidade, id]);

    await connection.end();
}

async function deleteProduct(id) {
    const connection = await mysql.createConnection(databaseConfig);

    await connection.query("DELETE FROM product WHERE id = ?", [id]);

    await connection.end();
}

async function getProductById(id) {
    const connection = await mysql.createConnection(databaseConfig);

    const [product] = await connection.query("SELECT * FROM product WHERE id = ?", [id]);

    await connection.end();

    return product;
}

module.exports = {
    getAllProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
}