const { expect, matchTemplate, MatchStyle } = require('@aws-cdk/assert');
const cdk = require('@aws-cdk/core');
const BoboServer = require('../lib/bobo-server-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new BoboServer.BoboServerStack(app, 'MyTestStack');
    // THEN
    expect(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
