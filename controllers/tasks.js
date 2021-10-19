const {nanoid} = require('nanoid')
const fs = require('fs')

const readData = () => {
    try {
        return JSON.parse(fs.readFileSync(`./tasks/shop.json`, 'utf8'))
    } catch (e) {
        return []
    }
}

const writeData = (data) => {
     fs.writeFileSync('./tasks/shop.json', JSON.stringify(data, null,2))
}

const getAllTasks = (req, res) => {
    const data = readData()
    const filteredData = data
        .filter(el => !el._isDeleted)
        .map(el => {
            return {
                id: el.taskId,
                title: el.title,
                body: el.body
            }
        })
    res.json(filteredData)
}
const getByTime = (req, res) => {
    const data = readData()
    const duration = {
        "day": 1000 * 60 * 60 * 24,
        "week": 1000 * 60 * 60 * 24 * 7,
        "month": 1000 * 60 * 60 * 24 * 7 * 30,
        "year": 1000 * 60 * 60 * 24 * 365
    }
    const filteredData = data.filter(el => +new Date() - el._createdAt < duration[req.params.timespan])
    res.json(filteredData)
}
const addTask = (req, res) => {
    const newTask = {
        "taskId": nanoid(2),
        "title": req.body.title,
        "status": 'new',
        "_isDeleted": false,
        "_createdAt": +new Date(),
        "_deletedAt": null
    }
    const data = readData()
    const updatedTasks = [...data, newTask]
    writeData(updatedTasks)
    res.json(newTask)
}
const deleteTask = (req, res) => {
    const data = readData()
    const updatedTasks = data.map(el => el.taskId === req.params.id ? {
        ...el,
        _isDeleted: true,
        _deletedAt: +new Date()
    } : el)
    writeData(updatedTasks)
    res.json(updatedTasks)
}
const updateTask = (req, res) => {
    const statuses = ['new', 'in progress', 'done', 'blocked']
    if (statuses.includes(req.body.status)) {
        const data = readData()
        const updatedTasks = data.map(el => el.taskId === req.params.id ? {...el, status: req.body.status} : el)
        writeData(updatedTasks)
        res.json(updatedTasks)
    } else {
        res.status(501).json({'status': "error", 'message': "incorrect status"})
    }
}

module.exports = {
    getAllTasks,
    getByTime,
    addTask,
    deleteTask,
    updateTask
}