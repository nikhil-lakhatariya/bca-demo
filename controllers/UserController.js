const { User } = require('../models/UserModel');
const { hashPassword } = require('../helpers/Validation');

const createUser = async (req, res) => {
    const { name, role, email, password } = req.body;
    try {
        const obj = new User({
            name,
            role,
            email,
            password: hashPassword(password)
        });


        if (!name) {
            return res.status(404).send({ status: 404, message: "Name is require" });
        } else if (!email) {
            return res.status(404).send({ status: 404, message: "Email is require" });
        } else if (!password) {
            return res.status(404).send({ status: 404, message: "Password is require" });
        }

        const emailExisting = await User.findOne({ email: email });
        if (!emailExisting) {
            let data = await obj.save();
            return res.status(201).send({ status: 201, message: "User Create Successfully", data });
        }
        return res.status(401).send({ status: 401, message: "Email is Already Exists" });
    } catch (error) {
        res.status(400).send({ status: 400, message: "Error", error });
    }
}

const getAllUser = async (req, res) => {
    try {
        const users = await User.find({ role: "User" });
        return res.status(200).send({ status: 200, message: "Users retrieved successfully", totalData: users.length, users });
    } catch (error) {
        res.status(400).send({ status: 400, message: "Error", error });
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const userData = await User.findById({ _id: id });
        if (userData == null) {
            return res.status(404).send({ status: 404, message: "User Not Found" });
        }
        return res.status(200).send({ status: 200, message: "User retrieved successfully", data: userData });
    } catch (error) {
        res.status(400).send({ status: 400, message: "Error", error });
    }
}

const updateUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({ _id: req.body._id });
        if (!existingUser) {
            return res.status(404).send({ status: 404, message: "User Not Found" });
        }

        let data = await User.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true });
        return res.status(200).send({ status: 200, message: "User Update Successfully", data });
    } catch (error) {
        res.status(400).send({ status: 400, message: "Error", error });
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const userData = await User.findOne({ _id: id });
        if (!userData) {
            return res.status(404).send({ status: 404, message: "User Not Found" });
        }

        await User.findOneAndDelete({ _id: id });
        return res.status(200).send({ status: 200, message: `User Deleted Successfully with Id:${id}` })
    } catch (error) {
        res.status(400).send({ status: 400, message: "Error", error });
    }
}

module.exports = {
    createUser,
    getAllUser,
    getUserById,
    updateUser,
    deleteUser
}