const { Schema, model } = require('mongoose');

const Product = require('./Product');

const inventorySchema = new Schema({
    inventoryName: {
        type: String,
        required: true,
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
    }],

    },
    {
    toJSON: {
        virtuals: true,
    }
});

inventorySchema.virtual('productCount').get(function () {
    return this.products.length;
});

inventorySchema.virtual('priceTotal').get(function () {
    let total = 0;
    this.products.forEach(product => {
        total += product.price;
    });
    return `${total.toFixed(2)}`;
});


const Inventory = model('Inventory', inventorySchema);



module.exports = Inventory;