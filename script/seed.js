'use strict';

const {
  db,
  models: { User, Product },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ]);

  const products = await Promise.all([
    Product.create({
      name: 'Milk Chocolate',
      type: 'milk',
      price: 99.99,
      quantity: 10,
      description: 'A delicious bar of milk chocolate',
      imageURL:
        'https://www.godiva.com/dw/image/v2/AAKG_PRD/on/demandware.static/-/Sites-godiva-master-catalog-us/default/dw14f6ca41/13942-1-resize.jpg?sw=250&sh=250',
    }),
    Product.create({
      name: 'Dark Chocolate',
      type: 'dark',
      price: 99.99,
      quantity: 10,
      description: 'A delicious bar of dark chocolate',
      imageURL:
        'https://www.godiva.com/dw/image/v2/AAKG_PRD/on/demandware.static/-/Sites-godiva-master-catalog-us/default/dwf120f0db/13938-1-resize.jpg?sw=250&sh=250',
    }),
    Product.create({
      name: 'White Chocolate',
      type: 'white',
      price: 99.99,
      quantity: 10,
      description: 'A delicious bar of white chocolate',
      imageURL:
        'https://www.godiva.com/dw/image/v2/AAKG_PRD/on/demandware.static/-/Sites-godiva-master-catalog-us/default/dw6cc41d0e/14223-1.jpg?sw=250&sh=250',
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  console.log(`seeded ${products.length} products`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
    products: {
      milk: products[0],
      dark: products[1],
      white: products[2],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
