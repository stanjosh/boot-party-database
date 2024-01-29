const { Schema, model } = require('mongoose');
const Partner = require('./Partner');
const bcrypt = require('bcryptjs');


const userSchema = new Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone : {
        type: String,
        required: false,
        trim: true
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

userSchema.index({
  'email': 'text',
  'name': 'text',
  'phone': 'text',
  'partner.name': 'text',
  
});




userSchema.pre('save', async function (next) {
  // hash user password
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }




  next();
});


userSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate()
  const filter = this.getFilter()


  if (update.partner) {

      await Partner.findOneAndUpdate(
        { _id: update.partner },
        { $addToSet : { users: filter._id } },
        { new: true }
      );

    }
  console.log(update)
  next();
})

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

User.ensureIndexes();

module.exports = User;
