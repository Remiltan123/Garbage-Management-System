import axios from "axios";
import Collector from "../models/Collector.js";

const API_KEY = "dXrL4HMBC13Lv7qfYQ9TluYqAKnQwUomJMDhyTkV0NEreG44VPYNO1pn17OVCs0F";

async function getDrivingDistance(origin, destination) {
  const url = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${origin.lat},${origin.lon}&destinations=${destination.lat},${destination.lon}&key=${API_KEY}`;

  try {
    const res = await axios.get(url);

    if (!res.data.rows || !res.data.rows[0] || !res.data.rows[0].elements) {
      console.error("Invalid API response:", res.data);
      return { distance: Infinity, duration: Infinity, element: null };
    }

    const element = res.data.rows[0].elements[0];

    if (element.status !== "OK") {
      return { distance: Infinity, duration: Infinity, element };
    }

    return {
      distance: element.distance.value,
      duration: element.duration.value,
      element,
    };
  } catch (err) {
    console.error("Error calling Distance Matrix API:", err.message);
    return { distance: Infinity, duration: Infinity, element: null };
  }
}


// export async function findNearestCollector(location) {
//   const collectors = await Collector.find();

//   let nearestCollector = null;
//   let minDistance = Infinity;
//   let minDuration = Infinity;

//   for (const collector of collectors) {
//     const toStart = await getDrivingDistance(location, collector.start);
//     const toEnd = await getDrivingDistance(location, collector.end);

//     const shortest = Math.min(toStart.distance, toEnd.distance);
//     const shortestDuration = Math.min(toStart.duration, toEnd.duration);

//     if (shortest < minDistance) {
//       minDistance = shortest;
//       minDuration = shortestDuration;
//       nearestCollector = collector;
//     }
//   }

//   if (!nearestCollector) return null;

//   return {
//     collector: nearestCollector,
//     distance: minDistance  ,      
//     duration: minDuration,      
//   };
// }

export async function findNearestCollector(location) {
  console.log("Incoming Location:", location);

  const collectors = await Collector.find();

  let nearestCollector = null;
  let minDistance = Infinity;
  let minDuration = Infinity;
  let nearestPoint = null;

  for (const collector of collectors) {
    const toStart = await getDrivingDistance(
      { lat: location.lat, lon: location.lon },
      { lat: collector.start.lat, lon: collector.start.lon }
    );

    const toEnd = await getDrivingDistance(
      { lat: location.lat, lon: location.lon },
      { lat: collector.end.lat, lon: collector.end.lon }
    );

    console.log("Checking:", collector.name, { toStart, toEnd });

    const shortest = Math.min(toStart.distance, toEnd.distance);
    const shortestDuration = Math.min(toStart.duration, toEnd.duration);

    if (shortest < minDistance) {
      minDistance = shortest;
      minDuration = shortestDuration;
      nearestCollector = collector;
      nearestPoint =  shortest === toStart.distance ? "start" : "end"
    }
  }

  if (!nearestCollector) return null;

  return {
    collector: nearestCollector,
    distance: minDistance,
    duration: minDuration,
    nearestPoint
  }
}