const bcrypt = require(
    "bcryptjs"
);

const jwt = require("jsonwebtoken");

const User = require(
    "../models/User"
);

const generateToken = require(
    "../utils/jwt"
);

exports.register = async (
    req,
    res,
    next
) => {
    try {
        console.log(
            "REGISTER REQUEST:",
            req.body
        );
        const {
            name,
            email,
            password
        } = req.body;

        const existingUser =
            await User.findOne({
                email
            });

        if (existingUser) {
            return res.status(400).json({
                message:
                    "Email already exists"
            });
        }

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );

        const user =
            await User.create({
                name,
                email,
                password:
                    hashedPassword
            });

        res.status(201).json({
            token:
                generateToken(user._id),
            user: {
                id: user._id,
                email: user.email
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.login = async (
    req,
    res,
    next
) => {
    try {
        const {
            email,
            password
        } = req.body;

        const user =
            await User.findOne({
                email
            });

        if (!user) {
            return res.status(401).json({
                message:
                    "Invalid credentials"
            });
        }

        const match =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!match) {
            return res.status(401).json({
                message:
                    "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        next(error);
    }
};