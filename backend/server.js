const express = require('express');
const cors = require('cors');
const { Connection } = require('./config/db');
const { userRouter } = require('./routes/user.route');
const { taskRouter } = require('./routes/task.route');
const { authenticateUser } = require('./middlewares/authentication');



const app = express();
app.use(express.json());
app.use(cors());


// Routes
app.get('/api', (req, res)=>{
    res.send("Welcome to taskmanager server.")
})

app.use('/users', userRouter);
app.use('/tasks', authenticateUser, taskRouter);



// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    try {
        await Connection;
        console.log(`listening on PORT ${PORT} `)
    } catch (err) {
        console.log('connection failed');
        console.log(err);
    }
})