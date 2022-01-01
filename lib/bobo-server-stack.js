const cdk = require('@aws-cdk/core');
const boboService =require('./bobo-service')

class BoboServerStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    new boboService.boboService(this, 'boboService')
  }
}

module.exports = { BoboServerStack }
