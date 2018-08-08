const express = require('express');
const cors = require('cors');
const errorHandler = require('./handlers/error');
const app = express();
app.use(express.json());
app.use(cors());


app.use(function (req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
})
app.use(errorHandler);

const PORT = 8081;
app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`);
})