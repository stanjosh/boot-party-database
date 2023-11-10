const { AuthenticationError } = require('apollo-server-express');
const { User, Inventory, Product } = require('../models');
const { signToken } = require('../utils/auth');
const { $where } = require('../models/Product');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
        .populate({
          path: 'inventories',
          model: 'Inventory',
            populate: { 
              path: 'products',
              model: 'Product',
         }
      });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    searchAllProduct: async (parent, args, context) => {
      const products = await Product.find();
      console.log(products)
      return products

    },
    searchProductUPC: async (parent, { UPC }, context) => {
      const product = await Product.findOne({ UPC: UPC });
      return product
    },
    searchProductName: async (parent, { name }, context) => {
      const product = await Product.findOne({ name: name });
      return product
    },
    searchUser: async (parent, { id }, context) => {
      // if (context.user) {
        const user = await User.findById(id)
          .populate({
            path: 'inventories',
            model: 'Inventory',
              populate: { 
                path: 'products',
                model: 'Product',
           }
        });
        console.log(user)
        return (user)
      // }
      // throw new AuthenticationError('You need to be logged in!');
    },
    searchUserByName: async (parent, { username }, context) => {
      // if (context.user) {
        const user = await User.findOne({ username: username });
        return user
      // }
      // throw new AuthenticationError('You need to be logged in!');
    }
  },




  Mutation: {
    saveUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },


    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email })
      .populate({
        path: 'inventories',
        model: 'Inventory',
          populate: { 
            path: 'products',
            model: 'Product',
       }
    });;

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },

    createNewInventory: async (parent, { inventoryName }, context ) => {
      console.log(inventoryName )
      if (context.user) {
      const inventory = await Inventory.create({ inventoryName });  
      const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { inventories: inventory._id } },
          { new: true },
          
          )
          .populate({
            path: 'inventories',
            model: 'Inventory',
              populate: { 
                path: 'products',
                model: 'Product',
           }
        });
        return user
      }
      throw new AuthenticationError('You need to be logged in!');

    },

    createNewProduct: async (parent, { productInput }, context) => {
      // if (context.user) {
        const product = await Product.create(productInput);
        return product
      // }
      // throw new AuthenticationError('You need to be logged in!');
    },

    removeInventoryFromUser: async (parent, { inventoryId }, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { 
            inventories: { 
              _id : inventoryId 
            } 
          }},
          { new: true }
          )
          .populate({
            path: 'inventories',
            model: 'Inventory',
              populate: { 
                path: 'products',
                model: 'Product',
           }
        });
      }
      throw new AuthenticationError('You need to be logged in!');  
    },

    addProductToInventory: async (parent, { inventoryId, productInput }, context) => {
      //if (context.user) {
        let product = await Product.create(productInput)

        let inventory = await Inventory.findByIdAndUpdate(
          { _id: inventoryId },
          
          { $push: { products: product._id } },
          { new: true,
            upsert: true,
           }
        )
        .populate({ 
          path: 'products',
          model: 'Product',
        })
        .exec();
        return inventory
      //}
      //throw new AuthenticationError('You need to be logged in!');
    },
    removeInventory: async (parent, { inventoryId }, context) => {
      if (context.user) {
        let user = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { inventories: { _id: inventoryId } } },
          { new: true }
        )
        .populate({ 
          path: 'products',
          model: 'Product',
        })
        .exec();
        console.log(user)
        return user;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    removeProductFromInventory: async (parent, { inventoryId, productId }, context) => {
      if (context.user) {
        let inventory = await Inventory.findOneAndUpdate(
          { _id: inventoryId, products: productId },
          { 
          
            $pop: { products: 1 },
            
          },

          {   
            new: true,
            multi: false,
            upsert: true,
           }
        )
        .populate({ 
          path: 'products',
          model: 'Product',
        })
        .exec();
        console.log(inventory)
        return inventory
      }
      throw new AuthenticationError('You need to be logged in!');
    },

  addProductQuantity: async (parent, { inventoryId, productId }, context) => {
    if (context.user) {
      let inventory = await Inventory.findOneAndUpdate(
        { _id: inventoryId, products: productId },
        { 
        
          $push: { products: productId },
          
        },

        {   
          new: true,
          multi: false,
          upsert: true,
         }
      )
      .populate({ 
        path: 'products',
        model: 'Product',
      })
      .exec();
      console.log(inventory)
      return inventory
    }
    throw new AuthenticationError('You need to be logged in!');
  },
}
};

module.exports = resolvers;


