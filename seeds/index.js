const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60d9ffdb55a3e02081c3387b',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
             geometry: { 
                 type: "Point", 
                 coordinates: [ 
                     cities[random1000].longitude,
                     cities[random1000].latitude,
                  ]
                 },
            images: [
                {
                    url: 'https://res.cloudinary.com/lollollol/image/upload/v1625222815/YelpCamp/ofadm7lbxwvqshe9sp1t.jpg',
                    filename: 'YelpCamp/ofadm7lbxwvqshe9sp1t'
                },
                {

                    url: 'https://res.cloudinary.com/lollollol/image/upload/v1625222815/YelpCamp/getq5yzseopaqbypyxp2.jpg',
                    filename: 'YelpCamp/getq5yzseopaqbypyxp2'
                },
                {

                    url: 'https://res.cloudinary.com/lollollol/image/upload/v1625222815/YelpCamp/z3kffhbm21z3fdtuppaf.jpg',
                    filename: 'YelpCamp/z3kffhbm21z3fdtuppaf'
                },
                {

                    url: 'https://res.cloudinary.com/lollollol/image/upload/v1625222815/YelpCamp/ed7yzq5ufzzxnwwujvd2.jpg',
                    filename: 'YelpCamp/ed7yzq5ufzzxnwwujvd2'
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})