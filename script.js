const express = require('express')
const taskRouter = require('./routes/tasksRoute')

const server = express()
server.use(express.json()) //middleware
server.use("./api/tasks", taskRouter) //middleware


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