const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  password: String,
  post: [{ type: Schema.Types.ObjectId, ref: "post" }],
  comment: [{ type: Schema.Types.ObjectId, ref: "comment" }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});


const User = mongoose.model('User', userSchema);

module.exports = User;