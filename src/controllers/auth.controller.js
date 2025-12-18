const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        const userExist = await userModel.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "User already exist" });
        }

        const hashPass = await bcrypt.hash(password, 10);
        console.log('hashPass: ', hashPass);

        const result = await userModel.create({
            name,
            email,
            password: hashPass,
            phone,
            address: {
                street: address.street,
                city: address.city,
                state: address.state,
                zip: address.zip
            }
        });

        const token = jwt.sign({ userId: result._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({
            message: 'User registered successfully', data: { token, result }
        });

    } catch (error) {
        console.error('error at register admin: ', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const registerAdmin = async (req, res) => {
    try {

        const { name, email, password, phone, address } = req.body;

        const userExist = await userModel.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "User already exist" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await userModel.create({
            name, email, password: hashedPassword, phone, role: 'admin', address: {
                street: address.street,
                city: address.street,
                state: address.state,
                zip: address.zip,
            }
        })

        const token = jwt.sign({ userId: result._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({
            message: 'Admin registered successfully', data: { token, result }
        });
    } catch (error) {
        console.error('error at register admin: ', error);
        return res.status(500).json({ message: "internal server error" })
    }
}
//approach -->signup
//1.take data form req.body 
//2.check the type of data coming and udefined or not 
//3.hash password
//save to db

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('password: ', password);
        console.log('email: ', email);

        if (!password || !email) {
            return res.status(400).json({ message: "Invalid email or password" })

        }

        if (typeof email !== "string") {
            return res.status(400).json({ message: "email is required" })
        }

        if (typeof password !== "string") {
            return res.status(400).json({ message: "password is required" })
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(404).json({ message: "Invalid credentials" });

        }

        const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '60d' })

        return res.status(200).json({ message: 'user login successfully', data: { accessToken, refreshToken, user } })
    } catch (error) {
        console.error('error at signup: ', error);
        return res.status(500).json({ message: "internal server error" })

    }
}

module.exports = {
    registerUser,
    registerAdmin,
    signin
};
