"use strict";

const {
  db,
  models: { User, Product, Order, OrderItem },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "totodile", isAdmin: true }),
    User.create({ username: "murphy", password: "123" }),
    User.create({ username: "kait", password: "admin", isAdmin: true }),
  ]);

  const products = await Promise.all([
    Product.create({
      name: "WALNUT AND CHANTERELLE BAR",
      type: "dark",
      price: 8999,
      quantity: 10,
      description:
        "NEW! A pioneering collaboration with Dr. William Li, we bring you Pure Plant. Walnuts have a wealth of polyunsaturated fats. Adding walnuts to one’s diet has been shown to lower LDL or bad cholesterol. The mushroom is one of nature’s most giving medicinal plants. Chanterelle mushrooms contain beta-glucans and fifteen different amino acids. They are a rich source of vitamins and minerals, including Vitamin D and Beta-Carotene",
      imageURL:
        "https://cdn.shopify.com/s/files/1/0012/8660/2848/products/Walnutandchanterelle_300x300.jpg?v=1621008865",
    }),
    Product.create({
      name: "CHINESE 5-SPICE BAR",
      type: "dark",
      price: 9999,
      quantity: 10,
      description:
        "NEW! A pioneering collaboration with Dr. William Li, we bring you Pure Plant. Chinese 5 Spice refers to the blending of star anise, cloves, Chinese cinnamon, Szechuan peppercorns, and fennel seeds. This blend encompasses all five of our taste sensibilities, to sweet, sour, bitter, salty, and umami. Like cacao, these spices are chock full of antioxidants and minerals.",
      imageURL:
        "https://cdn.shopify.com/s/files/1/0012/8660/2848/products/Chinese5-spice_300x300.jpg?v=1621008578",
    }),
    Product.create({
      name: "SMOKED SALT CHOCOLATE BAR",
      type: "dark",
      price: 10999,
      quantity: 10,
      description:
        "One of our darkest chocolate bar parfum features the smoky aromas of Alderwood smoked salt with a crunch of Ghanaian cocoa nibs. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sodales finibus est, eget porta dui ultricies et. Vivamus euismod venenatis elit, efficitur consequat nulla tempus et. Maecenas commodo quam diam, id pulvinar nulla malesuada nec. Fusce quis auctor eros. Vivamus lobortis diam purus. Nulla condimentum tellus eu elit mollis consequat. Curabitur dictum laoreet orci, sed vulputate lorem vestibulum nec. Vivamus urna dui, lacinia vel lobortis eget, pretium eget quam. Donec orci purus, auctor non quam at, lacinia dictum libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageURL:
        "https://cdn.shopify.com/s/files/1/0012/8660/2848/products/Smoke-Salt-new-packaging_300x300.jpg?v=1578593451",
    }),
    Product.create({
      name: "MANCHEGO AND CHERRY CHOCOLATE BAR",
      type: "dark",
      price: 9999,
      quantity: 10,
      description:
        "A curious pairing of chocolate + cheese. The first chocolate bar in a soon to be launched new cheese and chocolate series. Both cheese and chocolate undergo the process of fermentation, which is essential in yielding their complex flavors. Katrina has combined D.O.P. 12-month aged Manchego cheese with tart, dried Montmorency cherries in our proprietary bittersweet chocolate. A worthy surprise.",
      imageURL:
        "https://cdn.shopify.com/s/files/1/0012/8660/2848/products/2019_05_18_VSGS_SSGH4335_300x300.jpg?v=1571677545",
    }),
    Product.create({
      name: "MO'S® DARK CHOCOLATE BACON BAR",
      type: "dark",
      price: 8499,
      quantity: 10,
      description:
        "Fruitwood smoked, uncured bacon from a beloved sustainable family farm in New Hampshire, finished with a sprinkling of Alderwood smoked salt. Praesent porttitor auctor ante, quis iaculis velit efficitur ac. Quisque in elit magna. Vivamus condimentum dolor sodales odio semper, et lacinia ligula gravida. Duis tristique quam aliquet magna vestibulum auctor. Mauris cursus blandit gravida. Sed in ex non orci consequat auctor sed in ipsum. Vivamus aliquet sed augue vel congue.",
      imageURL:
        "https://cdn.shopify.com/s/files/1/0012/8660/2848/products/2019_05_18_VSGS_SSGH4327_300x300.jpg?v=1571677583",
    }),
    Product.create({
      name: "MATCHA GREEN TEA & SPIRULINA SUPER DARK™ CHOCOLATE BAR",
      type: "dark",
      price: 7999,
      quantity: 10,
      description:
        "Adaptogenic ceremonial matcha green tea and spirulina with Ghanaian cacao nibs craft an iron-rich dark chocolate experience. Praesent porttitor auctor ante, quis iaculis velit efficitur ac. Quisque in elit magna. Vivamus condimentum dolor sodales odio semper, et lacinia ligula gravida. Duis tristique quam aliquet magna vestibulum auctor. Mauris cursus blandit gravida. Sed in ex non orci consequat auctor sed in ipsum. Vivamus aliquet sed augue vel congue.",
      imageURL:
        "https://cdn.shopify.com/s/files/1/0012/8660/2848/products/2019_05_18_VSGS_SSGH4330_300x300.jpg?v=1571677565",
    }),
    Product.create({
      name: "BANANA COCONUT CHOCOLATE BAR",
      type: "dark",
      price: 8999,
      quantity: 10,
      description:
        "A curious and delicious marriage of our house-roasted bananas, their peels, and Sri Lankan coconut permeate our dark chocolate with husky, tropical notes. Praesent porttitor auctor ante, quis iaculis velit efficitur ac. Quisque in elit magna. Vivamus condimentum dolor sodales odio semper, et lacinia ligula gravida. Duis tristique quam aliquet magna vestibulum auctor. Mauris cursus blandit gravida. Sed in ex non orci consequat auctor sed in ipsum. Vivamus aliquet sed augue vel congue.",
      imageURL:
        "https://cdn.shopify.com/s/files/1/0012/8660/2848/products/2019_05_18_VSGS_SSGH4325_300x300.jpg?v=1571677473",
    }),
    Product.create({
      name: "PINK HIMALAYAN CRYSTAL SALT CARAMEL CHOCOLATE BAR",
      type: "dark",
      price: 10999,
      quantity: 10,
      description:
        "Trace mineral-rich, Himalayan pink salt is sustainably hand harvested, then blended with burnt sugar caramel and encased in bittersweet dark chocolate. Sed venenatis maximus tellus, sit amet rutrum tellus viverra ut. Fusce placerat erat ut porttitor luctus. In vel interdum orci, vel molestie eros. Cras hendrerit quam gravida ultrices porttitor. Phasellus nec eros libero. Sed lacinia, sapien consectetur consectetur sodales, erat augue accumsan tellus, vitae scelerisque lacus orci ac dui. Donec nulla lorem, bibendum cursus arcu sed, semper venenatis justo. Phasellus aliquet tempus faucibus.",
      imageURL:
        "https://cdn.shopify.com/s/files/1/0012/8660/2848/products/Pink_Salt_3oz_portrait_300x300.png?v=1578414210",
    }),
    Product.create({
      name: "CHEDDAR AND APPLE CHOCOLATE BAR",
      type: "milk",
      price: 8999,
      quantity: 10,
      description:
        "ntroducing our newest innovation in cheese and chocolate. 12-month aged Vermont cheddar cheese blended with apples, cinnamon and our proprietary blend of 45% dark milk chocolate. Sed venenatis maximus tellus, sit amet rutrum tellus viverra ut. Fusce placerat erat ut porttitor luctus. In vel interdum orci, vel molestie eros. Cras hendrerit quam gravida ultrices porttitor. Phasellus nec eros libero. Sed lacinia, sapien consectetur consectetur sodales, erat augue accumsan tellus, vitae scelerisque lacus orci ac dui. Donec nulla lorem, bibendum cursus arcu sed, semper venenatis justo. Phasellus aliquet tempus faucibus.",
      imageURL:
        "https://cdn.shopify.com/s/files/1/0012/8660/2848/products/Chedder-apple_1800x1800_059ecbff-1fa0-4400-93e6-b6b8a86780d3_300x300.png?v=1569274627",
    }),
    Product.create({
      name: "TURMERIC GINGER CHOCOLATE BAR",
      type: "milk",
      price: 9999,
      quantity: 10,
      description:
        "Turmeric and ginger root, both adaptogens, are blended with golden milk botanicals, crispy coconut, and Telicherry peppercorns in deep milk chocolate.  Peppery and zingy, warm and sweet, this bar is a treat for the senses and the body. Praesent porttitor auctor ante, quis iaculis velit efficitur ac. Quisque in elit magna. Vivamus condimentum dolor sodales odio semper, et lacinia ligula gravida. Duis tristique quam aliquet magna vestibulum auctor. Mauris cursus blandit gravida. Sed in ex non orci consequat auctor sed in ipsum. Vivamus aliquet sed augue vel congue.",
      imageURL:
        "https://cdn.shopify.com/s/files/1/0012/8660/2848/products/2019_05_18_VSGS_SSGH4334_300x300.jpg?v=1571677651",
    }),
    Product.create({
      name: "MO'S® MILK CHOCOLATE BACON BAR",
      type: "milk",
      price: 7999,
      quantity: 10,
      description:
        "All natural fruitwood-smoked bacon is baked in small batches before we hand chop it into fine nibbles. Alderwood smoked salt exudes a campfire aroma and perfectly offsets the sweetness of the chocolate. Welcome to the bacon revolution. Praesent porttitor auctor ante, quis iaculis velit efficitur ac. Quisque in elit magna. Vivamus condimentum dolor sodales odio semper, et lacinia ligula gravida. Duis tristique quam aliquet magna vestibulum auctor. Mauris cursus blandit gravida. Sed in ex non orci consequat auctor sed in ipsum. Vivamus aliquet sed augue vel congue.",
      imageURL:
        "https://cdn.shopify.com/s/files/1/0012/8660/2848/products/Mos-Milk-new_300x300.jpg?v=1598565046",
    }),
    Product.create({
      name: "DULCE DE LECHE CHOCOLATE BAR",
      type: "milk",
      price: 8499,
      quantity: 10,
      description:
        "The “sweet” milk aroma of our whole milk dulce de leche is juxtaposed aside our deep milk chocolate, and sprinkled with Celtic sea salt. Praesent porttitor auctor ante, quis iaculis velit efficitur ac. Quisque in elit magna. Vivamus condimentum dolor sodales odio semper, et lacinia ligula gravida. Duis tristique quam aliquet magna vestibulum auctor. Mauris cursus blandit gravida. Sed in ex non orci consequat auctor sed in ipsum. Vivamus aliquet sed augue vel congue. ",
      imageURL:
        "https://cdn.shopify.com/s/files/1/0012/8660/2848/products/2019_05_18_VSGS_SSGH4326_300x300.jpg?v=1571677520",
    }),
    Product.create({
      name: "GRATEFUL DEAD DANCING BEARS IN SPACE BAR",
      type: "exotic",
      price: 9999,
      quantity: 10,
      description:
        "Celebrating the ritual of improvisational percussion at nearly every Dead show, this bar is dedicated to the band’s fans as a reminder of the sounds of drums washing over a joyful crowd. Spin to the sounds of space as you delight in this cocoa butter bar swirled with seasonal strawberries, raspberries and just a touch of white chocolate.",
      imageURL:
        "https://cdn.shopify.com/s/files/1/0012/8660/2848/products/GratefulDead_Bar_DancingBears_1000x1000_f273794f-401e-4d4d-94f6-269727fc7978_300x300.jpg?v=1592944884",
    }),
    Product.create({
      name: "BARCELONA EXOTIC CHOCOLATE BAR",
      type: "exotic",
      price: 8999,
      quantity: 10,
      description:
        "Deep milk chocolate melts into the mineral and sumptuous taste of Fleur de Sel grey sea salt and roasted almonds, reminiscent of Marcona, Spain. Praesent porttitor auctor ante, quis iaculis velit efficitur ac. Quisque in elit magna. Vivamus condimentum dolor sodales odio semper, et lacinia ligula gravida. Duis tristique quam aliquet magna vestibulum auctor. Mauris cursus blandit gravida. Sed in ex non orci consequat auctor sed in ipsum. Vivamus aliquet sed augue vel congue.",
      imageURL:
        "https://cdn.shopify.com/s/files/1/0012/8660/2848/products/Barcelona-new-packaging_300x300.jpg?v=1578588988",
    }),
    Product.create({
      name: "GRATEFUL DEAD RAW HONEY SMOKED ALMOND",
      type: "exotic",
      price: 9999,
      quantity: 10,
      description:
        "The warmth in the air, buzzing bees in fields of wildflowers and the promise of a summer Dead show are the inspiration for this lush chocolate bar. Oozy raw honey is blended into rich 100% cacao, with the crunch of smoked almonds and buttery toffee. Let this bar transport you to an evening under clear star-studded skies and the sweet sounds of summer.",
      imageURL:
        "https://cdn.shopify.com/s/files/1/0012/8660/2848/products/GratefulDead_Bar_RawHoney_1000x1000_91c411c8-56e0-4af9-b687-d873e36cc95d_300x300.jpg?v=1592944847",
    }),
    Product.create({
      name: "RAW HONEY CACAO CHOCOLATE BAR",
      type: "exotic",
      price: 7999,
      quantity: 10,
      description:
        "This floral nectar of raw honey, harmonizes with the intensity of dark chocolate. Divinely decadent with all of the wellness benefits of these two beloved ingredients. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pulvinar erat nec mi euismod dictum. Curabitur convallis odio et felis venenatis lacinia. Nunc ut imperdiet libero. Quisque laoreet, metus eu rhoncus scelerisque, tortor diam dapibus velit, nec porttitor enim ante quis mauris. Morbi tincidunt mauris quis eros dictum, sit amet blandit purus pretium. Vivamus a malesuada sapien.",
      imageURL:
        "https://cdn.shopify.com/s/files/1/0012/8660/2848/products/2019_05_18_VSGS_SSGH4328_300x300.jpg?v=1571677629",
    }),
    Product.create({
      name: "SMOKE AND STOUT CARAMEL CHOCOLATE BAR",
      type: "exotic",
      price: 8499,
      quantity: 10,
      description:
        "Your senses of sight, smell, and taste will collectively surrender to the inebriating union of Forbidden Root Aboot Stoot Beer, Alderwood Smoked Salt and deep, dark chocolate. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pulvinar erat nec mi euismod dictum. Curabitur convallis odio et felis venenatis lacinia. Nunc ut imperdiet libero. Quisque laoreet, metus eu rhoncus scelerisque, tortor diam dapibus velit, nec porttitor enim ante quis mauris. Morbi tincidunt mauris quis eros dictum, sit amet blandit purus pretium. Vivamus a malesuada sapien.",
      imageURL:
        "https://cdn.shopify.com/s/files/1/0012/8660/2848/products/Smoke-Stout_3oz_portrait_300x300.jpg?v=1571677680",
    }),
    Product.create({
      name: "BLACK SALT CARAMEL EXOTIC CHOCOLATE BAR",
      type: "exotic",
      price: 9999,
      quantity: 10,
      description:
        "A molten center of burnt sugar caramel, infused with our house-made black cacao sea salt, encased in our proprietary dark chocolate. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pulvinar erat nec mi euismod dictum. Curabitur convallis odio et felis venenatis lacinia. Nunc ut imperdiet libero. Quisque laoreet, metus eu rhoncus scelerisque, tortor diam dapibus velit, nec porttitor enim ante quis mauris. Morbi tincidunt mauris quis eros dictum, sit amet blandit purus pretium. Vivamus a malesuada sapien.",
      imageURL:
        "https://cdn.shopify.com/s/files/1/0012/8660/2848/products/2019_05_18_VSGS_SSGH4338_300x300.jpg?v=1571677498",
    }),
    Product.create({
      name: "COLLEZIONE ITALIANA, 16 PIECES",
      type: "assorted",
      price: 22499,
      quantity: 10,
      description:
        "Let Vosges take you on a culinary exploration of Italy through chocolate. Katrina has sourced her favorite parfums of Italy: Tuscan olive oil, Sicilian salt, fennel pollen, pine nuts, Taleggio cheese and balsamic vinegar, then blended them with chocolate to express the unique tastes of Italy's finest ingredients. A guidebook is included to lead you through your tasting journey",
      imageURL:
        "https://cdn.shopify.com/s/files/1/0012/8660/2848/products/NEWitalian_300x300.jpg?v=1604093954",
    }),
    Product.create({
      name: "I.G.P. PIEMONTE HAZELNUT PRALINE BONBONS",
      type: "assorted",
      price: 21999,
      quantity: 10,
      description:
        "For those who adore pralines, hazelnuts and Italian dulce, these decadent bonbons will be your new craving. 45% cacao deep milk chocolate pairs perfectly with the rich, Piemonte hazelnuts, while crispy crepes add a light crunch.Adorned with gold leaf, cocoa nibs and crushed candied violets, they crown each bonbon and provide a unique texture and point of differentiation on the palate.",
      imageURL:
        "https://cdn.shopify.com/s/files/1/0012/8660/2848/products/Hazelnut-Praline-9pc-Truffle-Collection_300x300.jpg?v=1632334228",
    }),
    Product.create({
      name: "ENSEMBLE DU CHOCOLAT CLASSIQUE",
      type: "assorted",
      price: 19999,
      quantity: 10,
      description:
        "Our quintessential wellness and comfort foods are nestled in our new, ensemble gift box offering to assuage every chocolate desire. The Ensemble du Chocolat Classique is a centerpiece to quench cravings. Our round keepsake gift box houses a lovely array of haut-chocolat to sample, nibble, snitch and share (or not). Lift the purple lid to reveal vegan truffles, praline bonbons, butter-soft caramels, rich peanut butter bonbons, caramel marshmallows and a Bombalina.",
      imageURL:
        "https://cdn.shopify.com/s/files/1/0012/8660/2848/products/Vosges_newEnsemble_D1_260_300x300.jpg?v=1632150619",
    }),
    Product.create({
      name: "BESTSELLING 6-BAR LIBRARY",
      type: "assorted",
      price: 18499,
      quantity: 10,
      description:
        "A curated collection of our six bestselling Chocolate Bars. Crafted with superior source ingredients and exotic parfums from around the world this library offers the very best of Vosges’ must-have chocolate bars.  On occasion we may make assortment substitutions to ensure the freshest possible chocolate bars. Praesent porttitor auctor ante, quis iaculis velit efficitur ac. Quisque in elit magna. Vivamus condimentum dolor sodales odio semper, et lacinia ligula gravida. Duis tristique quam aliquet magna vestibulum auctor. Mauris cursus blandit gravida. Sed in ex non orci consequat auctor sed in ipsum. Vivamus aliquet sed augue vel congue.",
      imageURL:
        "https://cdn.shopify.com/s/files/1/0012/8660/2848/products/Bestsellers_library_larger_300x300.png?v=1597076520",
    }),
    Product.create({
      name: "PURE PLANT 6 BAR LIBRARY",
      type: "assorted",
      price: 19999,
      quantity: 10,
      description:
        "NEW! A pioneering collaboration with Dr. William Li, we bring you Pure Plant. Each of our new Pure Plant bars helps to activate your body’s defenses in powerful ways. They work to address the needs of the body to heal, regenerate and be nourished.They’re a whole new way to consume chocolate and experience cacao. By incorporating the whole cacao in this innovative way Pure Plant takes one of the most nutrient-rich ingredients in nature and charts a new path for how we use it and ultimately, how you taste it.",
      imageURL:
        "https://cdn.shopify.com/s/files/1/0012/8660/2848/products/PurePlantLib_3_300x300.jpg?v=1621004745",
    }),
    Product.create({
      name: "MINI EXOTIC CHOCOLATE BAR LIBRARY",
      type: "assorted",
      price: 14999,
      quantity: 10,
      description:
        "From Superfood to Comfort Food, the Mini Exotic Chocolate Bar Library offers snackable sizes of our most must-have Chocolate Bars. The Library includes a selection of both Dark and Milk Chocolate Bars packaged in a keepsake mini library box. On occasion we may make assortment substitutions to ensure the freshest possible chocolate bars. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pulvinar erat nec mi euismod dictum. Curabitur convallis odio et felis venenatis lacinia. Nunc ut imperdiet libero. Quisque laoreet, metus eu rhoncus scelerisque, tortor diam dapibus velit, nec porttitor enim ante quis mauris. ",
      imageURL:
        "https://cdn.shopify.com/s/files/1/0012/8660/2848/products/NEWMiniBarLibrary_300x300.jpg?v=1636755472",
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
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
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
