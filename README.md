# kill-nodemon-inspector

- Kill nodemon inspector process
- Required Node.js 12+

## Usage

`npx kill-nodemon-inspector [inspect-port]`

## History

- 0.0.4
  - bugfix
- 0.0.3
  - Windows supported
- 0.0.2
  - no change
- 0.0.1
  - create

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
