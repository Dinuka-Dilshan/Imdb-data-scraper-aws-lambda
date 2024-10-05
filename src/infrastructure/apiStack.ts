import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import { MOVIES_ROUTE, TVS_ROUTE } from "../constants/urls";

interface Props extends StackProps {
  lambdaIntegration: LambdaIntegration;
}

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    const restApi = new RestApi(this, "movie-tvs-rest-api", {
      restApiName: "movie-tvs-rest-api",
    });

    const movies = restApi.root.addResource(MOVIES_ROUTE);
    const tvs = restApi.root.addResource(TVS_ROUTE);
    movies.addMethod("GET", props.lambdaIntegration);
    tvs.addMethod("GET", props.lambdaIntegration);
  }
}
