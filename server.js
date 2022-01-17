// REQUIRED LIBRARIES
const express = require('express')
const db = require('./db')

// ROUTERS
const adminRouter = require('./routers/Admin')
const teacherRouter = require('./routers/Teacher')
const studentRouter = require('./routers/Student')
const headRouter = require('./routers/Head')
const indexRouter = require('./routers/Index')
const userRouter = require('./routers/User')

const server = express()

server.use(express.urlencoded({ extended: false }))
server.use(express.json())

server.use('/', indexRouter)

server.use('/head', headRouter)

server.use('/admin', adminRouter)

server.use('/teacher', teacherRouter)

server.use('/student', studentRouter)

server.use('/user', userRouter)




module.exports = server