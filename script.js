const express = require('express')
const fs = require('fs')
const {nanoid} = require('nanoid')


const server = express()
server.use(express.json())

const readData = (fileName) => {
    try {
        return JSON.parse(fs.readFileSync(`./tasks/${fileName}.json`, 'utf8'))
    } catch (e) {
        return []
    }
}

server.get('/api/tasks/:category', (req, res) => {
    const data = readData(req.params.category)
    const filteredData = data
        .filter(el => !el._isDeleted)
        .map(el => {
            // delete el._isDeleted
            // delete el._deletedAt
            // delete el._createdAt
            // return el
            return {
                id: el.taskId,
                title: el.title,
                body: el.body
            }
        })
    res.json(filteredData)
})

server.post('/api/tasks/:category', (req, res) => {
    // console.log(req.params.category)
    // console.log(req.body)
    const newTask = {
        "taskId": nanoid(2),
        "title": req.body.title,
        "status": 'new',
        "_isDeleted": false,
        "_createdAt": +new Date(),
        "_deletedAt": null
    }
    const data = readData(req.params.category)
    const updatedTasks = [...data, newTask]
    fs.writeFileSync(`./tasks/${req.params.category}.json`, JSON.stringify(updatedTasks, null, 2))
    res.json({status: "successfully"})
})

server.delete('/api/tasks/:category/:id',(req, res) =>{
    const data = readData(req.params.category)
    const updatedTasks = data.map(el => el.taskId === req.params.id ? {...el, _isDeleted: true} : el)
    fs.writeFileSync(`./tasks/${req.params.category}.json`, JSON.stringify(updatedTasks, null, 2))
    res.json({status: "successfully"})
})

server.patch('/api/tasks/:category/:id',(req, res) =>{
    const data = readData(req.params.category)
    const updatedTasks = data.map(el => el.taskId === req.params.id ? {...el, status: req.body.status} : el)
    fs.writeFileSync(`./tasks/${req.params.category}.json`, JSON.stringify(updatedTasks, null, 2))
    res.json({status: "successfully"})
})

server.listen(8000, () => {
    console.log('server is running')
})