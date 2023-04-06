'use strict';

const {
  db,
  models: { User, Product, Order, OrderItem },
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
    User.create({ username: 'cody', password: 'totodile', isAdmin: true }),
    User.create({ username: 'murphy', password: '123' }),
    User.create({ username: 'kait', password: 'admin', isAdmin: true }),
  ]);

  const products = await Promise.all([
    Product.create({
      name: 'MANCHEGO AND CHERRY CHOCOLATE BAR',
      type: 'dark',
      price: 999,
      quantity: 10,
      description:
        'A curious pairing of chocolate + cheese. The first chocolate bar in a soon to be launched new cheese and chocolate series. Both cheese and chocolate undergo the process of fermentation, which is essential in yielding their complex flavors. Katrina has combined D.O.P. 12-month aged Manchego cheese with tart, dried Montmorency cherries in our proprietary bittersweet chocolate. A worthy surprise.',
      imageURL:
        'https://cdn.shopify.com/s/files/1/0012/8660/2848/products/Manchego-Cherry-Bar.jpg?v=1673889119',
    }),
    Product.create({
      name: "MO'S® DARK CHOCOLATE BACON BAR",
      type: 'dark',
      price: 899,
      quantity: 10,
      description:
        'Fruitwood smoked, uncured bacon from a beloved sustainable family farm in New Hampshire, finished with a sprinkling of Alderwood smoked salt. Praesent porttitor auctor ante, quis iaculis velit efficitur ac. Quisque in elit magna. Vivamus condimentum dolor sodales odio semper, et lacinia ligula gravida. Duis tristique quam aliquet magna vestibulum auctor. Mauris cursus blandit gravida. Sed in ex non orci consequat auctor sed in ipsum. Vivamus aliquet sed augue vel congue.',
      imageURL:
        'https://cdn.shopify.com/s/files/1/0012/8660/2848/products/Mos-Dark-Chocolate-Bacon-Bar.png?v=1674616541',
    }),
    Product.create({
      name: 'MATCHA GREEN TEA & SPIRULINA SUPER DARK™ CHOCOLATE BAR',
      type: 'dark',
      price: 899,
      quantity: 10,
      description:
        'Adaptogenic ceremonial matcha green tea and spirulina with Ghanaian cacao nibs craft an iron-rich dark chocolate experience. Praesent porttitor auctor ante, quis iaculis velit efficitur ac. Quisque in elit magna. Vivamus condimentum dolor sodales odio semper, et lacinia ligula gravida. Duis tristique quam aliquet magna vestibulum auctor. Mauris cursus blandit gravida. Sed in ex non orci consequat auctor sed in ipsum. Vivamus aliquet sed augue vel congue.',
      imageURL:
        'https://cdn.shopify.com/s/files/1/0012/8660/2848/products/Matcha-Chocolate-Bar.png?v=1674531420',
    }),
    Product.create({
      name: 'BANANA COCONUT CHOCOLATE BAR',
      type: 'dark',
      price: 899,
      quantity: 10,
      description:
        'A curious and delicious marriage of our house-roasted bananas, their peels, and Sri Lankan coconut permeate our dark chocolate with husky, tropical notes. Praesent porttitor auctor ante, quis iaculis velit efficitur ac. Quisque in elit magna. Vivamus condimentum dolor sodales odio semper, et lacinia ligula gravida. Duis tristique quam aliquet magna vestibulum auctor. Mauris cursus blandit gravida. Sed in ex non orci consequat auctor sed in ipsum. Vivamus aliquet sed augue vel congue.',
      imageURL:
        'https://cdn.shopify.com/s/files/1/0012/8660/2848/products/Banana-Coconut-Chocolate-Bar.png?v=1674531272',
    }),
    Product.create({
      name: 'PINK HIMALAYAN CRYSTAL SALT CARAMEL CHOCOLATE BAR',
      type: 'dark',
      price: 1099,
      quantity: 10,
      description:
        'Trace mineral-rich, Himalayan pink salt is sustainably hand harvested, then blended with burnt sugar caramel and encased in bittersweet dark chocolate. Sed venenatis maximus tellus, sit amet rutrum tellus viverra ut. Fusce placerat erat ut porttitor luctus. In vel interdum orci, vel molestie eros. Cras hendrerit quam gravida ultrices porttitor. Phasellus nec eros libero. Sed lacinia, sapien consectetur consectetur sodales, erat augue accumsan tellus, vitae scelerisque lacus orci ac dui. Donec nulla lorem, bibendum cursus arcu sed, semper venenatis justo. Phasellus aliquet tempus faucibus.',
      imageURL:
        'https://cdn.shopify.com/s/files/1/0012/8660/2848/products/Pink-Himalayan-Crystal-Salt-Caramel-Chocolate-Bar.png?v=1674531370',
    }),
    Product.create({
      name: 'CHEDDAR AND APPLE CHOCOLATE BAR',
      type: 'milk',
      price: 899,
      quantity: 10,
      description:
        'ntroducing our newest innovation in cheese and chocolate. 12-month aged Vermont cheddar cheese blended with apples, cinnamon and our proprietary blend of 45% dark milk chocolate. Sed venenatis maximus tellus, sit amet rutrum tellus viverra ut. Fusce placerat erat ut porttitor luctus. In vel interdum orci, vel molestie eros. Cras hendrerit quam gravida ultrices porttitor. Phasellus nec eros libero. Sed lacinia, sapien consectetur consectetur sodales, erat augue accumsan tellus, vitae scelerisque lacus orci ac dui. Donec nulla lorem, bibendum cursus arcu sed, semper venenatis justo. Phasellus aliquet tempus faucibus.',
      imageURL:
        'https://cdn.shopify.com/s/files/1/0012/8660/2848/products/Cheddar-and-Apple-Chocolate-Bar.png?v=1674616130',
    }),
    Product.create({
      name: 'TURMERIC GINGER CHOCOLATE BAR',
      type: 'milk',
      price: 999,
      quantity: 10,
      description:
        'Turmeric and ginger root, both adaptogens, are blended with golden milk botanicals, crispy coconut, and Telicherry peppercorns in deep milk chocolate.  Peppery and zingy, warm and sweet, this bar is a treat for the senses and the body. Praesent porttitor auctor ante, quis iaculis velit efficitur ac. Quisque in elit magna. Vivamus condimentum dolor sodales odio semper, et lacinia ligula gravida. Duis tristique quam aliquet magna vestibulum auctor. Mauris cursus blandit gravida. Sed in ex non orci consequat auctor sed in ipsum. Vivamus aliquet sed augue vel congue.',
      imageURL:
        'https://cdn.shopify.com/s/files/1/0012/8660/2848/products/Turmeric-Ginger-Chocolate-Bar.png?v=1674616896',
    }),
    Product.create({
      name: "MO'S® MILK CHOCOLATE BACON BAR",
      type: 'milk',
      price: 799,
      quantity: 10,
      description:
        'All natural fruitwood-smoked bacon is baked in small batches before we hand chop it into fine nibbles. Alderwood smoked salt exudes a campfire aroma and perfectly offsets the sweetness of the chocolate. Welcome to the bacon revolution. Praesent porttitor auctor ante, quis iaculis velit efficitur ac. Quisque in elit magna. Vivamus condimentum dolor sodales odio semper, et lacinia ligula gravida. Duis tristique quam aliquet magna vestibulum auctor. Mauris cursus blandit gravida. Sed in ex non orci consequat auctor sed in ipsum. Vivamus aliquet sed augue vel congue.',
      imageURL:
        'https://cdn.shopify.com/s/files/1/0012/8660/2848/products/Mos-Milk-Chocolate-Bacon-Bar.png?v=1674616590',
    }),
    Product.create({
      name: 'DULCE DE LECHE CHOCOLATE BAR',
      type: 'milk',
      price: 899,
      quantity: 10,
      description:
        'The “sweet” milk aroma of our whole milk dulce de leche is juxtaposed aside our deep milk chocolate, and sprinkled with Celtic sea salt. Praesent porttitor auctor ante, quis iaculis velit efficitur ac. Quisque in elit magna. Vivamus condimentum dolor sodales odio semper, et lacinia ligula gravida. Duis tristique quam aliquet magna vestibulum auctor. Mauris cursus blandit gravida. Sed in ex non orci consequat auctor sed in ipsum. Vivamus aliquet sed augue vel congue. ',
      imageURL:
        'https://cdn.shopify.com/s/files/1/0012/8660/2848/products/Dulce-de-Leche-Chocolate-Bar.png?v=1674616189',
    }),
    Product.create({
      name: 'WALNUT AND CHANTERELLE BAR',
      type: 'dark',
      price: 899,
      quantity: 10,
      description:
        'NEW! A pioneering collaboration with Dr. William Li, we bring you Pure Plant. Walnuts have a wealth of polyunsaturated fats. Adding walnuts to one’s diet has been shown to lower LDL or bad cholesterol. The mushroom is one of nature’s most giving medicinal plants. Chanterelle mushrooms contain beta-glucans and fifteen different amino acids. They are a rich source of vitamins and minerals, including Vitamin D and Beta-Carotene',
      imageURL:
        'https://cdn.shopify.com/s/files/1/0012/8660/2848/products/Walnut-and-Chanterelle-Chocolate-Bar.png?v=1674616940',
    }),
    Product.create({
      name: 'CHINESE 5-SPICE BAR',
      type: 'dark',
      price: 999,
      quantity: 10,
      description:
        'NEW! A pioneering collaboration with Dr. William Li, we bring you Pure Plant. Chinese 5 Spice refers to the blending of star anise, cloves, Chinese cinnamon, Szechuan peppercorns, and fennel seeds. This blend encompasses all five of our taste sensibilities, to sweet, sour, bitter, salty, and umami. Like cacao, these spices are chock full of antioxidants and minerals.',
      imageURL:
        'https://cdn.shopify.com/s/files/1/0012/8660/2848/products/Chinese-5-Spice-Chocolate-Bar.png?v=1674756895',
    }),
    Product.create({
      name: 'BLACK RASPBERRY',
      type: 'dark',
      price: 1099,
      quantity: 10,
      description:
        'One of our darkest chocolate bar parfum features the smoky aromas of Alderwood smoked salt with a crunch of Ghanaian cocoa nibs. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sodales finibus est, eget porta dui ultricies et. Vivamus euismod venenatis elit, efficitur consequat nulla tempus et. Maecenas commodo quam diam, id pulvinar nulla malesuada nec. Fusce quis auctor eros. Vivamus lobortis diam purus. Nulla condimentum tellus eu elit mollis consequat. Curabitur dictum laoreet orci, sed vulputate lorem vestibulum nec. Vivamus urna dui, lacinia vel lobortis eget, pretium eget quam. Donec orci purus, auctor non quam at, lacinia dictum libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageURL:
        'https://cdn.shopify.com/s/files/1/0012/8660/2848/products/Black-Raspberry-with-Fermented-Black-Tea-Bar.png?v=1674756938',
    }),
    Product.create({
      name: 'BLACK RASPBERRY WITH FERMENTED BLACK TEA BAR',
      type: 'exotic',
      price: 999,
      quantity: 10,
      description:
        'NEW! A pioneering collaboration with Dr. William Li, we bring you Pure Plant black raspberry chocolate bar. Often overlooked for other more common berries, black raspberries are rich in vitamin C and fiber. A touch of tart citrus reminiscent and the umami of the fermented tea give this tea chocolate bar a pleasant yumminess, that is subtle and balanced.',
      imageURL:
        'https://cdn.shopify.com/s/files/1/0012/8660/2848/products/Black-Raspberry-with-Fermented-Black-Tea-Bar.png?v=1674756938',
    }),
    Product.create({
      name: 'BARCELONA EXOTIC CHOCOLATE BAR',
      type: 'exotic',
      price: 899,
      quantity: 10,
      description:
        'Deep milk chocolate melts into the mineral and sumptuous taste of Fleur de Sel grey sea salt and roasted almonds, reminiscent of Marcona, Spain. Praesent porttitor auctor ante, quis iaculis velit efficitur ac. Quisque in elit magna. Vivamus condimentum dolor sodales odio semper, et lacinia ligula gravida. Duis tristique quam aliquet magna vestibulum auctor. Mauris cursus blandit gravida. Sed in ex non orci consequat auctor sed in ipsum. Vivamus aliquet sed augue vel congue.',
      imageURL:
        'https://cdn.shopify.com/s/files/1/0012/8660/2848/products/Barcelona-Chocolate-Bar.png?v=1674531322',
    }),
    Product.create({
      name: 'BESTSELLING 6-BAR LIBRARY',
      type: 'assorted',
      price: 4999,
      quantity: 10,
      description:
        'A curated collection of our six bestselling Chocolate Bars. Crafted with superior source ingredients and exotic parfums from around the world this library offers the very best of Vosges’ must-have chocolate bars.  On occasion we may make assortment substitutions to ensure the freshest possible chocolate bars.',
      imageURL:
        'https://cdn.shopify.com/s/files/1/0012/8660/2848/products/Bestselling-6-Bar-Library_Product-Shot.png?v=1674531544',
    }),
    Product.create({
      name: 'RAW HONEY CACAO CHOCOLATE BAR',
      type: 'exotic',
      price: 7999,
      quantity: 10,
      description:
        'This floral nectar of raw honey, harmonizes with the intensity of dark chocolate. Divinely decadent with all of the wellness benefits of these two beloved ingredients. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pulvinar erat nec mi euismod dictum. Curabitur convallis odio et felis venenatis lacinia. Nunc ut imperdiet libero. Quisque laoreet, metus eu rhoncus scelerisque, tortor diam dapibus velit, nec porttitor enim ante quis mauris. Morbi tincidunt mauris quis eros dictum, sit amet blandit purus pretium. Vivamus a malesuada sapien.',
      imageURL:
        'https://cdn.shopify.com/s/files/1/0012/8660/2848/products/Raw-Honey-Cacao-Chocolate-Bar.png?v=1674616740',
    }),
    Product.create({
      name: 'PARMESAN WALNUT AND FIG CHOCOLATE BAR',
      type: 'exotic',
      price: 8499,
      quantity: 10,
      description:
        'Introducing our latest innovation in cheese and chocolate. The Parmesan Walnut and Fig Chocolate Bar brings a Mediterranean fusion of 24-month aged Parmigiano Reggiano, Turkish figs, and California walnuts with a touch of Tellicherry pepper in 67% Dark Chocolate.',
      imageURL:
        'https://cdn.shopify.com/s/files/1/0012/8660/2848/products/Parmesean-Walnut-and-Fig-Chocolate-Bar.png?v=1674616634',
    }),
    Product.create({
      name: 'BLACK SALT CARAMEL EXOTIC CHOCOLATE BAR',
      type: 'exotic',
      price: 9999,
      quantity: 10,
      description:
        'A molten center of burnt sugar caramel, infused with our house-made black cacao sea salt, encased in our proprietary dark chocolate. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pulvinar erat nec mi euismod dictum. Curabitur convallis odio et felis venenatis lacinia. Nunc ut imperdiet libero. Quisque laoreet, metus eu rhoncus scelerisque, tortor diam dapibus velit, nec porttitor enim ante quis mauris. Morbi tincidunt mauris quis eros dictum, sit amet blandit purus pretium. Vivamus a malesuada sapien.',
      imageURL:
        'https://cdn.shopify.com/s/files/1/0012/8660/2848/products/Black-Salt-Caramel-Exotic-Chocolate-Bar.png?v=1674616083',
    }),
    Product.create({
      name: 'ENCHANTED COLLECTION',
      type: 'assorted',
      price: 7499,
      quantity: 10,
      description:
        'Our best and beloved truffles inspired by Katrina’s travels around the world create this limited-edition holiday gift collection. Our proprietary blend of chocolate, spices, herbs, roots and botanicals are sourced for their superior qualities. The truffle collection includes an enclosure book with guided tasting notes, ingredient sourcing details and experiential truffle stories.',
      imageURL:
        'https://cdn.shopify.com/s/files/1/0012/8660/2848/products/Enchanted-Collection_Product-Shot.jpg?v=1673294209',
    }),
    Product.create({
      name: 'EXOTIC CARAMEL COLLECTION',
      type: 'assorted',
      price: 4499,
      quantity: 10,
      description:
        'Inside this chocolate caramel gift box lies pure, butter-soft caramels infused with parfums of Japanese black sugar, Brazil nuts, hibiscus, blood oranges and other delectable, fruits, nuts and spices. These bites offer a contrast between sweet and tart, nutty and citrusy. Part comfort, part couture, this is a unique gift that even the most finicky of recipients will adore.',
      imageURL:
        'https://cdn.shopify.com/s/files/1/0012/8660/2848/products/Exotic-Caramel-Collection_Product-Shot.jpg?v=1673888434',
    }),
    Product.create({
      name: 'THE VAULT COLLECTION',
      type: 'assorted',
      price: 9499,
      quantity: 10,
      description:
        "An odyssey through the history of Vosges Haut-Chocolat collections old and new. In celebration of our 25-year anniversary, Katrina delved into her recipe archives and recreated some of her most loved truffles from the past year. Our keepsake box is adorned with custom paintings by artist friend Crystal Sloane. Her fantastical artwork depicts moments along Katrina's original voyage around the world, which inspired her Travel the World through Chocolate™ concept and the launch of Vosges Haut-Chocolat. An edible archive of exploration and discovery, this collection will inspire beyond the palate. Included with the truffle stories and guided tasting are five postcards with Crystal's original artwork and two paperback journals, perfect for recording all your tasting notes and personal inspiration. ",
      imageURL:
        'https://cdn.shopify.com/s/files/1/0012/8660/2848/products/Vault_PDP_002.jpg?v=1677868585',
    }),
    Product.create({
      name: 'PERSEPHONE RETURNS TRUFFLE COLLECTION',
      type: 'assorted',
      price: 7999,
      quantity: 10,
      description:
        'The winter slumber is over and the return of Persephone is imminent. Though the ground may still be covered in frost, she reminds you to push through. Our spring collection celebrates  her tenacity and the abundance the earth provides during the season of rebirth. This collection offers limited edition truffles and our mini enchanted mushrooms in an array of superior sourced spices, nuts and fruits that fete the season of renewal. ',
      imageURL:
        'https://cdn.shopify.com/s/files/1/0012/8660/2848/products/Persephone_ReturnsVosgesHautChocolat_01.jpg?v=1678983380',
    }),
    Product.create({
      name: 'COLLEZIONE ITALIANA, 16 PIECES',
      type: 'assorted',
      price: 5299,
      quantity: 10,
      description:
        "Let Vosges take you on a culinary exploration of Italy through chocolate. Katrina has sourced her favorite parfums of Italy and then blended them with chocolate to express the unique tastes of Italy's finest ingredients. Each bite will take you across the world and into the heart of Italy. These Italian chocolate truffles are the perfect gift to give to someone who misses Italy. A guidebook is included to lead you through your Italian chocolate tasting journey.",
      imageURL:
        'https://cdn.shopify.com/s/files/1/0012/8660/2848/products/Italian-16pc_Product-Shot.jpg?v=1673294528',
    }),
    Product.create({
      name: 'DARK CHOCOLATE TRUFFLE COLLECTION',
      type: 'assorted',
      price: 5499,
      quantity: 10,
      description:
        'This 16-piece dark chocolate truffle collection merges truffles from our Exotic, Italian, Groove, and Aztec Collections. Through a deep dark chocolate tasting experience, ranging from 62% to 75% cacao, you will experience so much more than just eating dark chocolate truffles. Delve into how the flowers, roots, herbs, and spices play with dark chocolate from around the world. This collection has become one of our best sellers and is the perfect gift for dark chocolate lovers. A guidebook is included to lead you through your gourmet dark chocolate truffles tasting journey.',
      imageURL:
        'https://cdn.shopify.com/s/files/1/0012/8660/2848/products/Dark-16pc_Product-Shot.jpg?v=1673293847',
    }),
  ]);

  const orders = await Promise.all([
    Order.create({
      userId: 1,
      fulfilled: true,
    }),
    Order.create({
      userId: 2,
      fulfilled: true,
    }),
  ]);

  const orderItems = await Promise.all([
    OrderItem.create({
      productId: 2,
      orderId: 1,
      quantity: 5,
      price: 9999,
    }),
    OrderItem.create({
      productId: 1,
      orderId: 1,
      quantity: 2,
      price: 9999,
    }),
    OrderItem.create({
      productId: 3,
      orderId: 2,
      quantity: 6,
      price: 9999,
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
      kait: users[2],
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
