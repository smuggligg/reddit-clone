const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ],
    upVotes: [
      {
        type: String
      }
    ],
    downVotes: [
      {
        type: String
      }
    ],
    url: {
      type: String,
      trim: true
    },
    text: {
      type: String,
      trim: true
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

PostSchema.virtual('voteScore').get(function() {
  return this.upVotes.length - this.downVotes.length
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post
