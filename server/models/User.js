const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new Schema({
    email: {
      type: String,
      required: true,
      trim: true
    },
    customerProfile: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Customer',
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

userSchema.virtual('inventoryCount').get(function () {
  return this.inventories.length;
});

userSchema.virtual('productCount').get(function () {
  let total = 0;
  this.inventories.forEach(inventory => {
    total += inventory.products.length;
  });
  return total;
});

userSchema.virtual('priceTotal').get(function () {
  let total = 0;
  this.inventories.forEach(inventory => {
    inventory.products.forEach(product => {
      total += product.price;
    });
  });
  return `${total.toFixed(2)}`;
});

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
