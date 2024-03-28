const productService = require("../service/product.js");

async function getAllProduct(req, res) {
    try {
        const rows = await productService.getAllProduct();

        res.status(200).json(rows);
    }catch(error) {
        res.status(500).send({
            message: "Error getting products",
            body: error.message,
        });
    }
}

async function createProduct(req, res){
const { descricao, quantidadeEstoque, unidadeMedida, valorUnidade } = req.body;

try{
    await productService.createProduct(descricao, quantidadeEstoque, unidadeMedida, valorUnidade);

    res.status(201).json({
        message: "Success!"
    });
}catch(error) {
    res.status(500).send({
        message: "Error adding product!",
        error: error.message,
    });
}
}

async function updateProduct(req, res) {
try{
    const { id } = req.params;
    const { descricao, quantidadeEstoque, unidadeMedida, valorUnidade } = req.body;

    await productService.updateProduct(id, descricao, quantidadeEstoque, unidadeMedida, valorUnidade);

    res.status(200).send("Success");
}catch(error) {
    res.status(500).send({
        message: ("Error updating product!"),
        body: error.message,
    });
}
}

async function deleteProduct(req, res) {

try {
const { id } = req.params;

await productService.deleteProduct(id);

res.status(200).send({message: "Deleted Product!"});
} catch (error) {
    res.status(500).send({
        message: "Error deleting product!",
        error: error.message,
    })
}
}

async function getProductById(req, res) {
try {
    const { id } = req.params;

    const user = await productService.getProductById(id);

    res.status(200).json(user);
}catch(error) {
    res.status(500).send({
        message: "Error getting product by ID.",
        error: error.message,
    });
}
}

module.exports = {
    getAllProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
}