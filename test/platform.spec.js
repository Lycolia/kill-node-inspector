const index = require('../src/libs');

describe('platform-test', function () {
  it('platform', function () {
    if (process.platform === 'win32') {
      const spy = jest.spyOn(index.kill, 'forWindows');
      index.killInspector('9229');
      expect(spy).toHaveBeenCalled();
    } else {
      const spy = jest.spyOn(index.kill, 'forLinux');
      index.killInspector('9229');
      expect(spy).toHaveBeenCalled();
    }
  });
});
