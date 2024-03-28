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
        const { name, password, email } = req.body;

        await userService.updateUser(id, name, password, email);

        res.status(200).send("Success");
    }catch(error) {
        res.status(500).send({
            message: ("Error updating user!"),
            body: error.message,
        })
    }
}

async function deleteUser(req, res) {

    try {
    const { id } = req.params;

    await userService.deleteUser(id);

    res.status(200).send({message: "Deleted User!"});
    } catch (error) {
        res.status(500).send({
            message: "Error deleting user!",
            error: error.message,
        })
    }
}

async function getUserById(req, res) {
    try {
        const { id } = req.params;

        const user = await userService.getUserById(id);

        res.status(200).json(user);
    }catch(error) {
        res.status(500).send({
            message: "Error getting user by ID.",
            error: error.message,
        });
    }
}

module.exports = {
    getAllUser,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
};