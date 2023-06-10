const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const caughtUserSchema = new Schema ({

  caughtUserName: {
    type: String,
        required: true,
        trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },

})


const postSchema = new Schema({
    postOwner: {
        type: String,
        required: true,
        trim: true,
    },
    postName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
    },
    postText: {
        type: String,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    color1: {
        type: String,
        trim: true,
        required: true,
        match: [/^#([A-Fa-f0-9]{6})$/, 'Must match a hex code!'],
    },
    color2: {
        type: String,
        trim: true,
        required: true,
        match: [/^#([A-Fa-f0-9]{6})$/, 'Must match a hex code!'],
      },
      
    color3: {
        type: String,
        trim: true,
        required: true,
        match: [/^#([A-Fa-f0-9]{6})$/, 'Must match a hex code!'],
    },
    color4: {
        type: String,
        trim: true,
        required: true,
        match: [/^#([A-Fa-f0-9]{6})$/, 'Must match a hex code!'],
    },
    color5: {
        type: String,
        trim: true,
        required: true,
        match: [/^#([A-Fa-f0-9]{6})$/, 'Must match a hex code!'],
    },
    image1: {
      type: String,
      trim: true,
      required: true,
    },
    image2: {
      type: String,
      trim: true,
      required: true,
    },
    image3: {
      type: String,
      trim: true,
      required: true,
    },
    image4: {
      type: String,
      trim: true,
      required: true,
    },
    image5: {
      type: String,
      trim: true,
      required: true,
    },
    caughtUsers: [caughtUserSchema],
  
});

// Virtual for comment count
postSchema.virtual('captureCount').get(function () {
    return this.caughtUsers.length;
  });

const Post = model('Post', postSchema);

module.exports = Post;