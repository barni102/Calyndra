const router = require("express").Router();
const verify = require("../helpers/verifyToken");
const Todo = require("../model/Todo");

router.post("/post", verify, async (req, res) => {
    const todo = new Todo({
        user_id: req.user._id,
        title: req.body.title,
        description: req.body.description,
        deadline: req.body.deadline
    })

    try {
        const savedTodo = await todo.save();
        res.send({ savedTodo })
    } catch (err) {
        res.status(400).send(err.message);
    }

})

router.get("/get", verify, async (req, res) => {
    try {
        const getTodo = await Todo.find({ user_id: req.user._id, isdone: false });
        res.send({ getTodo });
    } catch (err) {
        res.status(400).send(err.message);
    }
})


router.get("/get/:uid", verify, async (req, res) => {
    try {
        const getTodo = await Todo.findOne({ user_id: req.user._id, _id: req.params.uid });
        res.send({ getTodo });
    } catch (err) {
        res.status(400).send(err.message);
    }
})

module.exports = router;