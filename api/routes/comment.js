const express = require('express')
const router = express.Router()

const Comment = require('./../models/comment')
const Post = require('./../models/post')
const User = require('./../models/user')
const { authJwt } = require('../services/jwt')
const { removeEl } = require('./../util')

router.get('/:id', (req, res, next) => {
  const { id } = req.params
  Comment.findById(id)
    .populate('author')
    .populate('post')
    .exec()
    .then(comment => {
      res.json({ success: true, comment })
    })
    .catch(next)
})

router.post('/', authJwt, (req, res, next) => {
  const { text, postId } = req.body
  const { userId } = req.decoded

  const commentData = { text, author: userId, post: postId }

  Comment.create(commentData, (err, comment) => {
    if (err) {
      return next(err)
    }
    Post.findById(postId)
      .exec()
      .then(post => {
        post.comments.push(comment._id)
        post.save()
        User.findById(userId)
          .exec()
          .then(user => {
            user.comments.push(comment._id)
            user.save()
            res.json({
              success: true,
              comment
            })
          })
      })
  })
})

router.delete('/:id', authJwt, (req, res, next) => {
  const { id } = req.params
  const { userId, role } = req.decoded
  Comment.findById(id)
    .exec()
    .then(comment => {
      if (role !== 'admin' && userId !== String(comment.author)) {
        return next('Unauthorized to do this')
      }
      comment
        .remove()
        .then(() => {
          Post.findById(comment.post)
            .exec()
            .then(post => {
              post.comments = removeEl(post.comments, comment._id)
              post.save()
              User.findById(comment.author)
                .exec()
                .then(user => {
                  user.comments = removeEl(user.comments, comment._id)
                  user.save()

                  res.json({ success: true, postId: comment.post })
                })
                .catch(next)
            })
            .catch(next)
        })
        .catch(next)
    })
    .catch(next)
})

router.post('/:id/upvote', authJwt, (req, res, next) => {
  const { id } = req.params
  const { userId } = req.decoded

  Comment.findById(id)
    .exec()
    .then(comment => {
      if (comment.upVotes.includes(userId)) {
        return next('Cannot vote twice on the same item')
      }
      comment.upVotes.push(userId)
      comment.downVotes = removeEl(comment.downVotes, userId)
      comment.save()
      res.json({
        success: true,
        comment
      })
    })
    .catch(next)
})

router.post('/:id/downvote', authJwt, (req, res, next) => {
  const { id } = req.params
  const { userId } = req.decoded

  Comment.findById(id)
    .exec()
    .then(comment => {
      if (comment.downVotes.includes(userId)) {
        return next('Cannot vote twice on the same item')
      }
      comment.downVotes.push(userId)
      comment.upVotes = removeEl(comment.upVotes, userId)

      comment.save()
      res.json({
        success: true,
        comment
      })
    })
    .catch(next)
})

module.exports = router
