const { execSync } = require('child_process');
const chalk = require('chalk');
const log = (message) => {
  console.log(chalk.yellow('[kill-inspector]'), message);
};

const [, , port] = process.argv;

if (invalidExec(port)) {
  process.exit(1);
} else {
  killInspector();
}

/**
 * invalid executing
 * @param {string} port
 */
function invalidExec(port) {
  const nodeVer = Number.parseInt(process.version.replace(/^v(\d+).+/, '$1'));

  if (nodeVer < 12) {
    log(chalk.bgRed.white('Required Node.js 12+'));
    return true;
  }

  if (!port) {
    log(chalk.white('Argument not found'));
    log(chalk.white(`usage: kill-inspector [inspect-port]`));
    return true;
  } else {
    if (port.search(/^[0-9]+$/) === -1) {
      log(chalk.white('Invalid inspect-port'));
      log(chalk.white(`inspect-port must be integer`));
      return true;
    }
  }
}

/**
 * kill inspector process
 */
function killInspector() {
  if (process.platform === 'win32') {
    // for Windows
    killForWindows();
  } else {
    // for Linux
    killForLinux();
  }
}

function killForWindows() {
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

function killForLinux() {
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
