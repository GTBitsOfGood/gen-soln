import Mongo from "server/index";
import Event from "server/models/event";

export async function getUpcomingEvents(): Promise<Array<Event>> {
  await Mongo();

  const result = await Event.aggregate([
    {
      $project: {
        difference: {
          $abs: {
            $subtract: [new Date(), "$startDate"]
          }
        },
        doc: "$$ROOT"
      }
    },
    { $sort: { difference: 1 } },
    { $limit: 5 }
  ]);

  return result;
}
