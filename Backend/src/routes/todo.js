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

router.post("/setdone/:uid", verify, async (req, res) => {
    const todo = await Todo.findOne({ user_id: req.user._id, _id: req.params.uid, isdone: false });
    if (!todo) return res.status(400).send("Todo is not Found or todo is done!");
    try {
        const savedTodo = await Todo.findOneAndUpdate({ _id: req.params.uid }, { isdone: true });
        res.send("Todo is done");
    } catch (err) {
        res.send(err.message);
    }
})

router.put("/update/:uid", verify, async (req, res) => {
    const todo = await await Todo.findOne({ user_id: req.user._id, _id: req.params.uid });
    if (!todo) return res.status(400).send("Todo is not Found!");
    if (Object.entries(req.body).length != 0) {


        if (req.body.title !== undefined) {
            todo.title = req.body.title;
        }

        if (req.body.description !== undefined) {
            todo.description = req.body.description;
        }

        if (req.body.deadline !== undefined) {
            todo.deadline = req.body.deadline;
        }


        try {
            const savedTodo = await Todo.findOneAndUpdate({ _id: req.params.uid }, todo)
            res.send("Update success!")
        } catch (err) {
            res.status(400).send(err.message);
        }
    } else {
        res.send("Give at least one argument!");
    }

})

router.delete("/delete/:uid", verify, async (req, res) => {
    try {
        const deletedTodo = await Todo.deleteOne({ user_id: req.user._id, _id: req.params.uid })
        res.send({ deletedTodo });
    } catch (err) {
        res.send(err.message);
    }
})

module.exports = router;