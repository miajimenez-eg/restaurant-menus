const {sequelize} = require('./db')
const {Restaurant, Menu} = require('./models/index')
const {
    seedRestaurant,
    seedMenu,
  } = require('./seedData');

describe('Restaurant and Menu Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    });

    test('can create a Restaurant', async () => {
        // TODO - write test
        // select from the db and check properties
        await Restaurant.findByPk(seedRestaurant.id);
        expect(seedRestaurant[0].name).toBe('AppleBees');
        expect(seedRestaurant[0].location).toBe('Texas');
        expect(seedRestaurant[0].cuisine).toBe('FastFood');
        expect(seedRestaurant[0].rating).toBe(4);
    });

    test('can create a Menu', async () => {
        // TODO - write test
        // select menu from db and check properties
        await Menu.findByPk(seedMenu.id);
        expect(seedMenu[1].title).toEqual('Lunch');
    });

    test('can find Restaurants', async () => {
        // create the seed restaurants
        for (const restaurant of seedRestaurant) {
          await Restaurant.create(restaurant);
        }
        // query the db
        const findRestaurants = await Restaurant.findAll();
        // check the number of restaurants in the db matches the seed data
        expect(findRestaurants.length).toEqual(seedRestaurant.length);
      });

    test('can find Menus', async () => {
        // TODO - write test
        // create the seed menus
        for (const menu of seedMenu) {
            await Menu.create(menu);
        }
        // query db
        const findMenus = await Menu.findAll();
        // check the number of menus in the db matches the seed data
        expect(findMenus.length).toEqual(seedMenu.length);
    });

    test('can delete Restaurants', async () => {
        // TODO - write test
        // create restaurant
        const newRest = await Restaurant.create({ name: 'Aksular', location: 'Enfield', cuisine: 'Turkish' })
        // query db for restaurant
        let findRestaurants = await Restaurant.findByPk(newRest.id);
        expect(findRestaurants).not.toBeNull();
        // delete restaurant
        await Restaurant.destroy({ where: { id: newRest.id } });
        // try to query db again
        findRestaurants = await Restaurant.findByPk(newRest.id);
        expect(findRestaurants).toBeNull();
    });

    test('can update a Restaurant', async () => {
        // TODO - write test
        // find restaurant by name to update
        const findRestaurant = await Restaurant.findOne({ where: { name: 'AppleBees' } });
        const { id } = findRestaurant;
        // update restaurant
        await Restaurant.update({ rating: 3 }, { where: { id } });
        // retreive restaurant from db and check properties
        const updatedRest = await Restaurant.findByPk(id);
        expect(updatedRest.rating).toBe(3);

        
        expect(seedRestaurant[0].rating).toBe(4);
    });
})