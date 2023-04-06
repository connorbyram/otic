const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const userSchema = new Schema({
  name: {
    type: String,
    unique: true, 
    trim: true,
    required: true,
    validate: {
      validator: function(v) {
        return mongoose.model('User', userSchema).findOne({ name: { $regex: new RegExp(`^${v}$`, 'i') } })
          .then(user => !user)
          .catch(() => false);
      },
      message: props => `${props.value} is already taken.`
    }
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true
  },
  password: {type: String, required: true}, 
  confirmationCode: {type: String, default: null},
  confirmed: {type: Boolean, default: false},
  creator: {type: Boolean, default: false},
  superCreator: {type: Boolean, default: false},
  
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
      return ret;
    }
  }
});

userSchema.pre('save', async function(next) {
  // 'this' is the user document
  if (!this.isModified('password')) return next();
  // Replace the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});

module.exports = mongoose.model('User', userSchema);