const core = require('@aws-cdk/core');
const lambda = require("@aws-cdk/aws-lambda-nodejs");
const s3 = require("@aws-cdk/aws-s3");
const apigateway = require("@aws-cdk/aws-apigateway");
const { Duration } = require("@aws-cdk/core");

class boboService extends core.Construct {
    constructor(scope, id) {
        super(scope, id);
        const bucket = new s3.Bucket(this, "bobo");
        
        const handler = new lambda.NodejsFunction(this, "boboHandler", {
            runtime: lambda.NODEJS_14_X,
            memorySize: 3000,
            timeout: Duration.minutes(2),
            entry: "src/writeToS3.js",
            handler: "main",
            environment: {
                BUCKET: bucket.bucketName
            }
        });

        bucket.grantReadWrite(handler);

        const api = new apigateway.RestApi(this, "bobo-api", {
            restApiName: "christian-bobo-service",
            description: "This service writes bobo.js data from the web to s3."
          });
      
        const boboIntegration = new apigateway.LambdaIntegration(handler, {
            requestTemplates: { "application/json": '{ "statusCode": "200" }' }
        });
      
        const ingest = api.root.addResource('ingest')
    
        ingest.addMethod("POST", boboIntegration); 
    }
}

module.exports = { boboService }