const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new Schema({
    email: {
      type: String,
      required: true,
      trim: true
    },
    guestProfile: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Guest',
      autopopulate: true,
   },

    admin: {
      type: Boolean,
      default: false,
    },
    partner : {
      type: Schema.Types.ObjectId,
      ref: 'Partner',
      autopopulate: true,
    },

    events : [{
      type: Schema.Types.ObjectId,
      ref: 'Event',
      autopopulate: true,
    }],
    password: {
      type: String,
      required: true,
    },
    

},
  {
    toJSON: {
      virtuals: true,
    },
  }
);


userSchema.plugin(require('mongoose-autopopulate'));



// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
