const { execSync } = require('child_process');
const chalk = require('chalk');
const log = (message) => {
  console.log(chalk.yellow('[kill-inspector]'), message);
};

/**
 * validate Node version
 * @param {string} processVer
 * @returns {Boolean}
 */
const validateNodeVer = (processVer) => {
  const nodeVer = Number.parseInt(processVer.replace(/^v(\d+).+/, '$1'));

  if (nodeVer >= 12) {
    return true;
  } else {
    log(chalk.bgRed.white('Required Node.js 12+'));
    process.exit(1);
  }
};

/**
 * invalid executing
 * @returns {Number}
 */
const getPort = () => {
  const [, , port] = process.argv;

  if (!port) {
    log(chalk.white('Argument not found'));
    log(chalk.white(`Using port 9229`));
    return '9229';
  } else {
    if (port.search(/^[0-9]+$/) > -1) {
      return port;
    } else {
      log(chalk.white('Invalid inspect-port'));
      log(chalk.white(`inspect-port must be integer`));
      process.exit(1);
    }
  }
};

/**
 * kill inspector process
 * @param {string} port
 */
const killInspector = (port) => {
  if (process.platform === 'win32') {
    // for Windows
    kill.forWindows(port);
  } else {
    // for Linux
    kill.forLinux(port);
  }
};

const kill = {
  /**
   * kill inspector process for windows
   * @param {string} port
   */
  forWindows: (port) => {
    const inspectorProcesses = execSync('netstat -oan').toString();
    const mats = inspectorProcesses.matchAll(/^.+?:(\d+?)\s+.+?(\d+)$/gm);

    const find = [...mats].find((m) => m[1] === port);
    const inspectorProcessId = find ? find[2] : '';

    if (inspectorProcessId) {
      log(chalk.cyan(`found inspector process ${inspectorProcessId}`));
      execSync(`taskkill /PID ${inspectorProcessId} /T /F`);
      log(chalk.cyan(`killed inspector process ${inspectorProcessId}`));
    } else {
      log(chalk.cyan(`not found inspector process ${inspectorProcessId}`));
    }
  },
  /**
   * kill inspector process for linux
   * @param {string} port
   */
  forLinux: (port) => {
    const inspectorProcessId = execSync(
      `lsof -i -n | grep ${port} | awk '{print $2}'`
    )
      .toString()
      .trim();

    if (inspectorProcessId) {
      log(chalk.cyan(`found inspector process ${inspectorProcessId}`));
      execSync(`kill -9 ${inspectorProcessId}`);
      log(chalk.cyan(`killed inspector process ${inspectorProcessId}`));
    } else {
      log(chalk.cyan(`not found inspector process ${inspectorProcessId}`));
    }
  },
};

module.exports = {
  validateNodeVer,
  getPort,
  killInspector,
  kill: kill,
};
