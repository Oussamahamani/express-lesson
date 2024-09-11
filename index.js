import express from 'express'
import { ObjectId } from 'mongodb'
import db from './db.js'

const app = express()

const PORT = 8080

app.use(express.json())

app.get('/:id', async (req, res) => {
    try {
        let collection = await db.collection("posts")
        let query = { _id: new ObjectId(req.params.id) }
        let result = await collection.findOne(query)
        
        // check if document was found
        if (!result) throw new Error('Not found')
        res.send(result).status(200)
    } catch (e) {
        console.log(e)
        res.send(e).status(400)
    }

})

app.delete('/:id', async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) }
        let collection = await db.collection("posts")
        let result = await collection.deleteOne(query)
        console.log(result)
        res.send(result).status(200)
    } catch(e) {
        console.log(e)
        res.send(e).status(400)
    }
})

app.patch('/comment/:id', async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) }
        const updates = {
            $push: { comments: req.body }
        }
        let collection = await db.collection("posts")
        let result = await collection.updateOne(query, updates)
        console.log(result)
        res.send(result).status(200)
    } catch(e) {
        console.log(e)
        res.send(e).status(400)
    }
})

app.get('/', async (req, res) => {
    try {
        let collection = await db.collection("posts")
        let results = await collection.find().limit(1).toArray()
        console.log(results)
        res.json(results).status(200)
    } catch(e) {
        res.json(e).status(400)
    }
})

app.post('/', async (req, res) => {
    try {
        let collection = await db.collection("posts")   
        let newDocument = req.body
        newDocument.date = new Date()
        let result = await collection.insertOne(newDocument)
        console.log(result)
        res.send(result).status(201)
    } catch(e) {
        res.send(e).status(400)
    }
})

app.listen(PORT, () => {
    console.log(`Connected to server on port: ${PORT}`)
})