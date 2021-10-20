const Tasks = require('../models/taskModel')

const getAllTasks = async (req, res) => {
    const data = await Tasks.find({})
    console.log(data)
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
    // const data = readData()
    // const duration = {
    //     "day": 1000 * 60 * 60 * 24,
    //     "week": 1000 * 60 * 60 * 24 * 7,
    //     "month": 1000 * 60 * 60 * 24 * 7 * 30,
    //     "year": 1000 * 60 * 60 * 24 * 365
    // }
    // const filteredData = data.filter(el => +new Date() - el._createdAt < duration[req.params.timespan])
    // res.json(filteredData)
}

const addTask = async (req, res) => {
    try {
        const newTask = new Tasks({
            "title": req.body.title
        })
        const saveTask = await newTask.save()
        res.json(saveTask)
    } catch (e) {
        return res.status(401).json({error: "Ошибка сохранения"})

    }
}

const deleteTask = async (req, res) => {
     const task = await Tasks.findByIdAndUpdate({_id: req.params.id}, {_isDeleted: true})
    res.json(task)
}

const updateTask = async (req, res) => {
    const {status} = req.body
    const statuses = ['new', 'in progress', 'done', 'blocked']
    if (statuses.includes(req.body.status)) {
        const task = await Tasks.findByIdAndUpdate({_id: req.params.id}, {status})
        res.json(task)
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