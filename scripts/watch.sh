#!/usr/bin/env bash

SCRIPT_PATH="$(dirname "${0}")"
SCRIPT_FILE="$(basename "${0}")"
CLI_ROOT="$(cd "$(dirname "${0}")/.."; pwd)"

NODEMON_BIN="${CLI_ROOT}/node_modules/.bin/nodemon"
if [[ ! -x "${NODEMON_BIN}" ]]; then
  NODEMON_BIN="$(which nodemon)"
fi

if [[ ! -x "${NODEMON_BIN}" ]]; then
  printf '"%s" is not executable.\n' "${NODEMON_BIN}"
  exit 1
fi

NPM_COMMAND=${1:-build}

function main() {
  cd "${CLI_ROOT}"
  "$NODEMON_BIN" -w ./src -e ts --exec "npm run ${NPM_COMMAND}"
}

main