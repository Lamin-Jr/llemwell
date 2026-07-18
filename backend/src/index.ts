import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// A basic HTTP function demonstrating scalable modularity
export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from LLEMWELL Firebase Functions!");
});
