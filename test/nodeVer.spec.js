const { validateNodeVer } = require('../src/libs');

describe('node version test', function () {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('node v12.18.3', function () {
    expect(validateNodeVer('v12.18.3')).toBe(true);
  });
  it('valid node v13.18.3', function () {
    expect(validateNodeVer('v13.18.3')).toBe(true);
  });
  it('invalid node v11.18.3', function () {
    const spy = jest.spyOn(process, 'exit').mockImplementation(() => {});
    validateNodeVer('v11.18.3');
    expect(spy).toHaveBeenCalled();
  });
});
