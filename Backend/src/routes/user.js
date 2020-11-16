const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidation } = require("../helpers/validation");

router.post("/register", async (req, res) => {

    //Validate
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Cheking if the user is already in the database
    const userExist = await User.findOne({ username: req.body.username });
    if (userExist) return res.status(400).send('user already exists');

    // Cheking if the email is already taken in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('email is  already exist');

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);


    //Create a new user
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        created_date: new Date().toISOString()
    })

    try {
        const savedUser = await user.save();
        res.send({ savedUser })
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;