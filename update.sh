#!/bin/bash
hugo
git config --global http.sslVerify "false"
git add .
git commit -m "update blog"
git push origin master
