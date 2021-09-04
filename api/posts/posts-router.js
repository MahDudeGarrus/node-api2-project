// implement your posts router here
const express = require("express")
const router = express.Router();
const Post = require('./posts-model.js');

//Post Endpoints
router.get('/', (req, res) => {
    Post.find(req.query)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: "The posts information could not be retrieved"
        })
    })
})

router.get('/:id', (req, res) => {
    const postID = req.params.id
    Post.findById(postID)
    .then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: "The post information could not be retrieved"
        })
    })
})

router.post('/', (req, res) => {
    const newPost = req.body
    Post.insert(newPost)
    .then(post => {
        if(!newPost.title || !newPost.contents){
            res.status(400).json({
                message: "Please provided title and contents for the post"
            })
        } else {
            res.status(201).json(post)
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message: "There was an error while saving the post to the database"
        })
    })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const updatedPost = req.body        

    if(!updatedPost.title || !updatedPost.contents){
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    } else {
        Post.findById(id)
        .then(data => {
            if(!data) {
                res.status(404).json({
                    message: " The post with the specified ID does not exist"
                })
            } else {
                Post.update(id, updatedPost)
                .then(update => {
                    res.status(200).json(update)
                })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: "The post information could not be modified"
            })
        })
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const id = req.params.id
        const deletedPost = await Post.remove(id)
        if(!deletedPost) {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            res.status(201).json(deletedPost)
        } 
    }
    catch(error) {
        res.status(500).json({
            message: "The post could not be removed"
        })
    }
})

router.get('/:id/comments', (req, res) => {
    const id = req.params.id
    Post.findPostComments(id)
    .then(comments => {
        if(!comments) {
            res.status(404).json({
                message: " The post with the specified ID does not exist"
            })
        } else {
            res.status(200).json(comments)
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message: "The comments information could not be retrieved"
        })
    })
})

module.exports = router