#!/usr/bin/env node

const { execSync } = require('child_process');
const chalk = require('chalk');
const log = (message) => {
  console.log(chalk.yellow('[kill-inspector]'), message);
};

killInspector(getPort());

/**
 * invalid executing
 */
function getPort() {
  const [, , port] = process.argv;
  const nodeVer = Number.parseInt(process.version.replace(/^v(\d+).+/, '$1'));

  if (nodeVer < 12) {
    log(chalk.bgRed.white('Required Node.js 12+'));
    process.exit(1);
  }

  if (!port) {
    log(chalk.white('Argument not found'));
    log(chalk.white(`Using port 9229`));
    return '9229';
  } else {
    if (port.search(/^[0-9]+$/) === -1) {
      log(chalk.white('Invalid inspect-port'));
      log(chalk.white(`inspect-port must be integer`));
      return port;
    }
  }
}

/**
 * kill inspector process
 */
function killInspector(port) {
  if (process.platform === 'win32') {
    // for Windows
    killForWindows(port);
  } else {
    // for Linux
    killForLinux(port);
  }
}

/**
 * kill inspector process for windows
 */
function killForWindows(port) {
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
}

/**
 * kill inspector process for linux
 */
function killForLinux(port) {
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
}
