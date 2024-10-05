import { APIGatewayProxyEvent, Context } from "aws-lambda";
import {
  MOVIE_ENDPONIT,
  MOVIES_ROUTE,
  TV_ENDPONIT,
  TVS_ROUTE,
} from "../constants/urls";
import scrapeData from "./scrapeData";

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
) => {
  if (event.path === `/${MOVIES_ROUTE}`) {
    const result = await scrapeData(MOVIE_ENDPONIT);
    return result;
  }
  if (event.path === `/${TVS_ROUTE}`) {
    const result = await scrapeData(TV_ENDPONIT);
    return result;
  }

  return {
    statusCode: 500,
    body: JSON.stringify(event),
  };
};
