# kill-node-inspector

- Kill node inspector process
- Required Node.js 12+ and Linux
  - Windows dose not support

## Usage

- `npx kill-node-inspector [inspect-port]` or `npx kill-node-inspector`

## History

- 0.0.7-1
  - fix typo for readme
- 0.0.7
  - add integration test (testing for inspector killed)
  - update `.eslintrc`
- 0.0.6
  - add unit test
- 0.0.5
  - without nodemon
  - allow option-less for execute
  - rename package name
- 0.0.4
  - bugfix
- 0.0.3
  - Windows supported
- 0.0.2
  - no change
- 0.0.1
  - create

## Roadmap

- Create CI
  - GitHub Actions
- Support Windows

## package.json

### scripts

- start
  - Exec node
- dev
  - Exec node inspect
- test
  - `concurrently`
    - Following commands parallel execution
      - `npx http-server -p 9229`
      - `jest`
    - `-s last`
      - That for ignore mock crashes
      - Return exit code of zero or one based on the success or failure of the "last" child to terminate
    - ` -p \"[{name}]\"`
      - Format to command alias names
    - `-n \"InspectorMock,Jest\"`
      - Command alias names
    - `-c \"yellow.bold,cyan.bold\"`
      - Color of command alias names

### dependencies

- chalk
  - Coloring log

### devDependencies

- concurrently
  - Create mock for node inspector process
- http-server
  - Mock for node inspector process
- jest
  - Test framework
