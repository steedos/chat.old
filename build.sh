#!/usr/bin/env bash

export BUILD_DIRECTORY=/srv/chat

#meteor add rocketchat:internal-hubot meteorhacks:kadira
meteor build --server https://cn.steedos.com/chat --directory "$BUILD_DIRECTORY"
cd "$BUILD_DIRECTORY/bundle/programs/server"
npm install
cd "$BUILD_DIRECTORY"
pm2 startOrRestart pm2.json