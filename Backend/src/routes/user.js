const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const verify = require("../helpers/verifyToken");

router.post("/register", async (req, res) => {


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
        res.status(400).send(err.message);
    }
});

router.post("/login", async (req, res) => {
    // Cheking if the email exists
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send("Username is not Found!");
    //PASSWORD IS CORRECT
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid password!");

    //Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send(token);

});

router.put("/update", verify, async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).send("User is not Found!");
    if (Object.entries(req.body).length != 0) {


        if (req.body.email !== undefined) {
            user.email = req.body.email;
        }

        if (req.body.password !== undefined) {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            user.password = hashPassword;
        }

        if (req.body.firstname !== undefined) {
            user.firstname = req.body.firstname;
        }

        if (req.body.lastname !== undefined) {
            user.lastname = req.body.lastname;
        }

        user.modify_date = new Date().toISOString();


        try {
            const savedUser = await user.save();
            res.send({ savedUser })
        } catch (err) {
            res.status(400).send(err.message);
        }
    } else {
        res.send("Give at least one argument!");
    }


});

router.delete("/delete", verify, async (req, res) => {
    try {
        const deletedUser = await User.deleteOne({ _id: req.user._id })
        res.send({ deletedUser });
    } catch (err) {
        res.send(err.message);
    }
})


module.exports = router;