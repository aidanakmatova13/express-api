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
            return {
                id: el.taskId,
                title: el.title,
                body: el.body
            }
            // delete el._isDeleted
            // delete el._deletedAt
            // delete el._createdAt
            // return el
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

server.delete('/api/tasks/:category/:id', (req, res) => {
    const data = readData(req.params.category)
    const updatedTasks = data.map(el => el.taskId === req.params.id ? {...el, _isDeleted: true} : el)
    fs.writeFileSync(`./tasks/${req.params.category}.json`, JSON.stringify(updatedTasks, null, 2))
    res.json({status: "successfully"})
})

server.patch('/api/tasks/:category/:id', (req, res) => {
    const statuses = ['new', 'in progress', 'done', 'blocked']
    if (statuses.includes(req.body.status)) {
        const data = readData(req.params.category)
        const updatedTasks = data.map(el => el.taskId === req.params.id ? {...el, status: req.body.status} : el)
        fs.writeFileSync(`./tasks/${req.params.category}.json`, JSON.stringify(updatedTasks, null, 2))
        res.json({status: "successfully"})
    } else {
        res.status(501).json({'status': "error", 'message': "incorrect status"})
    }
})

server.get('/api/tasks/:category/:timespan', (req, res) => {
    const data = readData(req.params.category)
    const duration = {
        "day": 1000*60*60*24,
        "week": 1000*60*60*24*7,
        "month": 1000*60*60*24*7*30,
        "year": 1000*60*60*24*365
    }
    const filteredData = data.filter(el => +new Date() - el._createdAt < duration[req.params.timespan])
    res.json(filteredData)
})


// let data = [
//     {
//         "taskId": 1,
//         "id": 1,
//         "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//         "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
//         "status": "new",
//         "_isDeleted": true,
//         "_createdAt": 12439876,
//         "_deletedAt": 8765434732
//
//     },
//     {
//         "taskId": 2,
//         "id": 2,
//         "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//         "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
//         "status": "new",
//         "_isDeleted": false,
//         "_createdAt": 12436,
//         "_deletedAt": 8765432
//     }
// ]
// let result = data.filter(el => {
//     const duration = {
//         "day": 1000*60*60*24,
//         "week": 1000*60*60*24*7,
//         "month": 1000*60*60*24*7*30
//     }
//     return +new Date() - el._createdAt < duration[req.params.timespan]
// })


server.listen(process.env.PORT || 8000, () => {
    console.log('server is running')
})