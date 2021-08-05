const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose
  .connect(
    "mongodb+srv://amritanshu:alpha2@cluster0.wu5uz.gcp.mongodb.net/campground?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => {
    console.log("Database connected!!!");
  })
  .catch((err) => {
    console.log(err);
  });
const db = mongoose.connection;

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});

  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "610aac486902d8bfdd46a54d",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      // image: "https://source.unsplash.com/collection/483251",
      images: [
        {
          _id: "610b8de5535b08275f8255c3",
          url: "https://res.cloudinary.com/dydwwknyv/image/upload/v1628147168/yelpcamp/aif6dtgigrjzsm2gxz9d.jpg",
          filename: "yelpcamp/aif6dtgigrjzsm2gxz9d",
        },
        {
          _id: "610b8de5535b08275f8255c4",
          url: "https://res.cloudinary.com/dydwwknyv/image/upload/v1628147170/yelpcamp/zjsedmxyrm0vfz7wstzt.jpg",
          filename: "yelpcamp/zjsedmxyrm0vfz7wstzt",
        },
        {
          _id: "610b8de5535b08275f8255c5",
          url: "https://res.cloudinary.com/dydwwknyv/image/upload/v1628147173/yelpcamp/zvfjmrjflisdrdovj8up.pdf",
          filename: "yelpcamp/zvfjmrjflisdrdovj8up",
        },
      ],
      description: "Dolor sit anim et magna cupidatat dolore commodo.",
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  db.close();
});
