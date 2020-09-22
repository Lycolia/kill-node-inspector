#!/usr/bin/env node

import { execSync } from 'child_process';
import chalk from 'chalk';

const [, , port] = process.argv;

if (!port) {
  console.log(chalk.white('Argument not found'));
  console.log(chalk.white(`usage: kill-inspector [inspect-port]`));
} else {
  if (port.search(/^[0-9]+$/) > -1) {
    killInspector();
  } else {
    console.log(chalk.white('Invalid inspect-port'));
    console.log(chalk.white(`inspect-port must be integer`));
  }
}

/**
 * kill inspector process
 */
function killInspector(): void {
  // for Windows
  if (process.platform === 'win32') {
    console.log(chalk.magenta('Windows not support'));
    process.exit(0);
  }

  // for POSIX
  const inspectorProcessId = execSync(
    `lsof -i -n | grep ${port} | awk '{print $2}'`
  )
    .toString()
    .trim();

  if (inspectorProcessId) {
    console.log(chalk.cyan(`found inspector process ${inspectorProcessId}`));
    execSync(`kill -9 ${inspectorProcessId}`);
    console.log(chalk.cyan(`killed inspector process ${inspectorProcessId}`));
  } else {
    console.log(
      chalk.cyan(`not found inspector process ${inspectorProcessId}`)
    );
  }
}
