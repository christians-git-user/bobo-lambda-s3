const AWS = require('aws-sdk');
const S3 = new AWS.S3();
const { uploadObjectToS3 } = require('./utilities/uploadS3');

exports.main = async function(event, context) {
    try {
        const bucketName = process.env.BUCKET;
        var method = event.httpMethod;
        if (method === "POST") {
                const objectBody = event.body;
                const on = JSON.parse(event.body).on;
                await uploadObjectToS3(`${on}.json`, objectBody);
                const data = await S3.listObjectsV2({ Bucket: bucketName }).promise();
                var body = {
                  results: data.Contents.map(function(e) { return e.Key })
                };
                return {
                    statusCode: 200,
                    headers: {},
                    body: JSON.stringify(body)
                };
    }

    // We only accept POST for now
    return {
      statusCode: 400,
      headers: {},
      body: "We only accept POST /"
    };
  } catch(error) {
    var body = error.stack || JSON.stringify(error, null, 2);
    return {
      statusCode: 400,
        headers: {},
        body: JSON.stringify(body)
    }
  }
}