const index = require('../src/libs');
const { exec } = require('child_process');
const { doesNotMatch } = require('assert');

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
  it('successfully kill process', function () {
    if (process.platform === 'win32') {
      expect(() => {
        index.kill.forWindows('9229');
      }).not.toThrow();
    } else {
      expect(() => {
        index.kill.forLinux('9229');
      }).not.toThrow();
    }
  });
});
