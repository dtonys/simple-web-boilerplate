#!/bin/sh
cd ~/webapps/simple-web-boilerplate
git pull origin master
yarn
npm run build
npm run start
