const e = require("express");
const userService = require("../service/user.js");
const { user } = require("../config/database.js");

async function getAllUser(req, res) {
    try {
        const rows = await userService.getAllUser();

        res.status(200).json(rows);
    }catch(error) {
        res.status(500).send({
            message: "Error getting users",
            body: error.message,
        });
    }
}

async function createUser(req, res){
    const { name, password, email } = req.body;

    try{
        await userService.createUser(name, password, email);

        res.status(201).json({
            message: "Success!"
        });
    }catch(error) {
        res.status(500).send({
            message: "Error adding user!",
            error: error.message,
        });
    }
}

async function updateUser(req, res) {
    try{
        const { id } = req.params;
        const { name, password, email } = req.params;

        await userService.updateUser(id, name, password, email);

        res.status(204).json("Success");
    }catch(error) {
        res.status(500).send({
            message: ("Error updating user!"),
            body: error.message,
        })
    }
}

module.exports = {
    getAllUser,
    createUser,
    updateUser,
}