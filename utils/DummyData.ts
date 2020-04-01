import { NonProfit } from "./types";

const nonProfits: NonProfit[] = [
  {
    name: "Hearts2Heart",
    id: "21311",
    donationFormHeadline: "Bring smiles to children",
    donationFormParagraph:
      'Mother Theresa once said, "The needs are great, and none of us, including me, ever do great things. But we can all do small things, with great love, and together we can do something wonderful."',
    colors: {
      primary: "#95C079",
      secondary: "#013042"
    },
    images: {
      logo: "url(21311_logo.png)",
      background: "url(21311_backgroundImage.png)"
    }
  },
  {
    name: "American Red Cross",
    id: "46546",
    donationFormHeadline: "You Can Make a Difference",
    donationFormParagraph:
      "Each day, thousands of people – people just like you – provide compassionate care to those in need. Our network of generous donors, volunteers and employees share a mission of preventing and relieving suffering, here at home and around the world. We roll up our sleeves and donate time, money and blood. We learn or teach life-saving skills so our communities can be better prepared when the need arises. We do this every day because the Red Cross is needed - every day.",
    colors: {
      primary: "#cccccc",
      secondary: "#e11b22"
    },
    images: {
      logo: "url(46546_logo.jpg)",
      background: "url(46546_backgroundImage.jpeg)"
    }
  }
];

// Map a non-profit's URL path to NonProfit object. For now, use id as URL path
const nonProfitsURLMap = new Map<string, NonProfit>();
nonProfits.forEach(
  nonProfit => void nonProfitsURLMap.set(nonProfit.id, nonProfit)
);

const DEFAULT_NON_PROFIT_URL = nonProfitsURLMap.keys().next().value;

export { DEFAULT_NON_PROFIT_URL, nonProfitsURLMap };
