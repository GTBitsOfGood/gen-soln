import { signup } from "server/actions/admin";
import Admin from "server/models/admin";
import Nonprofit from "server/models/nonprofit";

module.exports = {
  // This function supports db as an argument, if required
  async up() {
    const idObject = await Nonprofit.findOne({}, { _id: 1 });
    const admin = {
      firstName: "Johnny",
      lastName: "Dogooder",
      email: "hello@bitsofgood.org",
      nonprofitId: idObject._id,
      password: "123456"
    };
    // Can call our server-side business logic directly:
    await signup(admin);
  },
  // This function supports db as an argument, if required
  async down() {
    await Admin.deleteMany({});
  }
};
