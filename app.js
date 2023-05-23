require("reflect-metadata")
require('dotenv').config()

const { connect } = require("./app-data-source")
const express = require("express")
const { usersRouter } = require("./users/users.router")
const { notesRouter } = require("./notes/notes.router")

const app = express()
app.use(express.json())
connect()

app.use("/api/*", authorise)
app.use("/api/notes", notesRouter)
app.use("/users", usersRouter)

const port = process.env.PORT
app.listen(port)