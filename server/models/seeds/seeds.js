const db = require('../../config/connection');
const Product = require('../Product');

const productSeeds = [
  { upc: '1234567890', 
    name: 'Bean Product', 
    description: 'This is a test product',
    price: 100.10,
    image: 'https://i.imgur.com/z01z00m.jpg',
    link: 'test link',
    category: 'Beans' },

  { upc: '1234567894', 
    name: 'Test Product2', 
    description: 'Rice product',
    price: 120.10,
    image: 'https://i.imgur.com/z01z00m.jpg',
    link: 'test link',
    category: 'Test' },

  { upc: '1234567896', 
    name: 'Test Product 3', 
    description: 'This is a test product',
    price: 10.10,
    image: 'https://i.imgur.com/z01z00m.jpg',
    link: 'test link',
    category: 'Test 3' },

  { upc: '1234567898', 
    name: 'Test Product 4', 
    description: 'This is a test product',
    price: 170.10,
    image: 'https://i.imgur.com/z01z00m.jpg',
    link: 'test link',
    category: 'Test 4' },

  { upc: '1234567890', 
    name: 'Test Product 5', 
    description: 'This is a test product',
    price: 110.03,
    image: 'https://i.imgur.com/z01z00m.jpg',
    link: 'test link',
    category: 'Test 5' }
];

async function seedProducts() {
  try {
    await Product.deleteMany(); // Clear existing data
    const result = await Product.insertMany(productSeeds);
    console.log(`${result.length} products inserted.`);
  } catch (err) {
    console.error('Error seeding products:', err);
  }
}

seedProducts();