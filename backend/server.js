const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 5000;
const connectDB = require('./Config/db');

connectDB();
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/work', require('./routes/routes'));
app.use('/api/users', require('./routes/userRoutes'));


app.listen(port, () => console.log(`Server started on port ${port}`));
