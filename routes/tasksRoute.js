const express = require('express')
const {getAllTasks, getByTime, addTask, deleteTask, updateTask} = require("../controllers/tasks");
const router = express.Router()

router.get('/', getAllTasks)
router.get('/:category/:timespan', getByTime)
router.post('/:category', addTask)
router.delete('/:category/:id', deleteTask)
router.patch('/:category/:id', updateTask)

module.exports = router