import db from '../db.js'
import { ObjectId } from 'mongodb'



const getAllPosts = async (req, res) => {
    try {
        let collection = await db.collection("posts")
        let results = await collection.find().limit(5).toArray()
        console.log(results)
        res.json(results).status(200)
    } catch(e) {
        res.json(e).status(400)
    }
}


const getPost = async (req, res) => {
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

}

const deletePost = async (req, res) => {
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
}

const addComment = async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) }
        const updates = {
            $push: { comments: req.body }
        }
        let collection = await db.collection("posts")
        let result = await collection.updateOne(query, updates)
        console.log(result)
        res.send(result).status(300)
    } catch(e) {
        console.log(e)
        res.send(e).status(400)
    }
}


const addPost = async (req, res) => {
    try {
        let collection = await db.collection("posts")   
        let newDocument = req.body
        newDocument.date = new Date()
        let result = await collection.insertOne(newDocument)
        console.log(result)
        res.send(result).status(300)
    } catch(e) {
        res.send(e).status(400)
    }
}


const returnHello= async (req,res)=>{
    console.log("hello world")
    res.send("hello world")
}

const addUser =async(req,res)=>{
    console.log(req.body)
    console.log("hello post")

    res.send("post")
}
export default {getAllPosts,getPost,deletePost,addComment,addPost,returnHello,addUser}