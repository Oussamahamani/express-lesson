import express from 'express'
import { ObjectId } from 'mongodb'
import db from './db.js'

import postRoutes from "./routes/postRoutes.js"
const app = express()

const PORT = 8080
// get  /
app.use(express.json())


app.use("/posts",postRoutes)

app.listen(PORT, () => {
    console.log(`Connected to server on port: ${PORT}`)
})