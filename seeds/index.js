const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelper');

mongoose.connect('mongodb://localhost:27017/rate-my-campsite', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected!');
});

const sample = (array) =>
  array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '633b5f3934833d702ee9d19d',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam dignissimos, accusantium, quia veritatis voluptatum ea provident maxime rem eveniet consequatur officia dolores corporis ut, eos voluptatibus autem! Velit, tenetur corporis.',
      price,
      images: [
        {
          url: 'https://res.cloudinary.com/dq48fuq7d/image/upload/v1665002450/Rate_my_campsite/rssqurshkxyc5oe72vj9.jpg',
          filename: 'Rate_my_campsite/rssqurshkxyc5oe72vj9',
        },
        {
          url: 'https://res.cloudinary.com/dq48fuq7d/image/upload/v1665002455/Rate_my_campsite/bwyaqsjkrb7orvmkra4z.jpg',
          filename: 'Rate_my_campsite/bwyaqsjkrb7orvmkra4z',
        },
        {
          url: 'https://res.cloudinary.com/dq48fuq7d/image/upload/v1665002455/Rate_my_campsite/cifwpyy5ux95de1mignp.jpg',
          filename: 'Rate_my_campsite/cifwpyy5ux95de1mignp',
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
