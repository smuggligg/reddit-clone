const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    upVotes: [],
    downVotes: [],
    post: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Post'
    }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    },
    toObject: { virtuals: true }
  }
)

CommentSchema.virtual('voteScore').get(function() {
  return this.upVotes.length - this.downVotes.length
})

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment
