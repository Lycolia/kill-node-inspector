# nodemon-inspector-killer

- Kill nodemon inspector process
- Required Node.js 12+

## Usage

`npx kill-nodemon-inspector [inspect-port]`

## Roadmap

- Add unit test on GitHub Actions
  - failure
    - win32 node 11-
      - on match process
    - linux node 11-
      - on match process
    - exec no arg
      - on match process
    - exec arg `a012`
      - on match process
    - exec arg `9229`
      - no match process
  - succeed
    - win32 node 12+
      - exec arg `9229`
        - on match process
    - linux node 12+
      - exec arg `9229`
        - on match process
