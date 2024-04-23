const { Router } = require("express");
const { createTask, getTasks, updateTask, deleteTask } = require("../controllers/taskController");

const taskRouter = Router();

taskRouter.post('/', createTask);
taskRouter.get('/', getTasks);
taskRouter.put('/:id', updateTask);
taskRouter.delete('/:id', deleteTask);

taskRouter.get('/filter', async (req, res) => { });

module.exports = { taskRouter };
