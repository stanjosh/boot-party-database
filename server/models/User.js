const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    
    inventories: [{
      type: Schema.Types.ObjectId,
      ref: 'Inventory',
    }],
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
