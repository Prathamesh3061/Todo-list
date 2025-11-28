const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db.js");

const app = express();

// global middleware
// 1.parse incoming json requests (req.body)

app.use(express.json());

// 2.enable cross-origin resource sharing (allows to talk to backend)
app.use(cors());

//database connection
connectDB();

//Mount routes
// any request starting with /api/auth goes to authRoutes
app.use('/api/auth', require('./routes/authRoutes.js'));
// any request starting with /api/todos goes to todoRoutes
app.use('/api/todos', require('./routes/todoRoutes.js'));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});