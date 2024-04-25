const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async (req, res) => {
    const { email, password } = req.body;

    const isExists = await User.findOne({ email: email });

    if (isExists) {
        res.send({ message: "User already exists, Please Login" });
    } else {
        bcrypt.hash(password, Number(process.env.ROUNDS), async function (err, hashedPassword) {
            if (err) {
                res.send({ message: err.message });
            } else {
                const newUser = await User({
                    email: email,
                    password: hashedPassword
                });

                await newUser.save();
                res.send({ message: "User registered successfully" })
            }
        })
    }

}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const isExists = await User.findOne({ email: email });
    if (isExists) {
        bcrypt.compare(password, isExists.password, function (err, result) {
            if (err) {
                res.send({ message: err });
            } else {
                if (result) {
                    const token = jwt.sign({ userId: isExists._id, userEmail: isExists.email }, process.env.SECRETKEY);
                    const { password, ...rest } = isExists._doc;
                    res.send({ "token": token, user: rest })
                } else {
                    res.send({ message: "Wrond credentials" })
                }
            }
        })
    } else {
        res.send({ message: "User doesn't exists, Please Register first." })
    }
}


module.exports = {
    registerUser,
    loginUser,
}
