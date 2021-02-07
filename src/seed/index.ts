import mongoose from "mongoose";
import { Campground } from "../models/campground";
import { cities } from "./cities";
import { descriptors, places } from "./seedHelpers";

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err: any) => console.error.bind(console, "connection error: "));

db.once("open", () => {
  console.log("Database connected for Seeding!");
});

const getRandomIndex = (range: number): number =>
  Math.floor(Math.random() * range);
const sample = (arr: any): any => arr[getRandomIndex(arr.length)];

const seedDB = async () => {
  await Campground.deleteMany({});

  for (let i = 0; i < 50; ++i) {
    const camp = Campground.build({
      author: "601982825d8031834b64284f",
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[getRandomIndex(1000)].city}, ${
        cities[getRandomIndex(1000)].state
      }`,
      price: 10,
      images: [
        {
          url:
            "https://res.cloudinary.com/dzldayxpa/image/upload/v1612684190/YelpCamp/qac6wzww3pieiihp5xds.jpg",
          filename: "YelpCamp/qac6wzww3pieiihp5xds",
        },
      ],
      description: "Seed data",
    });

    await camp.save();
  }
};

seedDB().then(async () => {
  await mongoose.connection.close();
  console.log("Seeding completed!");
});
