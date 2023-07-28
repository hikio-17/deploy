const express = require("express");
const cors = require('cors');
const morgan = require('morgan');

const app = express()

const regionRoutes = require('./src/routes/regionRoute');
const { errorHandler } = require('./src/middleware/errorHandler');

require('dotenv').config()

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))
app.use(express.json());

app.use('/api', regionRoutes);

/** ERROR HANDLER */
app.use(errorHandler);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})