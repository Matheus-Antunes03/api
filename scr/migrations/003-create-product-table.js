const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function createProductTable() {
    try{
        const connection = await mysql.createConnection(databaseConfig);

        await connection.query(`USE ${databaseConfig.database}`)

        await connection.query(`CREATE TABLE IF NOT EXISTS product (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            descricao VARCHAR(255) NOT NULL,
            quantidadeEstoque INT NOT NULL,
            unidadeMedida VARCHAR(10) NOT NULL,
            valorUnidade INT NOT NULL
        )`);

        await connection.end();

        console.log("Table product created!");
    }catch(error) {
        console.log(`Error creating table product: ${error}`);
    }
}

createProductTable();