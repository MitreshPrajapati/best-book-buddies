const Task = require("../models/Task");

const createTask = async (req, res) => {
    const { userId, title, description, status, priority, dueDate } = req.body;
    // console.log(userId);
    const newTask = await Task({
        userId,
        title,
        description,
        status,
        priority,
        dueDate
    });

    await newTask.save();
    res.send({ message: 'Task saved successfully' })
}

const getTasks = async (req, res) => {
    const { userId } = req.body;
    try {
        const tasks = await Task.find({ userId });
        res.send(tasks);
    } catch (error) {
        res.send({ message: error })
    }
}
const deleteTask = async (req, res) => {
    const { id } = req.params;
    if (id) {
        const task = await Task.findByIdAndDelete({ _id: id, userId: req.body.userId });
        res.send({ message: "Task deleted" })
    } else {
        res.send({ message: "Task doesn't exists" });
    }
}
const updateTask = async (req, res) => {
    const { id } = req.params;
    const updatedTask = req.body;
    // console.log(updatedTask, id)
    const task = await Task.findByIdAndUpdate(id, updatedTask);
    if (task) {
        res.send({ message: 'Task updated successfully' });
    } else {
        res.send({ message: "Task doesn't exists." })
    }
}
// const filterTask 

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
}