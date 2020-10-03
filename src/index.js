#!/usr/bin/env node
const { validateNodeVer, getPort, killInspector } = require('./libs');

validateNodeVer(process.version);
killInspector(getPort());
