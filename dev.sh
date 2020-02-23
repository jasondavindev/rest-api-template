#!/bin/bash
RESTORE='\033[0m'
RED='\033[00;31m'
GREEN='\033[00;32m'
YELLOW='\e[0;33m'

export PROJECT_NAME=ENV_PROJECT_NAME
export PROJECT_BASE=$(pwd)

function dkbuild {
  CD=$(pwd)
  cd $PROJECT_BASE
  docker-compose build --force-rm --no-cache app
  exitcode=$?
  cd $CD
  return $exitcode
}

function dkupd {
  CD=$(pwd)
  cd $PROJECT_BASE
  docker-compose up -d
  exitcode=$?
  cd $CD
  return $exitcode
}

function dkupa {
  CD=$(pwd)
  cd $PROJECT_BASE
  docker-compose up
  exitcode=$?
  cd $CD
  return $exitcode
}

function dkdown {
  CD=$(pwd)
  cd $PROJECT_BASE
  docker-compose down
  exitcode=$?
  cd $CD
  return $exitcode
}

function dk {
  docker exec -ti "${PROJECT_NAME}-api" $@
}

function pkg_install {
  CD=$(pwd)
  cd $PROJECT_BASE
  docker-compose run --rm "${PROJECT_NAME}-api" yarn
  cd $CD
}

function devhelp {
  echo -e "${GREEN}devhelp${RESTORE}                Prints ${RED}devhelp${RESTORE}"
  echo -e ""
  echo -e "${GREEN}dkbuild${RESTORE}                ${RED}Builds project docker image${RESTORE}"
  echo -e ""
  echo -e "${GREEN}pkg_install${RESTORE}            ${RED}Install node packages${RESTORE}"
  echo -e ""
  echo -e "${GREEN}dkupa${RESTORE}                  ${RED}Starts docker services${RESTORE} in attach mode (at first time, runs pkg_install)"
  echo -e ""
  echo -e "${GREEN}dkupd${RESTORE}                  ${RED}Starts docker services${RESTORE} in detached mode (at first time, runs pkg_install)"
  echo -e ""
  echo -e "${GREEN}dk \"cmd\"${RESTORE}               ${RED}Runs the 'cmd' command inside the container"
  echo -e ""
  echo -e "${GREEN}dkdown${RESTORE}                 ${RED}Stop and remove docker containers${RESTORE}"
  echo -e ""
}

devhelp
