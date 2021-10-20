const express = require('express')
const taskRouter = require('./routes/tasksRoute')
const mongoose = require('mongoose')
const chalk = require('chalk')
const cors = require('cors')
require('dotenv').config()  //импортируем dotenv


//СОЗДАЛИ СЕРВЕР
const server = express()


//БИБИЛОТЕКА ДЛЯ ПОДКЛЮЧЕНИЯ MONGODB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log(chalk.blue('DB IS CONNECTED')))
    .catch(() => console.log(chalk.red('DB IS NOT CONNECTED')))


//ОБРАБОТКА ДАННЫХ В REQ.BODY
server.use(express.json()) //middleware
server.use(cors())


//РОУТЫ, КОТОРЫЕ НАЧИНАЮТСЯ С /api/tasks middleware
server.use("./api/tasks", taskRouter)


//ЕСЛИ НИ ОДИН РОУТ НЕ ПОДОШЕЛ ТО ВЫВОДИМ 404
server.use((req, res, next) => {
    const error = {message: "Not found"}
    res.status(404).json(error)
    next()
})


//ЗАПУСКАЕМ СЕРВЕР
server.listen(process.env.PORT || 8000, () => {
    console.log('server is running')
})