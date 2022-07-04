const express = require('express');
const createError = require('http-errors');
const path = require('path');
var logger = require('morgan');
const cors = require('cors');
require('dotenv').config()

let testsRoutes = require('./routes/index')

var app = express();
/* var Agenda = require("agenda");
var Agendash = require("agendash");

var agenda = new Agenda({ db: { address: "mongodb://127.0.0.1/agendaDb" } });

 */



app.use(function(err, req, res, next) {
 
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

const PORT = 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', testsRoutes);
//app.use("/dash", Agendash(agenda));

app.use(function(req, res, next) {
    next(createError(404));
});

app.listen(PORT, ()=> console.log(`backend running on port ${PORT}`))