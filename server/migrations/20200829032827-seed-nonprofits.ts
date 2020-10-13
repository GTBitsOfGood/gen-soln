import { MigrationFunction } from "migrate-mongo";
import { Db } from "mongodb";

const nonprofits = [
  {
    _id: "46099993",
    name: "Goodwill",
    headline: "Not Charity, but a Chance",
    about:
      "Working to enhance people’s dignity and quality of life by strengthening their communities, eliminating their barriers to opportunity, and helping them reach their full potential through learning and the power of work.",
    background: 'url("/backgrounds/46099993.png")',
    logo: 'url("/logos/46099993.png")',
    primaryColor: "#444444",
    secondaryColor: "#222222"
  },
  {
    _id: "64357724",
    name: "American Red Cross",
    headline: "With Humanity, Towards Peace",
    about:
      "Each day, thousands of people—people just like you—provide compassionate care to those in need. Our network of generous donors, volunteers and employees share a mission of preventing and relieving suffering.",
    background: 'url("/backgrounds/64357724.png")',
    logo: 'url("/logos/64357724.png")',
    primaryColor: "#AA3D3D",
    secondaryColor: "#7A2222"
  },
  {
    _id: "92232372",
    name: "Hearts2Hearts",
    headline: "Bringing Smiles to Children",
    about:
      'Mother Theresa once said, "The needs are great, and none of us, including me, ever do great things. But we can all do small things, with great love, and together we can do something wonderful."',
    background: 'url("/backgrounds/92232372.png")',
    logo: 'url("/logos/92232372.png")',
    primaryColor: "#3D77AA",
    secondaryColor: "#00306A"
  }
];

export const up: MigrationFunction = async (db: Db) => {
  await db.collection("nonprofits").insertMany(nonprofits);
};

export const down: MigrationFunction = async (db: Db) => {
  await db
    .collection("nonprofits")
    .deleteMany({ _id: { $in: nonprofits.map(_ => _._id) } });
};
