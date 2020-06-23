const express = require('express')
const router = express.Router()

const { removeEl } = require('./../util')
const Post = require('../models/post')
const User = require('../models/user')
const { authJwt } = require('../services/jwt')

router.get('/', (req, res, next) => {
  Post.find({})
    .populate('author')
    .populate({
      path: 'comments',
      populate: {
        path: 'author'
      }
    })
    .exec()
    .then(posts => res.json({ success: true, posts }))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  const { id } = req.params
  Post.findById(id)
    .populate('author')
    .populate({
      path: 'comments',
      populate: {
        path: 'author'
      }
    })
    .exec()
    .then(post => {
      if (!post) return next(`Cannot find post ${id}`)
      return res.json({ success: true, post })
    })
    .catch(next)
})

router.get('/:id/comments', (req, res, next) => {
  const { id } = req.params
  Post.findById(id)
    .populate({
      path: 'comments',
      populate: {
        path: 'author'
      }
    })
    .exec()
    .then(({ comments }) => res.json({ success: true, comments }))
    .catch(next)
})

router.post('/', authJwt, (req, res, next) => {
  const { title, url, text } = req.body
  const { userId } = req.decoded
  const postData = { title, author: userId }
  if (text) {
    postData.text = text
  }
  if (url) {
    postData.url = url
    delete postData.text
  }
  Post.create(postData, (err, post) => {
    if (err) {
      return next(err)
    }
    User.findById(userId)
      .exec()
      .then(user => {
        user.posts.push(post._id)
        user.save()
        res.json({
          success: true,
          post
        })
      })
  })
})

router.delete('/:id', authJwt, (req, res, next) => {
  const { id } = req.params
  const { userId, role } = req.decoded
  Post.findById(id)
    .exec()
    .then(post => {
      if (role !== 'admin' && userId !== String(post.author)) {
        return next('Unauthorized to do this')
      }

      post
        .remove()
        .then(() => {
          User.findById(post.author)
            .exec()
            .then(user => {
              user.posts = removeEl(user.posts, post._id)
              user.save()
              res.json({ success: true })
            })
        })
        .catch(next)
    })
    .catch(next)
})

router.post('/:id/upvote', authJwt, (req, res, next) => {
  const { id } = req.params
  const { userId } = req.decoded

  Post.findById(id)
    .exec()
    .then(post => {
      if (post.upVotes.includes(userId)) {
        return next('Cannot vote twice on the same item')
      }
      post.upVotes.push(userId)
      post.downVotes = removeEl(post.downVotes, userId)
      post.save()
      res.json({
        success: true,
        post
      })
    })
    .catch(next)
})

router.post('/:id/downvote', authJwt, (req, res, next) => {
  const { id } = req.params
  const { userId } = req.decoded

  Post.findById(id)
    .exec()
    .then(post => {
      if (post.downVotes.includes(userId)) {
        return next('Cannot vote twice on the same item')
      }
      post.downVotes.push(userId)
      post.upVotes = removeEl(post.upVotes, userId)

      post.save()
      res.json({
        success: true,
        post
      })
    })
    .catch(next)
})

module.exports = router
