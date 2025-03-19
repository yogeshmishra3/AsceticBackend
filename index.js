const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/tasksRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/tasks', taskRoutes);

const PORT = 5001;
app.listen(5001, '0.0.0.0', () => {
    console.log('Server running on http://0.0.0.0:5000');
});
