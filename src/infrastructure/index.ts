import { App } from "aws-cdk-lib";
import { ApiStack } from "./apiStack";
import { LambdaStack } from "./lambdaStack";

const app = new App();
const lambdaStack = new LambdaStack(app, "movie-tvs-scraper-lambda-fn");
new ApiStack(app, "movie-tvs-rest-api", {
  lambdaIntegration: lambdaStack.scraperLambdaFn,
});
