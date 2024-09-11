import express from 'express'
import db from '../db.js'
import postController from '../controllers/postController.js'
const router = express.Router()


router.get('/', postController.getAllPosts)

router.get("/hello",postController.returnHello)

router.get('/:id', postController.getPost)





router.patch('/comment/:id', postController.addComment)



router.post('/', postController.addComment)


router.delete('/:id', postController.deletePost)

router.post("/addUser",postController.addUser)



export default router