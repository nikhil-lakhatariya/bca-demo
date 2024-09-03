const { User } = require('../models/UserModel');
const { comparePassword, generateUserToken } = require('../helpers/Validation');

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {

        if (!email) {
            return res.status(404).send({ status: 404, message: "Email is require" });
        }

        if (!password) {
            return res.status(404).send({ status: 404, message: "Password is require" });
        }

        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            return res.status(404).send({ status: 404, message: "User Not Found" });
        }

        const checkPassword = comparePassword(existingUser.password, password);
        if (!checkPassword) {
            return res.status(404).send({ status: 404, message: "Password is Incorrect" });
        }

        const token = generateUserToken(existingUser._id, existingUser.name, existingUser.email, existingUser.role);
        return res.status(200).send({ status: 200, message: "Login Successfully", token });
    } catch (error) {
        res.status(400).send({ status: 400, message: "Error", error });
    }
}

module.exports = { loginUser }