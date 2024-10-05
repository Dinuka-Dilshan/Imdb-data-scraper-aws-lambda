import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

export class LambdaStack extends Stack {
  public readonly scraperLambdaFn: LambdaIntegration;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambdaFn = new NodejsFunction(this, "movie-tvs-scraper-lambda-fn", {
      runtime: Runtime.NODEJS_20_X,
      handler: "handler",
      entry: join(__dirname, "..", "services", "index.ts"),
      functionName: "movie-tvs-scraper-lambda-fn",
      timeout: Duration.minutes(1),
    });

    this.scraperLambdaFn = new LambdaIntegration(lambdaFn);
  }
}
