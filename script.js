const express = require('express')
const taskRouter = require('./routes/tasksRoute')
const mongoose = require('mongoose')
const chalk = require('chalk')
require('dotenv').config()

//СОЗДАЛИ СЕРВЕР
const server = express()
console.log(process)

//БИБИЛОТЕКА ДЛЯ ПОДКЛЮЧЕНИЯ MONGODB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log(chalk.blue('DB IS CONNECTED')))
    .catch(() => console.log(chalk.red('DB IS NOT CONNECTED')))
console.log()

//ОБРАБОТКА ДАННЫХ В REQ.BODY
server.use(express.json()) //middleware

//РОУТЫ, КОТОРЫЕ НАЧИНАЮТСЯ С /api/tasks
server.use("./api/tasks", taskRouter) //middleware

//ЕСЛИ НИ ОДИН РОУТ НЕ ПОДОШЕЛ ТО ВЫВОДИМ 404
server.use((req, res, next) =>{
    const error = {message : "Not found"}
    res.status(404).json(error)
    next()
})

//ЗАПУСКАЕМ СЕРВЕР
server.listen(process.env.PORT || 8000, () => {
    console.log('server is running')
})