const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express()

const regionRoutes = require('./src/routes/regionRoute');
const userRoutes = require('./src/routes/userRoute');
const authRoutes = require('./src/routes/authRoute');
const cloudinaryRoutes = require('./src/routes/cloudinaryRoute');
const { errorHandler } = require('./src/middleware/errorHandler');

require('dotenv').config()

app.use(cors({
    origin: '*'
}));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', regionRoutes);
app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', cloudinaryRoutes);

/** ERROR HANDLER */
app.use(errorHandler);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})