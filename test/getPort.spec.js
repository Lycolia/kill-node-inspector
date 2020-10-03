const { getPort } = require('../src/libs');

describe('get port test', function () {
  afterEach(() => {
    // remove cli params
    while (process.argv.length > 2) {
      process.argv.pop();
    }
  });

  it('port-argument-less', function () {
    expect(getPort()).toBe('9229');
  });
  it('valid-port-argument 8228', function () {
    const port = '8228';
    // append argument
    process.argv.push(port);
    expect(getPort()).toBe(port);
  });
  it('invalid-argument 0a9', function () {
    const port = '0a9';
    // append argument
    process.argv.push(port);
    const spy = jest.spyOn(process, 'exit').mockImplementation(() => {});
    getPort();
    expect(spy).toHaveBeenCalled();
  });
});
